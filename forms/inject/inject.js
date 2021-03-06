

Crater.forms.inject = function(formMap, data, params) {

  var result = [];

  _.each(formMap, function(f) {
    var field = {
      label: f.label || '',
      param: f.param,
      type: f.type,
      value: '',
      values: f.values,
      prefix: params.prefix || '',
      filters: f.filters,
      validate: f.validate,
      boxClass: f.boxClass,
      info: f.info,
    };

    if(f.type === 'group') {
      field.group = true;
      field.array = Crater.forms.inject(f.array, data, params);
    } else if(f.type === 'multi') {

      var valueArray = Crater.forms.getValue(data, f.param);
      field.array = [];

      _.each(valueArray, function(valueItem, idx) {
        var fieldItem = {
          label: '',
          param: f.param,
          type: 'multiItem',
          group: true,
          value: '',
          idx: idx,
          klass: params.prefix + '-' + Crater.forms.undot(f.param) || '',
        };

        fieldItem.array = Crater.forms.inject(f.array, valueItem, {
          prefix: params.prefix + '-' + Crater.forms.undot(f.param) + '---' + idx + '---',
          imageUrl: params.imageUrl,
          // idx: idx,
        });

        field.array.push(fieldItem);
      });
      

    } else if(f.type === 'image') {
      field.value = Crater.forms.getValue(data, f.param);

      if(params.imageUrl)
        field.src = params.imageUrl(Crater.forms.getValue(data, f.param));
      else
        field.src = Crater.forms.getValue(data, f.param);
    } else if(f.type === 'radio') {
      var val = Crater.forms.getValue(data, f.param);
      _.each(field.values, function(v) {
        v.prefix = field.prefix;
        v.param = field.param;
        if(v.value === val) {
          v.checked = true;
        } else {
          v.checked = false;
        }
      });
    } else if(f.type === 'checkbox') {
      field.value = Crater.forms.getValue(data, f.param);
    } else if(f.type === 'info') {
      field.content = f.content;
    } else {
      field.value = Crater.forms.getValue(data, f.param);
    }

    // console.log('>', f.label);

    result.push(field);

  });  


  return result;
};



