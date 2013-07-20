



# API

### Base

------------------------------------------------------------

## `Crater.go(template)`


Use within `Template.x.rendered` function to initialize Crater UI elements
used within tempalte instance.


Example:
 
    Template.options.rendered = function() {
      Crater.go(this);
    }

------------------------------------------------------------


    Crater.events(template, map)

Similar to `Template.x.events`. Use within `Template.x.rendered` function
to pass callbacks to Crater events.


Example:

  Template.options.rendered = function() {
    Crater.go(this);
    Crater.events(this, {

      'toggle .optionSwitch': function(e) {
        ...
      },

    });

  }


