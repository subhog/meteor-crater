
Package.describe({
  summary: "Complete UI Library for Meteor"
});

Package.on_use(function (api, where) {

  api.add_files([
    'base/_.js',

    'components/remover.js',
    'components/toggle.js',

    'overlays/overlay.js',


    'forms/_.js',
    'forms/events/setup.js',
    'forms/display/displayField.js',
    'forms/display/displayFieldParams.js',
    'forms/display/displayFieldHeader.js',
    'forms/display/displayFieldBody.js',
    'forms/display/helper.js',
    'forms/inject/inject.js',
    'forms/fetch/fetch.js',
  ], 'client');
});
