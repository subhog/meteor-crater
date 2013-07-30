

Crater.forms.inject = function(formMap, data, params) {

  var result = [];

  _.each(formMap, function(f) {
    var field = {
      label: f.label || '',
      param: f.param,
      type: f.type,
      value: '',
      prefix: params.prefix || '',
      filters: f.filters,
    };

    if(f.type === 'group') {
      field.array = Crater.forms.inject(f.array, data, params);
    } else if(f.type === 'multi') {

      var valueArray = Crater.forms.getValue(data, f.param);
      field.array = [];

      _.each(valueArray, function(valueItem, idx) {
        var fieldItem = {
          label: '',
          param: f.param,
          type: 'multiItem',
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
    } else {
      field.value = Crater.forms.getValue(data, f.param);
    }

    // console.log('>', f.label);

    result.push(field);

  });  


  return result;
};



