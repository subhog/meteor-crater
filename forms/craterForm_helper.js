
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
    multiItemBoxClass = ' craterForm-' + field.klass;
    multiItemDataId = ' data-idx="' + field.idx + '"';
  }

  var value = field.value;
  if(value === null || value === undefined) value = ''; 

  switch(field.type) {
    case 'group':
    case 'multiItem':
    groupClass = ' craterFormGroupBody';
  }

  switch(field.type) {
    case 'multi':
    header =  '<div class="craterFormFieldHeaderMenu">' +
                '<span class="craterFormFieldMultiAddButton">' + '+ Add' + '</span>' +
              '</div>';
    break;
    case 'multiItem':
    header =  '<div class="craterFormFieldHeaderMenu">' +
                '<span class="craterFormFieldMultiRemoveButton">' + '&times; remove' + '</span>' +
              '</div>';
    break;
    case 'image':
    header =  '<div class="craterFormFieldHeaderMenu">' +
                '<span class="craterFormFieldPhotoChangeButton">' + 'Change' + '</span>' +
              '</div>';
    break;
  } 

  switch(field.type) {
    case 'text':
    body =  '<input type="text" class="craterFormTrigger" '+
            'id="craterForm-' + field.prefix + '-' + Crater.forms.undot(field.param) + '" value="' + value + '"/>';
    break;
    case 'textarea':
    body =  '<textarea class="craterFormTrigger" '+
            'id="craterForm-' + field.prefix + '-' + Crater.forms.undot(field.param) + '">' + value +                            
            '</textarea>';
    break;
    case 'image':
    body =  '<image class="craterFormImagePreview" src="' + field.src + '"/>' +
            '<input type="hidden" '+
            'id="craterForm-' + field.prefix + '-' + Crater.forms.undot(field.param) + '" value="' + value + '"/>';
    break;
    case 'group':
    case 'multi':
    case 'multiItem':
    _.each(field.array, function(f) {
      body += printField(f);
    });
    break;
    

  }

  return  '<div class="craterFormFieldBox' + multiItemBoxClass + '" ' +
            'data-prefix="' + field.prefix + '" ' + 
            'data-param="' + field.param + '" ' + 
            multiItemDataId + '>' +
            '<div class="craterFormFieldHeader">' +
              field.label + header +
            '</div>' +
            '<div class="craterFormFieldBody' + groupClass + '">' +
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




