


Crater._items['crater-remover'] = function(element) {
 
  if(element.is('.crater')) return;
  element.addClass('crater');

  element.click(function(event) {
    if(element.is('.crater-activated')) {
      element.trigger('confirm');
    } else {
      element.addClass('crater-activated');
      element.addClass('crater-remover-activated');
      element.data('craterOriginalHtml', element.html());
      element.html('REMOVE');

      setTimeout(function() {
        element.removeClass('crater-activated');
        element.removeClass('crater-remover-activated');
        element.html(element.data('craterOriginalHtml'));
      }, 3000);
    }

  });


};


