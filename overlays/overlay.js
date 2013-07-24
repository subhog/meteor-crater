


Crater.drawOverlay = function(template, data, callback) {
  
  /* Create DOM fragment */
  var frag = Meteor.render(function() {
    return '<div>' + Template[template](data) + '</div>';
  });

  /* Create and set up overlay */
  var div = document.createElement('div');
  var jdiv = $(div);
  jdiv.addClass('crater-overlay');
  jdiv.append(frag);
  jdiv.hide();
  jdiv.click(function(e) {
    if(e.target === div)
      Crater.dismissOverlay(div);
  });

  /* Set up callback */
  div.__craterCallback = callback;

  /* Display */
  $('body').append(div);
  jdiv.fadeIn(300);
  return jdiv;

};


Crater.dismissOverlay = function(element, error, data) {
  /* Get overlay */
  var overlay = $(element).closest('.crater-overlay');

  /* Callback */
  if(overlay.get()[0].__craterCallback) {
    overlay.get()[0].__craterCallback(error, data);
  }

  /* Dismiss */
  overlay.fadeOut(300, function(){
    overlay.remove();
  });
};




