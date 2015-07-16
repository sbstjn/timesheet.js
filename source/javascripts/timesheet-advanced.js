(function() {
  'use strict';

  /**
   * Initialize Timesheet object.
   */
  var Timesheet = function(container, type, min, max, data) {
    this.type = (type === 'serial' || type === 'parallel') ? type : 'parallel';
    this.data = [];
    this.year = {
      min: min,
      max: max
    };
    this.bubbles = [];

    // Parse function fills this.bubbles as well.
    this.parse(data || []);

    if (typeof document !== 'undefined') {
      this.container = (typeof container === 'string') ? document.querySelector('#' + container) : container;
      this.drawSections();
      this.insertData();
    }
  };

  /**
   * Parse timesheet data.
   */
  Timesheet.prototype.parse = function(data) {
    for (var n = 0; n < data.length; n++) {
      var beg = this.parseDate(data[n][0]);
      var end = data[n].length === 4 ? this.parseDate(data[n][1]) : null;
      var label = data[n].length === 4 ? data[n][2] : data[n][1];
      var bubbleType = data[n].length === 4 ? data[n][3] : data[n].length === 3 ? data[n][2] : 'default';

      if (beg.getFullYear() < this.year.min) {
        this.year.min = beg.getFullYear();
      }

      if (end && end.getFullYear() > this.year.max) {
        this.year.max = end.getFullYear();
      } else if (beg.getFullYear() > this.year.max) {
        this.year.max = beg.getFullYear();
      }

      this.data.push({start: beg, end: end, label: label, bubbleType: bubbleType});

      this.bubbles.push(this.createBubble(beg, end, this.year.min, this.year.max));
    }
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
   * Insert data into Timesheet.
   */
  Timesheet.prototype.insertData = function() {
    if (this.type === 'parallel') {
      this.generateMarkupParallel();
    }
    else if (this.type === 'serial') {
      this.generateMarkupSerial();
    }
  };

  /**
   * Generate parallel markup.
   */
  Timesheet.prototype.generateMarkupParallel = function() {
    var html = [];
    var widthYear = this.container.querySelector('.scale section').offsetWidth;

    for (var n = 0; n < this.bubbles.length; n++) {
      var bubble = this.bubbles[n];
      var bubbleData = this.data[n];

      var line = [
        '<span style="margin-left: ' + bubble.monthOffsetStart * widthYear / 2 + 'px;" class="bubble bubble-' + bubbleData.type + '" data-duration="' + bubble.monthsLength + '"></span>',
        '<span class="date">' + bubble.getDateLabel() + '</span>'
      ].join('');

      html.push('<li>' + line + '</li>');
    }

    this.container.innerHTML += '<ul class="data">' + html.join('') + '</ul>';
  };

  /**
   * Generate serial markup.
   */
  Timesheet.prototype.generateMarkupSerial = function() {

  };

  /**
   * Wrapper for adding bubbles.
   */
  Timesheet.prototype.createBubble = function(start, end, timesheetYearMin, timesheetYearMax) {
    // If end isn't defined, it means that the bubble is still active, so copy min value between current date and ending year that's set up in constructor.
    if (end === null) {
      var currentDate = new Date();
      var maxDate = new Date(this.year.max, 12, 31);

      if (currentDate.getTime() < maxDate.getTime()) {
        end = currentDate;
      }
      else {
        end = maxDate;
      }
    }
    return new Bubble(start, end, timesheetYearMin, timesheetYearMax);
  };

  /**
   * Timesheet Bubble.
   */
  var Bubble = function(start, end, timesheetYearMin, timesheetYearMax) {
    this.start = start;
    this.end = end;

    this.timesheetYearMin = timesheetYearMin;
    this.timesheetYearMax = timesheetYearMax;

    this.monthOffsetStart = this.getStartOffset();
    this.monthOffsetEnd = this.getEndOffset();
    this.monthsLength = this.monthOffsetEnd - this.monthOffsetStart;
  };

  /**
   * Calculate starting offset for bubble (in months).
   */
  Bubble.prototype.getStartOffset = function() {
    return (12 * (this.start.getFullYear() - this.timesheetYearMin) + this.start.getMonth());
  };

  /**
   * Calculate ending offset for bubble (in months).
   */
  Bubble.prototype.getEndOffset = function() {
    return (12 * (this.end.getFullYear() - this.timesheetYearMin) + this.end.getMonth());
  };

  /**
   * Get the bubble's label
   */
  Bubble.prototype.getDateLabel = function() {
    return [
      (this.start.hasMonth ? this.formatMonth(this.start.getMonth() + 1) + '/' : '' ) + this.start.getFullYear(),
      (this.end ? '-' + ((this.end.hasMonth ? this.formatMonth(this.end.getMonth() + 1) + '/' : '' ) + this.end.getFullYear()) : '')
    ].join('');
  };

  window.Timesheet = Timesheet;
})();