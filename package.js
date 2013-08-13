
Package.describe({
  summary: "Complete UI Library for Meteor"
});

Package.on_use(function (api, where) {

  api.add_files([
    'base/_.js',

    'components/remover.js',
    'components/toggle.js',

    'overlays/overlay.js',
    'overlays/alert.js',
    'overlays/confirm.js',
    'overlays/prompt.js',

    'forms/_.js',
    'forms/events/setup.js',
    'forms/display/displayField.js',
    'forms/display/displayFieldParams.js',
    'forms/display/displayFieldHeader.js',
    'forms/display/displayFieldBody.js',
    'forms/display/helper.js',
    'forms/inject/inject.js',
    'forms/fetch/fetch.js',


    'css/alert.css',
    'css/forms.css',
    'css/remover.css',
    'css/toggle.css',
    
  ], 'client');


});
