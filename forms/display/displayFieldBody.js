
// var filters = {
//   html: function(value) {
//     return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
//   }
// };


Crater.forms._displayFieldBody = function(field) {

  var body = '';
  var groupClass = '';

  var value = field.value;
  if(value === null || value === undefined) value = ''; 
  value = _.escape(value);

  // if(field.filters) {
  //   _.each(field.filters, function(filter) {
  //     if(filters[filter]) value = filters[filter](value);
  //   });
  // }

  switch(field.type) {
    case 'group':
    case 'multiItem':
    groupClass = ' crater-field-group-body';
  }

  switch(field.type) {
    case 'label':
    body = '' + value + 
          '<input type="hidden" '+
          'id="crater-form-' + field.prefix + '-' + Crater.forms.undot(field.param) + '" value="' + value + '"/>';
    break;
    case 'text':
    case 'number':
    case 'datetime':
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
    case 'checkbox':
    body =  '<input type="checkbox" class="crater-field-trigger" '+
            'id="crater-form-' + field.prefix + '-' + Crater.forms.undot(field.param) + '" ' +
            ((field.value) ? 'checked' : '') +
            '/>';
    break;
    case 'radio':
    body = '';
    _.each(field.values, function(value) {
      var val = value;
      if(typeof val === 'string') {
        val = {label: value, value: value};
      }
      body += '<input type="radio" ' +
              'class="crater-field-trigger" ' +
              'name="crater-form-' + field.prefix + '-' + Crater.forms.undot(field.param) + '" ' +
              'id="crater-form-' + field.prefix + '-' + Crater.forms.undot(field.param) + '-' + Crater.forms.undot(val.value) + '" ' +
              'value="' + val.value + '" ' +
              (val.checked ? 'checked' : '' ) +
              '>';
      body += '<label ' +
              'for="crater-form-' + field.prefix + '-' + Crater.forms.undot(field.param) + '-' + Crater.forms.undot(val.value) + '" ' +
              // 'value="' + val.value + '" ' +
              '>' + val.label + '</label>';
      
    });
    break;
    case 'group':
    case 'multi':
    case 'multiItem':
    _.each(field.array, function(f) {
      body += Crater.forms._displayField(f);
    });
    break;
  }


  return '<div class="crater-field-body' + groupClass + '">' +
            body +
          '</div>';

};

