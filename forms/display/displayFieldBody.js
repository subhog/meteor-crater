
Crater.form._displayFieldBody = function(field) {

  var body = '';
  var groupClass = '';

  var value = field.value;
  if(value === null || value === undefined) value = ''; 

  switch(field.type) {
    case 'group':
    case 'multiItem':
    groupClass = ' crater-field-group-body';
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


  return '<div class="crater-field-body' + groupClass + '">' +
            body +
          '</div>' +  

};

