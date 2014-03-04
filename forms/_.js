

Crater.forms = {};

Crater.forms.undot = function(str) {
  if(!str) {
    // console.trace();
    return null;
  }

  return str.replace(/[^a-zA-Z0-9_]/g, function(x) {
    return 'x' + (''+x).charCodeAt(0) + '-';
  });
};


Crater.forms.getValue = function(object, key) {
  if(!key) return null;
  var arr = key.split('.');
  var o = object;
  for(var i in arr) {
    if(!o) return null;
    o = o[arr[i]];
  }
  return o;
};


