

var alertHeader = function(options) {
  if(options.title || options.closer) {
    return _.template('<div class="crater-alert-header"><%= title %><%= closer %></div>', {
      title: options.title || '',
      closer: options.closer ? '<span class="crater-alert-closer"></span>' : '',
    });
  }
  return '';
};

var alertBody = function(options) {
  return _.template('<div class="crater-alert-body"><%= message %></div>', {
    message: options.message || '',
  });
};

var alertFooter = function(options) {
  if(options.button) {
    return _.template('<div class="crater-alert-footer"><span class="crater-alert-button"><%= button %></span></div>', {
      button: options.button,
    });
  }
  return ''; 
};



Crater.alert = function(options, callback) {
  
  var html = '<div class="crater-alert-box">' + alertHeader(options) + alertBody(options) + alertFooter(options) + '</div>';
  Crater._drawOverlay(html, null, callback)
    .find('.crater-alert-button')
    .on('click', function(e) {
      Crater.dismissOverlay(e.target);
    });

};


