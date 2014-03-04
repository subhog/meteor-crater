

Template.__crater_template__form__.selectBody = function() {
  var t = Template['__crater_template__field_' + this.type + '__'];
 
  if(t) {
    return new Handlebars.SafeString(t(this));
  }

  return new Handlebars.SafeString(Template['__crater_template__field_other__'](this));
};



