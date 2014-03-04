

Package.describe({
  summary: "Handy UI Library for Meteor"
});

Package.on_use(function (api, where) {

  if(api.export) {

    api.use(['deps', 'underscore', 'templating', 'handlebars', 'spark'], 'client');
    api.export('Crater', 'client');
    
  }


  api.add_files([
    'base/_.js',

    'components/__crater_template__datetime__.html',
    'components/__crater_template__datetime__.js',
    'components/date.js',
    'components/remover.js',
    'components/toggle.js',

    'overlays/__crater_template__alert__.html',
    'overlays/__crater_template__alert__.js',
    'overlays/overlay.js',
    'overlays/alerts.js',

    'forms/_.js',

    'forms/display/form.html',
    'forms/display/form.js',
    'forms/display/field_checkbox.html',
    'forms/display/field_datetime.html',
    'forms/display/field_group.html',
    'forms/display/field_image.html',
    'forms/display/field_info.html',
    'forms/display/field_label.html',
    'forms/display/field_multi.html',
    'forms/display/field_other.html',
    'forms/display/field_radio.html',
    'forms/display/field_text.html',
    'forms/display/field_text.js',
    'forms/display/field_textarea.html',
    'forms/display/field_toggle.html',
    
    'forms/events/setup.js',
    'forms/display/helper.js',
    'forms/inject/inject.js',
    'forms/fetch/fetch.js',


    'css/alert.css',
    'css/datetime.css',
    'css/forms.css',
    'css/remover.css',
    'css/toggle.css',
    
  ], 'client');


});








