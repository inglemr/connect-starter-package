json.products do
  json.array! @products do |product|
    json.partial! 'api/v1/products/product', product: product
  end
end
json.pagination do
  json.page @page
  json.page_length @page_length
  json.total_filtered_records @products.size
  json.total_records @unfiltered_size
end
