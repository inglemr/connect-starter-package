class DatatableGenerator < Rails::Generators::NamedBase

  def create_datatable_file
    columns = "#{class_name}".constantize.send("column_names")
    column_data = []
    columns.each do |col|
      column_data << "\"#{class_name.pluralize.underscore}__#{col}\" => #{class_name.singularize.underscore.gsub("/", "_")}.#{col}"
    end

    create_file "app/datatables/#{file_name}_datatable.rb", <<-FILE
class #{class_name}Datatable
  delegate :controller, :url_for, :render, :params, :image_tag, :h, :link_to, :api_call_path, :number_to_currency, to: :@view

  def initialize(view)
    @view = view
    @total_#{class_name.pluralize.underscore.gsub("/", "_")} = #{class_name}.count(:all)
    @#{class_name.pluralize.underscore.gsub("/", "_")} = #{class_name}.select(select_string).where(search_string, search: "%\#{params[:sSearch].to_s.downcase}%").order("\#{sort_column} \#{sort_direction}")
    @filtered_total = @#{class_name.pluralize.underscore.gsub("/", "_")}.size
    @#{class_name.pluralize.underscore.gsub("/", "_")} = @#{class_name.pluralize.underscore.gsub("/", "_")}.page(page).per_page(per_page)
  end

  def as_json(options = {})
    {
      sEcho: params[:sEcho].to_i,
      iTotalDisplayRecords: @filtered_total,
      aaData: data,
      iTotalRecords: @total_#{class_name.pluralize.underscore.gsub("/", "_")},
    }
  end

private
  def data
    @#{class_name.pluralize.underscore.gsub("/", "_")}.map do |#{class_name.singularize.underscore.gsub("/", "_")}|
      {
        DT_RowId: #{class_name.singularize.underscore.gsub("/", "_")}.id.to_s,
        DT_RowClass: nil,
        DT_RowAttr: { },
        #{column_data.join(",\n\t\t\t\t")},
        #{class_name.pluralize.underscore.gsub("/", "_")}_actions: actions(#{class_name.singularize.underscore.gsub("/", "_")}),
      }
    end
  end

  def actions(#{class_name.singularize.underscore.gsub("/", "_")})
    render(:partial=>"#{class_name.to_s.pluralize.underscore}/actions.html.erb", locals: { #{class_name.singularize.underscore.gsub("/", "_")}: #{class_name.singularize.underscore.gsub("/", "_")}} , :formats => [:html]) if params[:table_view_mode] == 'table'
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
    col = [*0..params[:iColumns].to_i-1].map{|i| params["mDataProp_\#{i}"].gsub("__", ".") if params["bSortable_\#{i}"] != 'false' }[params[:iSortCol_0].to_i]
    if !col.blank?
      object, field = col.split('.')
      if !field.blank? && !object.blank?
        map = {"#{class_name}" => #{class_name}}
        field_type = map[object.classify].column_for_attribute(field).type
        return [:string, :text].include?(field_type) ? "lower(\#{col.gsub("/", "_")})" : col
      else
        return col
      end
    else
      return  "#{class_name.pluralize.underscore.gsub("/", "_")}.id"
    end
  end

  def sort_direction
    params[:sSortDir_0] == "asc" ? "asc" : "desc"
  end

  def search_string
    "to_char(#{class_name.pluralize.underscore.gsub("/", "_")}.id, '999999999') LIKE :search "
  end

  def select_string
    "#{class_name.pluralize.underscore.gsub("/", "_")}.*"
  end
end
    FILE
  end


end
