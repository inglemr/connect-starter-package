function switch_field(item){
  primary = item.parents(".update_fields").eq(0).find('.primary');
  secondary = item.parents(".update_fields").eq(0).find('.secondary');
  if(secondary.hasClass('hidden')){
    primary.addClass('hidden').prop('disabled', true);
    secondary.removeClass('hidden').prop('disabled', false);
  }else{
    secondary.addClass('hidden').prop('disabled', true);
    primary.removeClass('hidden').prop('disabled', false);
  }
}
