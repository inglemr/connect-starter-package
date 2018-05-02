module ApplicationHelper
  def return_cookie_filters(cookie_key: nil, filter_key:nil,values: nil, defaults: nil, type: nil)
    raise "Error" if cookie_key.nil? || filter_key.nil? || (values.nil? && type != "boolean")
    values = ["false"] if type == "boolean"
    values = values.map {|v| v[1].to_s} if type == "select" || values[0].class == Array
    defaults ||= [] if type == "select"
    if !cookies[cookie_key].blank?
      json = JSON.parse(cookies[cookie_key])
      if !json[filter_key].blank?
        checked_envs ||= json[filter_key] if type == "boolean" || type == "select"
        checked_envs ||=  values.map {|v|  json[filter_key].include?(v) ? v : nil }.compact
      end
    end
    checked_envs ||= defaults.nil? ? (type == "checkbox" ? values : nil) : defaults
  end

  def datatable_columns(object, cols = nil)
    column_names = cols.nil? ? object.column_names : cols
    columns = []
    column_names.each do |col|
      columns << { "title": "#{col.split('_').collect(&:capitalize).join(' ')}", "data": "#{object.to_s.pluralize.underscore}__#{col}",'visible': true } if col != "actions"
    end
    if cols.nil? || ( !cols.nil? && column_names.include?("actions"))
      columns << { "title": "Actions", "data": "#{object.to_s.underscore.gsub('/', '_')}s_actions", "class": "center", "bSortable": false,  "width": "250px" }
    end
    return columns
  end

  def render_datatable(object, table_url ,columns: nil,table_name: nil, aoData: [], initial_size: 25 ,table_views: {:table => true, :grid =>false}, table_filters: {}, table_actions: nil, sort: [[ 0, "asc" ]])
    table_name = object.to_s.pluralize.underscore.gsub("/", "_") if table_name.nil?
    columns = datatable_columns(object) if columns.nil?
    render(:partial=>"shared/table.html.erb", locals: {:table_name => table_name, :aoData => aoData, :columns => columns, :sort => sort, :table_filters => table_filters, :table_views => table_views, :initial_size => initial_size, :table_actions => table_actions, :table_url =>  table_url }.merge(request.query_parameters), :formats => [:html])
  end
end
