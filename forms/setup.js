

var changeImageEvent = function(e) {
  var form = $(e.target).closest('.craterForm');
  var fieldBox = $(e.target).closest('.craterFormFieldBox');

  if(!(form.get()[0]).__crater__loadImage) return;

  form.get()[0].__crater__loadImage(null, function(err, data) {
    console.log("GOT IMAGE", err, data);
    if(!data || !data.image) return;
    $('#craterForm-' + fieldBox.data('prefix') + '-' + Crater.forms.undot(fieldBox.data('param'))).val(data.image);
    saveEvent(e);
  });
};


var addMultiEvent = function(e) {
  var form = $(e.target).closest('.craterForm');
  var fieldBox = $(e.target).closest('.craterFormFieldBox');
  form.trigger('addMultiItem', {param: fieldBox.data('param')});
};

var removeMultiEvent = function(e) {
  var form = $(e.target).closest('.craterForm');
  var fieldBox = $(e.target).closest('.craterFormFieldBox');
  form.trigger('removeMultiItem', {param: fieldBox.data('param'), idx: fieldBox.data('idx')});
};

var saveEvent = _.debounce(function(e) {
  $(e.target).closest('.craterForm').trigger('save');
}, 500);




var setupForm = function(form, params) {
  form.__crater__loadImage = params.loadImage;

  $(form).find('.craterFormFieldPhotoChangeButton').click(changeImageEvent);
  $(form).find('.craterFormTrigger').on('keyup', saveEvent);
  $(form).find('.craterFormFieldMultiAddButton').click(addMultiEvent);
  $(form).find('.craterFormFieldMultiRemoveButton').click(removeMultiEvent);
  // .each(function(idx, button) {
    // $(button).click(c);
  // });
};

Crater.forms.setup = function(template, params) {
  _.each(template.findAll('.craterForm'), function(form) {
    setupForm(form, params);
  });;

};
