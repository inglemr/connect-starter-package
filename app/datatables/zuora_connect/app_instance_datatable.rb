class ZuoraConnect::AppInstanceDatatable
  delegate :controller, :url_for, :render, :params, :image_tag, :h, :link_to, :api_call_path, :number_to_currency, to: :@view

  def initialize(view)
    puts "step1"
    @view = view
    @total_zuora_connect_app_instances = ZuoraConnect::AppInstance.count(:all)
    @zuora_connect_app_instances = ZuoraConnect::AppInstance.select(select_string).where(search_string, search: "%#{params[:sSearch].to_s.downcase}%")
    @filtered_total = @zuora_connect_app_instances.size
    @zuora_connect_app_instances = @zuora_connect_app_instances.page(page).per_page(per_page)
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
    @zuora_connect_app_instances.map do |zuora_connect_app_instance|
      {
        DT_RowId: zuora_connect_app_instance.id.to_s,
        DT_RowClass: nil,
        DT_RowAttr: { },
        "zuora_connect/app_instances__id" => zuora_connect_app_instance.id,
                "zuora_connect/app_instances__created_at" => zuora_connect_app_instance.created_at,
                "zuora_connect/app_instances__updated_at" => zuora_connect_app_instance.updated_at,
                "zuora_connect/app_instances__access_token" => zuora_connect_app_instance.access_token,
                "zuora_connect/app_instances__refresh_token" => zuora_connect_app_instance.refresh_token,
                "zuora_connect/app_instances__oauth_expires_at" => zuora_connect_app_instance.oauth_expires_at,
                "zuora_connect/app_instances__token" => zuora_connect_app_instance.token,
                "zuora_connect/app_instances__api_token" => zuora_connect_app_instance.api_token,
                "zuora_connect/app_instances__catalog_updated_at" => zuora_connect_app_instance.catalog_updated_at,
        zuora_connect_app_instances_actions: actions(zuora_connect_app_instance),
      }
    end
  end

  def actions(zuora_connect_app_instance)
    render(:partial=>"admin/app_instances/actions.html.erb", locals: { zuora_connect_app_instance: zuora_connect_app_instance} , :formats => [:html]) if params[:table_view_mode] == 'table'
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
        map = {"ZuoraConnect::AppInstance" => ZuoraConnect::AppInstance}
        field_type = map[object.classify].column_for_attribute(field).type
        return [:string, :text].include?(field_type) ? "lower(#{col.gsub("/", "_")})" : col
      else
        return col
      end
    else
      return  "zuora_connect_app_instances.id"
    end
  end

  def sort_direction
    params[:sSortDir_0] == "asc" ? "asc" : "desc"
  end

  def search_string
    "to_char(zuora_connect_app_instances.id, '999999999') LIKE :search "
  end

  def select_string
    "zuora_connect_app_instances.*"
  end
end
