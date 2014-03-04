
var injectField = function(target, form, prefix, field, dbg) {
  // console.log("INJF", arguments);
  
  if(field.type === 'group') {
    _.each(field.array, function(f) {
      injectField(target, form, prefix, f);
    });
  } else if(field.type === 'multi') {
    var selector = '.crater-form-' + prefix + '-' + Crater.forms.undot(field.param);

    var array = [];
    $(form).find(selector).each(function(idx, formPart) {

      var item = {};
      _.each(field.array, function(ffield) {
        injectField(item, formPart, prefix + '-' + Crater.forms.undot(field.param) + '---' + idx + '---', ffield, true);
      });
      array.push(item);
    });


    target[field.param] = array;
    
  } else if(field.type === 'radio') {

    // console.log("FETCHING", field);
    _.each(field.values, function(val) {
      var str = '#crater-form-' + prefix + '-' + Crater.forms.undot(field.param) + '-' + Crater.forms.undot(val.value) + '';
      var f = $(form).find(str);
      // console.log("RADIO DOT", str, f, f.is(':checked'));
      if(f.is(':checked')) {
        target[field.param] = val.value;
      }
    });

  } else if(field.type === 'checkbox') {
    target[field.param] = $(form).find('#crater-form-' + prefix + '-' + Crater.forms.undot(field.param) + '').is(':checked');
  // } else if(field.type === 'label') {
  } else if(field.type === 'info') {
    /* Ignore this field */
  } else {
    target[field.param] = $(form).find('#crater-form-' + prefix + '-' + Crater.forms.undot(field.param) + '').val();
    if(field.type === 'datetime') {
      target[field.param] = new Date(target[field.param]);
    } else if(field.type === 'number') {
      target[field.param] = + target[field.param];
    }
  }

};


/* Fetch data object from the form state */
Crater.forms.fetch = function(form, map, options) {
  // console.log("FETCH VALUE");

  var value = {};

  _.each(map, function(field) {
    injectField(value, form, options.prefix || '', field);
  });


  return value;
};
