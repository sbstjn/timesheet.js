// require 'timesheet.bubble'

/* global TimesheetBubble */

(function() {
  'use strict';

  /**
   * Initialize a Timesheet
   */
  var Timesheet = function(container, min, max, data) {
    this.data = [];
    this.year = {
      min: min,
      max: max
    };

    this.parse(data || []);

    if (typeof document !== 'undefined') {
      this.container = (typeof container === 'string') ? document.querySelector('#'+container) : container;
      this.drawSections();
      this.insertData();
    }
  };

  /**
   * Insert data into Timesheet
   */
  Timesheet.prototype.insertData = function() {
    var html = [];
    var widthMonth = this.container.querySelector('.scale section').offsetWidth;

    for (var n = 0, m = this.data.length; n < m; n++) {
      var cur = this.data[n];
      var bubble = new TimesheetBubble(widthMonth, this.year.min, cur.start, cur.end);

      var line = [
        '<span style="margin-left: ' + bubble.getStartOffset() + 'px; width: ' + bubble.getWidth() + 'px;" class="bubble bubble-' + (cur.type || 'default') + '" data-duration="' + (cur.end ? Math.round((cur.end-cur.start)/1000/60/60/24/39) : '') + '"></span>',
        '<span class="date">' + bubble.getDateLabel() + '</span> ',
        '<span class="label">' + cur.label + '</span>'
      ].join('');

      html.push('<li>' + line + '</li>');
    }

    this.container.innerHTML += '<ul class="data">' + html.join('') + '</ul>';
  };

  /**
   * Draw section labels
   */
  Timesheet.prototype.drawSections = function() {
    var html = [];

    for (var c = this.year.min; c <= this.year.max; c++) {
      html.push('<section>' + c + '</section>');
    }

    this.container.className = 'timesheet color-scheme-default';
    this.container.innerHTML = '<div class="scale">' + html.join('') + '</div>';
  };

  /**
   * Parse data string
   */
  Timesheet.prototype.parseDate = function(date) {
    if (date.indexOf('/') === -1) {
      date = new Date(parseInt(date, 10), 0, 1);
      date.hasMonth = false;
    } else {
      date = date.split('/');
      date = new Date(parseInt(date[1], 10), parseInt(date[0], 10)-1, 1);
      date.hasMonth = true;
    }

    return date;
  };

  /**
   * Parse passed data
   */
  Timesheet.prototype.parse = function(data) {
    for (var n = 0, m = data.length; n<m; n++) {
      var beg = this.parseDate(data[n][0]);
      var end = data[n].length === 4 ? this.parseDate(data[n][1]) : null;
      var lbl = data[n].length === 4 ? data[n][2] : data[n][1];
      var cat = data[n][3] || 'default';

      if (beg.getFullYear() < this.year.min) {
        this.year.min = beg.getFullYear();
      }

      if (end && end.getFullYear() > this.year.max) {
        this.year.max = end.getFullYear();
      } else if (beg.getFullYear() > this.year.max) {
        this.year.max = beg.getFullYear();
      }

      this.data.push({start: beg, end: end, label: lbl, type: cat});
    }
  };

  window.Timesheet = Timesheet;
})();
