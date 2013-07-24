# This doc is outdated, new version pending.

# Crater UI Library for Meteor.js


This is a small, but growing library of common UI elements that can be reused acrosss Meteor applications.


### Features:

- Easy reusable forms
    - Nested attributes
    - Image element
- Modals and overlays
- Small useful elements
    - Two-step safety button
    - Toggle switch







# API


## Base

## `Crater.go`

`Crater.go(templateInstance)`


Use within `Template.x.rendered` function to initialize Crater UI elements
used within tempalte instance.


**Example:**
 
    Template.options.rendered = function() {
      Crater.go(this);
    }




## `Crater.events`

`Crater.events(templateInstance, map)`

Similar to `Template.x.events`. Use within `Template.x.rendered` function
to pass callbacks to Crater events.


**Example:**

    Template.options.rendered = function() {
      Crater.go(this);
      Crater.events(this, {

        'toggle .optionSwitch': function(e) {
          ...
        },

      });

    }



## [Forms](https://github.com/subhog/meteor-crater-forms)



## [Overlays, modals and alerts](https://github.com/subhog/meteor-crater-overlay)


## [Remover – Two-step safety button](https://github.com/subhog/meteor-crater-remover)


## [Toggle switch](https://github.com/subhog/meteor-crater-toggle)





