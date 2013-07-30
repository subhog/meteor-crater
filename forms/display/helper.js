



Handlebars.registerHelper('craterForm', function(form) {
  var ret = '';
  _.each(form, function(field) {
    ret += Crater.form._displayField(field);
  });

  return new Handlebars.SafeString(ret);
});




