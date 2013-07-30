
var injectField = function(target, form, prefix, field, dbg) {

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
    
  } else {
    target[field.param] = $(form).find('#crater-form-' + prefix + '-' + Crater.forms.undot(field.param)).val();
  }

};


Crater.forms.build = function(form, map, options) {

  var value = {};

  _.each(map, function(field) {
    injectField(value, form, options.prefix || '', field);
  });


  return value;
};
