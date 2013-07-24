

var style = function(element) {

  if(element.data('value') == true) {
    element.html('ON');
    element.removeClass('crater-toggle-off');
    element.addClass('crater-toggle-on');
  } else {
    element.html('OFF');
    element.removeClass('crater-toggle-on');
    element.addClass('crater-toggle-off');
  }

};


Crater._items['crater-toggle'] = function(element) {
 
  if(element.is('.crater')) return;

  element.addClass('crater');
  style(element);

  element.click(function(event) {
    element.data('value', ! element.data('value'));
    style(element);
    element.trigger('toggle');
  });


};




