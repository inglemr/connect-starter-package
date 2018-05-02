$.fn.dropdownHold = function () {
  return this.each(function() {
    var hold_obj = $(this);
    hold_obj.unbind('click');
    hold_obj.on('click', function (event) {
      hold_obj.parent().toggleClass('open');
    });
    $('body').on('click', function (e) {
      if (!hold_obj.is(e.target)  && hold_obj.has(e.target).length === 0  && hold_obj.parent('.open').has(e.target).length === 0 ) {
        hold_obj.parent().removeClass('open');
      }
    });
  });
};