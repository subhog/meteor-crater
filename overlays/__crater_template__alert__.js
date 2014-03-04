Template.__crater_template__alert__.events({
  'click .crater-alert-button-cancel, click .crater-alert-closer': function(e, t) {
    Crater.dismissOverlay(e.target, null, null);
  },

  'click .crater-alert-button-action': function(e, t) {
    if(t.data.prompt) {
      Crater.dismissOverlay(e.target, null, {
        value: $(t.find('.crater-alert-prompt')).val(),
      });
    } else {
      Crater.dismissOverlay(e.target, null, true);
    }
  },
});



Template.__crater_template__alert__.titleOrCloser = function() {
  return this.title || this.closer;
};

