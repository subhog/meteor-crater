

Crater = {};

/*
  List of Crater element classes
  in the form:
  {
    cssSelector: initializerFunction,
  }
*/
Crater._items = {};


/* Initialize Crater elements within template */
Crater.go = function(template) {

  var node = template.firstNode;

  while(true) {

    /*
      For each registered crater element type,
      search for all the objects of this type
      and initialize them.
    */
    _.each(Crater._items, function(initializer, selector) {
      $(node).find('.'+selector).each(function(idx, element) {
        initializer($(element));
      });
    });

    if(node === template.lastNode) return;
    node = node.nextSibling;

    /* Just for safety */
    if(!node) return;
  }

};




/* Add crater event to template */
Crater.event = function(template, eventName, selector, callback) {

  var arr = template.findAll(selector);
  for(var eid in arr) {
    var element = $(arr[eid]);

    /* Add boolean mark for the element so that it is not bind again on rerender */
    if(element.data('__crater_bind_for__' + eventName)) continue;
    element.data('__crater_bind_for__' + eventName, true);

    $(arr[eid]).bind(eventName, callback);
  }
};


/* Add crater event map to template */
Crater.events = function(template, map) {

  _.each(map, function(callback, list) {

    var items = list.split(',');
    _.each(items, function(item) {
      var parts = item.replace(/^\s+/, '').replace(/\s+$/, '').replace(/\s{2,}/, ' ').split(' ');
      Crater.event(template, parts[0], parts[1], callback);
    });
    
  });

};







