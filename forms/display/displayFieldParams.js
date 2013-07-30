
Crater.form._displayFieldParams = function(field) {

  if(field.type === 'multiItem') {
    return ' class="crater-field-box crater-form-' + field.klass + '" ' +;
           ' data-idx="' + field.idx + '" ' +
           ' data-prefix="' + field.prefix + '" ' + 
           ' data-param="' + field.param + '" ';
  } else {
    return ' class="crater-field-box" ' +
           ' data-prefix="' + field.prefix + '" ' + 
           ' data-param="' + field.param + '" ';
  }

};

