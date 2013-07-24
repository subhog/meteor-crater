

Crater.forms = {};

Crater.forms.undot = function(str) {
  return str.replace(/\./g, '---DOT---');
};


Crater.forms.getValue = function(object, key) {
  var arr = key.split('.');
  var o = object;
  for(var i in arr) {
    if(!o) return null;
    o = o[arr[i]];
  }
  return o;
};


