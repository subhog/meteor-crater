
Template.__crater_template__datetime__.events({

  'click .crater-datetime-button': function(e, t) {
    t.data.visible = !t.data.visible;
    t.data._dep.changed();
    // $(t.find('.crater-datetime-chooser')).toggle();
    // console.log("REFRESH");
    if(t.data.trigger) {
      $(t.find('.crater-datetime-box')).closest('.crater-form').trigger('triggerChange');
    }
  },

  'keyup .crater-datetime-year-field': function(e, t) {
    var val = $(e.target).val();
    if(/^\d{4}$/.test(val)) {
      year = parseInt(val, 10);
      if(year < 1970) return;

      var date = t.data.date;
      var day = date.getDate();
      date.setDate(1);
      date.setFullYear(year);
      var max = daysInMonth(date);
      date.setDate( (day > max) ? max : day );
      refreshFromDate(t);
    }
  },

  'keyup .crater-datetime-time-field': function(e, t) {
    var val = $(e.target).val();
    // console.log("TRY VAL", val);
    if(/^\s*\d{1,2}:\d{2}\s*([aApP][mM])?\s*$/.test(val)) {
      var match = val.match(/^\s*(\d{1,2}):(\d{2})\s*([aApP][mM])?\s*$/);
      var h = parseInt(match[1], 10);
      var m = parseInt(match[2], 10);
      if(/^[pP][mM]$/.test(match[3])) h += 12;

      // if(date.getHours() === h && date.getMinutes() === m) return;
      if(h >= 0 && h <= 23 && m >= 0 && m <= 59) {
        var date = t.data.date;
        // console.log("SET TIME", h, m, t);
        date.setHours(h);
        date.setMinutes(m);
        refreshFromDate(t);
      }
    }
  },

  'click .crater-datetime-year-left': function(e, t) {
    var date = t.data.date;
    var day = date.getDate();
    date.setDate(1);
    date.setFullYear(date.getFullYear() - 1);
    var max = daysInMonth(date);
    date.setDate( (day > max) ? max : day );
    refreshFromDate(t);
  },

  'click .crater-datetime-year-right': function(e, t) {
    var date = t.data.date;
    var day = date.getDate();
    date.setDate(1);
    date.setFullYear(date.getFullYear() + 1);
    var max = daysInMonth(date);
    date.setDate( (day > max) ? max : day );
    refreshFromDate(t);
  },

  'click .crater-datetime-month-button': function(e, t) {
    var date = t.data.date;
    var day = date.getDate();
    date.setDate(1);
    date.setMonth($(e.target).data('month'));
    var max = daysInMonth(date);
    date.setDate( (day > max) ? max : day );
    refreshFromDate(t);
  },

  'click .crater-datetime-day-button-active': function(e, t) {
    var date = t.data.date;
    date.setDate($(e.target).data('day'));
    refreshFromDate(t);
  },

  'click .crater-datetime-chooser-button': function(e, t) {
    var minutes = parseInt($(e.target).data('minutes'), 10);
    var date = t.data.date;
    date.setTime(date.getTime() + minutes * 60000);
    refreshFromDate(t);
  },


});

var refreshFromDate = function(t) {
  t.data.time = t.data.date.getTime();
  t.data._dep.changed();

  if(t.data.trigger) {
    save(t);
  }
};

var save = _.debounce(function(t) {
  if(t.__crater_wasDestroyed__) return;
  $(t.find('.crater-datetime-box')).closest('.crater-form').trigger('triggerChange');
}, 10000);


Template.__crater_template__datetime__.created = function() {
  this.data.date = new Date(this.data.time);
  this.data.visible = false;
  this.data._dep = new Deps.Dependency();
  this.data.chooserId = Random.hexString(16);
};

Template.__crater_template__datetime__.rendered = function() {
  // this.data.date = new Date(this.data.time);
};

Template.__crater_template__datetime__.hidden = function() {
  this._dep.depend();
  return !this.visible;
};

Template.__crater_template__datetime__.displayRaw = function() {
  this._dep.depend();
  return '' + this.date;
};

Template.__crater_template__datetime__.display = function() {
  //WED 2014-01-20 12:87 PM
  this._dep.depend();

  if(!this.date) return '???';

  var month = this.date.getMonth() + 1;
  var date = this.date.getDate();
  var hours = this.date.getHours();
  var minutes = this.date.getMinutes();
  var am = 'AM';
  if(hours > 12) {
    hours -= 12;
    am = 'PM';
  }
  if (month < 10) month = '0' + month;
  if (date < 10) date = '0' + date;
  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;


  return '' +
    dayNames[this.date.getDay()] + ' ' +
    this.date.getFullYear() + '-' + 
    month +  '-' + 
    date + ' ' +
    hours + ':' + minutes + ' ' + am;
};

Template.__crater_template__datetime__.year = function() {
  this._dep.depend();
  if(!this.date) return '1970';
  return '' + this.date.getFullYear();
};


var monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

var dayNames = [
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
];

// var months = monthNames.map(function(name, idx) {
//   return {
//     label: name,
//     idx: idx,
//   };
// });

Template.__crater_template__datetime__.months = function() {
  this._dep.depend();
  var month = this.date.getMonth();
  return monthNames.map(function(name, idx) {
    return {
      label: name,
      idx: idx,
      current: idx === month,
    };
  });
};

Template.__crater_template__datetime__.currentMonth = function() {
  // this._dep.depend();
  console.log("CM?", this);
  return false;
};


Template.__crater_template__datetime__.days = function() {
  this._dep.depend();
  var days = [];
  _.each(dayNames, function(dn, idx) {
    days.push({
      active: false,
      label: dn,
      bold: (idx === 0 || idx === 6),
    });
  });

  var empty = (this.date.getDay() - this.date.getDate() + 1 + 70) % 7;

  _.times(empty, function() {
    days.push({
      active: false,
      label: '',
    });
  });

  var date = this.date.getDate();

  _.times(daysInMonth(this.date), function(idx) {
    days.push({
      active: true,
      label: (1 + idx),
      idx: (1 + idx),
      current: (idx + 1) === date,
    });
  });


  return days;
};



Template.__crater_template__datetime__.displayTime = function() {
  this._dep.depend();

  if(!this.date) return '???';

  var hours = this.date.getHours();
  var minutes = this.date.getMinutes();
  var am = 'AM';
  if(hours > 12) {
    hours -= 12;
    am = 'PM';
  }
  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;


  return '' + hours + ':' + minutes + ' ' + am;
};



var daysInMonth = function(date) {
  var d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.getDate();
};




Template.__crater_template__datetime__.destroyed = function() {
  this.__crater_wasDestroyed__ = true;
};






