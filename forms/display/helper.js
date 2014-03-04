

Handlebars.registerHelper('craterForm', function(form) {
  return new Handlebars.SafeString(Template['__crater_template__form__'](form));

  /* Previous version. Get rid of that. */
  // var ret = '';
  // _.each(form, function(field) {
  //   ret += Crater.forms._displayField(field);
  // });

  // return new Handlebars.SafeString(ret);
});


Handlebars.registerHelper('craterUndot', function(text) {
  return Crater.forms.undot(text);
});



Handlebars.registerHelper('craterTextValue', function(text) {
  return text ? text : '';
});


