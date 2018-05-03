class SubscriptionDatatable
  delegate :controller, :url_for, :render, :params, :image_tag, :h, :link_to, :api_call_path, :number_to_currency, to: :@view

  def initialize(view)
    @view = view
    @total_subscriptions = Subscription.count(:all)
    @subscriptions = Subscription.select(select_string).where(search_string, search: "%#{params[:sSearch].to_s.downcase}%")
    @filtered_total = @subscriptions.size
    @subscriptions = @subscriptions.page(page).per_page(per_page)
  end

  def as_json(options = {})
    {
      sEcho: params[:sEcho].to_i,
      iTotalDisplayRecords: @filtered_total,
      aaData: data,
      iTotalRecords: @total_zuora_connect_app_instances,
    }
  end

private
  def data
    @subscriptions.map do |subscription|
      {
        DT_RowId: subscription.id.to_s,
        DT_RowClass: nil,
        DT_RowAttr: { },
        "subscriptions__display_id" => subscription.id,
        "subscriptions__name" => subscription.name,
        "subscriptions__zuora_id" => subscription.zuora_id,
        subscriptions__actions: actions(subscription)
      }
    end
  end

  def actions(subscription)
    render(:partial=>"subscriptions/actions.html.erb", locals: { subscription: subscription} , :formats => [:html]) if params[:table_view_mode] == 'table'
  end

  def display_time(time)
    return !time.to_s.blank? ? Time.parse(time.to_s).strftime("%m/%d/%y  %I:%M:%S %p") : ''
  end

  def page
    params[:iDisplayStart].to_i/per_page + 1
  end

  def per_page
    params[:iDisplayLength].to_i > 0 ? params[:iDisplayLength].to_i : 10
  end

  def sort_column
    col = [*0..params[:iColumns].to_i-1].map{|i| params["mDataProp_#{i}"].gsub("__", ".") if params["bSortable_#{i}"] != 'false' }[params[:iSortCol_0].to_i]
    if !col.blank?
      object, field = col.split('.')
      if !field.blank? && !object.blank?
        map = {"Subscription" => Subscription}
        field_type = map[object.classify].column_for_attribute(field).type
        return [:string, :text].include?(field_type) ? "lower(#{col.gsub("/", "_")})" : col
      else
        return col
      end
    else
      return  "subscriptions.id"
    end
  end

  def sort_direction
    params[:sSortDir_0] == "asc" ? "asc" : "desc"
  end

  def search_string
    "to_char(subscriptions.id, '999999999') LIKE :search "
  end

  def select_string
    "subscriptions.*"
  end
end
