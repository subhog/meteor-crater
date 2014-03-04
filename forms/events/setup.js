
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

var clearImageEvent = function(e) {
  var form = $(e.target).closest('.crater-form');
  var fieldBox = $(e.target).closest('.crater-field-box');

  $('#crater-form-' + fieldBox.data('prefix') + '-' + Crater.forms.undot(fieldBox.data('param'))).val('');

  saveEvent(e);  
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

  $(form).find('.crater-field-image-change-button').off('click.craterFormEvent');
  $(form).find('.crater-field-image-change-button').on('click.craterFormEvent', changeImageEvent);
  $(form).find('.crater-field-image-clear-button').off('confirm.craterFormEvent');
  $(form).find('.crater-field-image-clear-button').on('confirm.craterFormEvent', clearImageEvent);
  $(form).find('.crater-field-trigger').off('keyup.craterFormEvent');
  $(form).find('.crater-field-trigger').on('keyup.craterFormEvent', saveEvent);
  $(form).find('.crater-field-trigger').off('change.craterFormEvent');
  $(form).find('.crater-field-trigger').on('change.craterFormEvent', saveEvent);
  $(form).find('.crater-field-multi-add-button').off('click.craterFormEvent');
  $(form).find('.crater-field-multi-add-button').on('click.craterFormEvent', addMultiEvent);
  $(form).find('.crater-field-multi-remove-button').off('click.craterFormEvent');
  $(form).find('.crater-field-multi-remove-button').on('click.craterFormEvent', removeMultiEvent);
  $(form).off('triggerChange.craterFormEvent');
  $(form).on('triggerChange.craterFormEvent', saveEvent);

};

Crater.forms.setup = function(template, params) {
  _.each(template.findAll('.crater-form'), function(form) {
    setupForm(form, params);
  });;

};






