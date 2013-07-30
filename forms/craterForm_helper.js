
/******

  craterFormFieldBox
  craterFormFieldHeader
  craterFormFieldHeaderMenu
  craterFormFieldMultiAddButton
  craterFormFieldBody


******/






var printField = function(field) {
  var header = '';
  var body = '';
  var groupClass = '';
  var multiItemBoxClass = '';
  var multiItemDataId = '';

  if(field.type === 'multiItem') {
    multiItemBoxClass = ' crater-form-' + field.klass;
    multiItemDataId = ' data-idx="' + field.idx + '"';
  }

  var value = field.value;
  if(value === null || value === undefined) value = ''; 

  switch(field.type) {
    case 'group':
    case 'multiItem':
    groupClass = ' crater-field-group-body';
  }

  switch(field.type) {
    case 'multi':
    header =  '<div class="crater-field-header-menu">' +
                '<span class="crater-field-multi-add-button">' + '+ Add' + '</span>' +
              '</div>';
    break;
    case 'multiItem':
    header =  '<div class="crater-field-header-menu">' +
                '<span class="crater-field-multi-remove-button">' + '&times; remove' + '</span>' +
              '</div>';
    break;
    case 'image':
    header =  '<div class="crater-field-header-menu">' +
                '<span class="crater-field-image-change-button">' + 'Change' + '</span>' +
              '</div>';
    break;
  } 

  switch(field.type) {
    case 'text':
    body =  '<input type="text" class="crater-field-trigger" '+
            'id="crater-form-' + field.prefix + '-' + Crater.forms.undot(field.param) + '" value="' + value + '"/>';
    break;
    case 'textarea':
    body =  '<textarea class="crater-field-trigger" '+
            'id="crater-form-' + field.prefix + '-' + Crater.forms.undot(field.param) + '">' + value +                            
            '</textarea>';
    break;
    case 'image':
    body =  '<image class="crater-field-image-preview" src="' + field.src + '"/>' +
            '<input type="hidden" '+
            'id="crater-form-' + field.prefix + '-' + Crater.forms.undot(field.param) + '" value="' + value + '"/>';
    break;
    case 'group':
    case 'multi':
    case 'multiItem':
    _.each(field.array, function(f) {
      body += printField(f);
    });
    break;
    

  }

  return  '<div class="crater-field-box' + multiItemBoxClass + '" ' +
            'data-prefix="' + field.prefix + '" ' + 
            'data-param="' + field.param + '" ' + 
            multiItemDataId + '>' +
            '<div class="crater-field-header">' +
              field.label + header +
            '</div>' +
            '<div class="crater-field-body' + groupClass + '">' +
              body +
            '</div>' +  
          '</div>';
};


Handlebars.registerHelper('craterForm', function(form) {
  var ret = '';
  _.each(form, function(field) {
    ret += printField(field);
  });

  return new Handlebars.SafeString(ret);
});




