



// var months = [
//   'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
// ];

Crater._items['crater-datetime'] = function(element) {




  if(element.is('.crater')) return;
  element.addClass('crater');

  var date = {
    time: new Date().getTime(),
  };


  if(element.data('value')) {
    date.time = new Date(element.data('value')).getTime();
  }

  if(element.data('id')) {
    date.id = element.data('id')
    if(element.data('trigger')) {
      date.trigger = true;
    }
  }

  var el = Meteor.render(function() {
    return Template['__crater_template__datetime__'](date);
  });

  $(el).appendTo(element);
  

};





