(function() {
  'use strict';

  function merge(target, source) {
    /* Merges two (or more) objects,
     giving the last one precedence */
    if ( typeof target !== 'object' ) {
      target = {};
    }

    for (var property in source) {
      if (source.hasOwnProperty(property)) {
        var sourceProperty = source[property];

        if (typeof sourceProperty === 'object') {
          target[property] = merge(target[property], sourceProperty);
          continue;
        }

        target[property] = sourceProperty;
      }
    }

    for (var a = 2, l = arguments.length; a < l; a++) {
      merge(target, arguments[a]);
    }

    return target;
  }

  /**
   * Initialize Timesheet object.
   */
  var Timesheet = function(data, options) {
    this.options = this.mergeWithDefault(options);
    this.data = [];
    this.bubbles = [];
    this.widthYear = 0;

    // Parse function fills this.bubbles as well.
    this.parse(data || []);

    if (typeof document !== 'undefined') {
      this.container = (typeof this.options.container === 'string') ? document.querySelector('#' + this.options.container) : this.options.container;
      this.drawSections();
      this.drawCurrentMonth();
      this.insertData();
    }
  };

  /**
   * Set default options and merge them with passed ones.
   */
  Timesheet.prototype.mergeWithDefault = function(options) {
    var defaults = {
      container: 'timesheet',
      type: 'parallel',
      theme: 'dark',
      extraClass: '',
      showDate: true,
      timesheetYearMin: null,
      timesheetYearMax: null
    };

    return merge(defaults, options);
  };

  /**
   * Parse timesheet data.
   */
  Timesheet.prototype.parse = function(data) {
    for (var n = 0; n < data.length; n++) {
      if (data[n].length !== 5) {
        throw 'Not enough input parameters for bubble ' + (n + 1);
      }
      var beg = this.parseDate(data[n][0]);
      var end = (data[n][1] !== '' ? this.parseDate(data[n][1]) : null);
      var label = data[n][2];
      var bubbleType = (data[n][3] !== '' ? data[n][3] : 'default');
      var link = (data[n][4] !== '' ? data[n][4] : '');

      if (beg.getFullYear() < this.year.min) {
        this.year.min = beg.getFullYear();
      }

      if (end && end.getFullYear() > this.year.max) {
        this.year.max = end.getFullYear();
      }
      else if (beg.getFullYear() > this.year.max) {
        this.year.max = beg.getFullYear();
      }

      this.data.push({start: beg, end: end, label: label, bubbleType: bubbleType});

      this.bubbles.push(this.createBubble({
          start: beg,
          end: end,
          type: bubbleType,
          label: label,
          timesheetYearMin: this.year.min,
          timesheetYearMax: this.year.max,
          link: link
        })
      );
    }
  };

  /**
   * Parse data string
   */
  Timesheet.prototype.parseDate = function(date) {
    if (date.indexOf('/') === -1) {
      date = new Date(parseInt(date, 10), 0, 1);
      date.hasMonth = false;
    }
    else {
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

    for (var c = this.options.timesheetYearMin; c <= this.options.timesheetYearMax; c++) {
      html.push('<section>' + c + '</section>');
    }

    this.container.className = 'timesheet ' + 'timesheet--' + this.options.type;

    if (this.options.extraClass.length) {
      this.container.className += ' ' + this.options.extraClass;
    }

    this.container.innerHTML = '<div class="scale">' + html.join('') + '</div>';
  };

  /**
   * Adds vertical line which represents current month on X axis (if applicable).
   */
  Timesheet.prototype.drawCurrentMonth = function() {
    var date = new Date();

    // If max year on X axis is after or is the current year.
    if (this.options.timesheetYearMax >= date.getFullYear()) {
      if (this.options.timesheetYearMax === date.getFullYear() && date.getMonth() < 12) {
        this.widthYear = this.container.querySelector('.scale section').offsetWidth;

        var currentMonthOffset = (this.options.timesheetYearMax - this.options.timesheetYearMin) * 12 + date.getMonth();
        this.container.innerHTML += '<div class="ts-vertical-line" style="left: ' + currentMonthOffset * (this.widthYear / 12) + 'px;"></div>';
      }
    }
  };

  /**
   * Insert data into Timesheet.
   */
  Timesheet.prototype.insertData = function() {
    if (this.options.type === 'parallel') {
      this.generateMarkupParallel();
    }
    else if (this.options.type === 'serial') {
      this.generateMarkupSerial();
    }
  };

  /**
   * Generate parallel markup.
   */
  Timesheet.prototype.generateMarkupParallel = function() {
    var html = [];
    this.widthYear = this.container.querySelector('.scale section').offsetWidth;
    var startTag = '';
    var endTag = '';

    for (var n = 0; n < this.bubbles.length; n++) {
      var bubble = this.bubbles[n];
      if (bubble.link !== '') {
        startTag ='<a class="bubble-link" href="' + bubble.link + '" style="margin-left: ' + bubble.monthOffsetStart * this.widthYear / 12 + 'px;">';
        endTag = '</a>';
      }
      else {
        startTag = '<span style="margin-left: ' + bubble.monthOffsetStart * this.widthYear / 12 + 'px;">';
        endTag = '</span>';
      }

      var line = [
        '<span style="margin-left: ' + bubble.monthOffsetStart * this.widthYear / 12 + 'px; width: ' + bubble.getWidth(this.widthYear) + 'px;" class="bubble bubble-' + bubble.type + '" data-duration="' + bubble.monthsLength + '"></span>' +
         startTag +
        '<span class="date">' + bubble.getDateLabel() + '</span>',
        '<span class="label">' + bubble.label + '</span>' + endTag
      ].join('');

      html.push('<li>' + line + '</li>');
    }

    this.container.innerHTML += '<ul class="data">' + html.join('') + '</ul>';
  };

  /**
   * Generate serial markup.
   */
  Timesheet.prototype.generateMarkupSerial = function() {
    var html = [];
    var i, j, currentList, currentBubble;
    this.widthYear = this.container.querySelector('.scale section').offsetWidth;

    var lists = this.buildSerialBubbleLists();

    html.push('<ul class="data">');
    // Lists loop, for rendering markup.
    for (i = 0; i < lists.length; i++) {
      currentList = lists[i];
      if (currentList.bubbles.length) {
        html.push('<li>');
        html.push('<ul class="ts-bubbles-wrapper">');
        var line = [];
        for (j = 0; j < currentList.bubbles.length; j++) {
          currentBubble = currentList.bubbles[j];
          line.push(
            '<li>',
              '<span style="left: ' + currentBubble.monthOffsetStart * this.widthYear / 12 + 'px; width: ' + currentBubble.getWidth(this.widthYear) + 'px;" class="bubble bubble-' + currentBubble.type + '" data-duration="' + currentBubble.monthsLength + '"></span>',
              '<span class="info-wrapper">',
                '<span class="date">' + currentBubble.getDateLabel() + '</span>',
                '<span class="label">' + currentBubble.label + '</span>',
              '</span>',
            '</li>'
          );
        }
        html.push(line.join(''));
        html.push('</ul>');
        html.push('</li>');
      }
    }
    html.push('</ul>');

    this.container.innerHTML += html.join('');
  };

  /**
   * Helper function for building bubble lists on serial timesheet view.
   */
  Timesheet.prototype.buildSerialBubbleLists = function() {
    var i, j;
    var list;
    var bubble;

    // One list element is a single row of bubbles.
    var lists = [
      {
        monthOffsetEnd: 0,
        bubbles: []
      }
    ];

    // Bubbles loop.
    for (i = 0; i < this.bubbles.length; i++) {
      bubble = this.bubbles[i];

      // Lists loop
      for (j = 0; j < lists.length; j++) {
        list = lists[j];
        // Check if is first element in loop (monthOffsetEnd is 0) or if bubble starts at least 1 month after list ends.
        if (!list.monthOffsetEnd || list.monthOffsetEnd + 1 <= bubble.monthOffsetStart) {
          lists[j].bubbles.push(bubble);
          lists[j].monthOffsetEnd = bubble.monthOffsetEnd;
          break;
        }

        // If it's the last iteration and we haven't found a list to which we can add bubble, create a new list.
        if  (j === lists.length - 1) {
          lists[j + 1] = {
            monthOffsetEnd: bubble.monthOffsetEnd,
            bubbles: [
              bubble
            ]
          };
          break;
        }
      }
    }

    return lists;
  };

  /**
   * Wrapper for adding bubbles.
   */
  Timesheet.prototype.createBubble = function(options) {
    // If end isn't defined, it means that the bubble is still active, so copy min value between current date and ending year that's set up in constructor.
    if (options.end === null) {
      var currentDate = new Date();
      var maxDate = new Date(this.options.timesheetYearMax, 12, 31);

      if (currentDate.getTime() < maxDate.getTime()) {
        options.end = currentDate;
      }
      else {
        options.end = maxDate;
      }
    }

    return new Bubble(options);
  };

  /**
   * Timesheet Bubble.
   */
  var Bubble = function(options) {
    this.start = options.start;
    this.end = options.end;

    this.timesheetYearMin = options.timesheetYearMin;
    this.timesheetYearMax = options.timesheetYearMax;

    this.monthOffsetStart = this.getStartOffset();
    this.monthOffsetEnd = this.getEndOffset();
    this.monthsLength = this.monthOffsetEnd - this.monthOffsetStart;

    this.link = options.link;
    this.type = options.type;
    this.label = options.label;
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
   * Format month number
   */
  Bubble.prototype.formatMonth = function(num) {
    num = parseInt(num, 10);

    return num >= 10 ? num : '0' + num;
  };

  /**
   * Get bubble's width in pixel
   */
  Bubble.prototype.getWidth = function(widthYear) {
    return (widthYear/12) * this.monthsLength;
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
