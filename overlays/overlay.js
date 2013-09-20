

/*
  # options

  data
  divClass
  overlayClass

*/

Crater._drawOverlay = function(html, options, callback) {
  options = options || {};
  /* Create DOM fragment */
  var frag = Meteor.render(html);

  /* Create and set up overlay */
  var div = document.createElement('div');
  var jdiv = $(div);
  jdiv.addClass('crater-overlay');
  if(options.overlayClass) {
    if(typeof options.overlayClass === 'string') {
      jdiv.addClass(options.overlayClass);
    }
  }
  jdiv.append(frag);
  jdiv.hide();
  if(!options.modal) {
    jdiv.click(function(e) {
      if(e.target === div)
        Crater.dismissOverlay(div);
    });
  }

  /* Set up callback */
  div.__craterCallback = callback;

  /* Display */
  $('body').append(div);
  if(options.animateIn) {
    options.animateIn(div);
  } else {
    jdiv.fadeIn(300);  
  }
  if(options.animateOut) div.__craterAnimateOut = options.animateOut;
  return jdiv;
};

Crater.overlay = function(template, options, callback) {
  options = options || {};


  return Crater._drawOverlay(function() {
    // var d = '<div>';
    // if(options.divClass) d = '<div class="'+options.divClass+'">';
    return Template[template](options.data);
    // return d + Template[template](options.data) + '</div>';
  }, options, callback);
};


Crater.dismissOverlay = function(element, error, data) {
  /* Get overlay */
  var overlay = $(element).closest('.crater-overlay');

  /* Callback */
  if(overlay.get()[0].__craterCallback) {
    overlay.get()[0].__craterCallback(error, data);
  }

  /* Dismiss */
  if(overlay.get()[0].__craterAnimateOut) {
    overlay.get()[0].__craterAnimateOut(overlay.get()[0], function() {
      overlay.remove();
    });
  } else {
    overlay.fadeOut(300, function(){
      overlay.remove();
    });  
  }
  
};




