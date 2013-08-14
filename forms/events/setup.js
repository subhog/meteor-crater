
var changeImageEvent = function(e) {
  var form = $(e.target).closest('.crater-form');
  var fieldBox = $(e.target).closest('.crater-field-box');

  if(!(form.get()[0]).__crater__loadImage) return;

  form.get()[0].__crater__loadImage(null, function(err, data) {
    console.log("GOT IMAGE", err, data);
    if(!data || !data.image) return;
    $('#crater-form-' + fieldBox.data('prefix') + '-' + Crater.forms.undot(fieldBox.data('param'))).val(data.image);
    saveEvent(e);
  });
};


var addMultiEvent = function(e) {
  var form = $(e.target).closest('.crater-form');
  var fieldBox = $(e.target).closest('.crater-field-box');
  form.trigger('addMultiItem', {param: fieldBox.data('param')});
};

var removeMultiEvent = function(e) {
  var form = $(e.target).closest('.crater-form');
  var fieldBox = $(e.target).closest('.crater-field-box');
  form.trigger('removeMultiItem', {param: fieldBox.data('param'), idx: fieldBox.data('idx')});
};

var saveEvent = _.debounce(function(e) {
  $(e.target).closest('.crater-form').trigger('changed');
}, 500);




var setupForm = function(form, params) {
  if(params) form.__crater__loadImage = params.loadImage;

  $(form).find('.crater-field-image-change-button').click(changeImageEvent);
  $(form).find('.crater-field-trigger').on('keyup', saveEvent);
  $(form).find('.crater-field-trigger').on('change', saveEvent);
  $(form).find('.crater-field-multi-add-button').click(addMultiEvent);
  $(form).find('.crater-field-multi-remove-button').click(removeMultiEvent);
  // .each(function(idx, button) {
    // $(button).click(c);
  // });
};

Crater.forms.setup = function(template, params) {
  _.each(template.findAll('.crater-form'), function(form) {
    setupForm(form, params);
  });;

};






