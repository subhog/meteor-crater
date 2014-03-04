

var displayAlert = function(data, options, callback) {
  var param = {};
  if(typeof options === 'string') {
    data.message = options;
    param.data = data;
  } else {
    _.extend(data, options);
    param.data = data;
    _.extend(param, options);
  }

  return Crater.overlay('__crater_template__alert__', param, callback);
};

Crater.alert = function(options, callback) {
  displayAlert({
    title: false,
    closer: false,

    message: '',
    prompt: false,
    value: '',

    cancel: false,
    ok: 'OK',
  }, options, callback);
};

Crater.confirm = function(options, callback) {
  displayAlert({
    title: false,
    closer: false,
    
    message: '',
    prompt: false,
    value: '',

    cancel: 'CANCEL',
    ok: 'OK',
  }, options, callback);
};

Crater.prompt = function(options, callback) {
  displayAlert({
    title: false,
    closer: false,
    
    message: '',
    prompt: true,
    value: '',

    cancel: 'CANCEL',
    ok: 'OK',
  }, options, callback);
};


