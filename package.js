
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
    'forms/setup.js',
    'forms/craterForm_helper.js',
    'forms/injectFormValues.js',
    'forms/build.js',
  ], 'client');
});
