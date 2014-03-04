


Template.__crater_template__field_text__.rendered = function() {

  // console.log("CTF RENDER", this, this.data.validate);


  var str = '' + this.data.value;
  if(str.length > 0 && _.isRegExp(this.data.validate)) {
    var span = $(this.find('.crater-field-warning'));
    if(! this.data.validate.test(str) ) {
      span.show();
      span.text('Required form: ' + this.data.validate);
    } else {
      span.hide();
    }
  }
  

};


Template.__crater_template__field_text__.events({

  'keyup .crater-field-trigger': function(e, t) {
    if(! _.isRegExp(t.data.validate)) return;
    var span = $(t.find('.crater-field-warning'));
    if(! t.data.validate.test($(e.target).val() )) {
      span.show();
      span.text('Required form: ' + t.data.validate);
    } else {
      span.hide();
    }
  },

});


