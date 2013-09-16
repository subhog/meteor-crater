
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
  return _.template('<div class="crater-alert-body"><%= message %><div><input type="text" value="<%= value %>"/></div></div>', {
    message: options.message || '',
    value: options.value || '',
  });
};

var alertFooter = function(options) {
  return _.template('<div class="crater-alert-footer">'+
    '<span class="crater-alert-button"><%= cancel %></span>'+
    '<span class="crater-alert-button crater-alert-button-action"><%= ok %></span>'+
    '</div>', {
    ok: options.ok || 'OK',
    cancel: options.cancel || 'Cancel',
  });
};






Crater.prompt = function(options, callback) {

  var html = '';
  if(typeof options === 'string') {
    html = '<div class="crater-alert-box">' + alertBody({message: options}) + alertFooter({}) + '</div>';
  } else {
    html = '<div class="crater-alert-box">' + alertHeader(options) + alertBody(options) + alertFooter(options) + '</div>';
  }

  var overlay = Crater._drawOverlay(html, null, callback);
  overlay.find('.crater-alert-button')
    .on('click', function(e) {
      if(! $(e.target).is('.crater-alert-button-action')) {
        Crater.dismissOverlay(e.target, null, null);
      } else {
        Crater.dismissOverlay(e.target, null, {value: $(e.target).closest('.crater-alert-box').find('input:text').val()});
      }
    });
  return overlay;
};
