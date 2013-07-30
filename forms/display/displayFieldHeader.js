
Crater.forms._displayFieldHeader = function(field) {

  var header = '';
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

  return  '<div class="crater-field-header">' +
            field.label + header +
          '</div>';

};

