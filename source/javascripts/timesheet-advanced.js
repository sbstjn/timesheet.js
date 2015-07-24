// jshint maxstatements:false

(function() {
  'use strict';

  /**
   * Merges two (or more) objects, giving the last one precedence.
   *
   * @param {Object} target Target object.
   * @param {Object} source Source object.
   *
   * @return {Object} target Combined object.
   */
  function merge(target, source) {
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
   * @constructor
   *
   * @param {Array} data List of inputs.
   * @param {Object} options Configuration options.
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
   *
   * @param {Object} options Configuration options given.
   *
   * @return {Object} options Combination of given and default options.
   */
  Timesheet.prototype.mergeWithDefault = function(options) {
    var defaults = {
      container: 'timesheet',
      type: 'parallel',
      theme: 'dark',
      extraClass: '',
      showDate: true,
      timesheetYearMin: null,
      timesheetYearMax: null,
      scrollX: true
    };

    return merge(defaults, options);
  };

  /**
   * Parse timesheet data.
   *
   * @param {Array} data List of data for generating bubbles.
   */
  Timesheet.prototype.parse = function(data) {
    var overrideTimesheetMin = this.options.timesheetYearMin === null;
    var overrideTimesheetMax = this.options.timesheetYearMax === null;

    for (var n = 0; n < data.length; n++) {
      if (data[n].length !== 5) {
        throw 'Not enough input parameters for bubble ' + (n + 1);
      }
      var bubbleStart = this.parseDate(data[n][0]);
      var bubbleEnd = (data[n][1] !== '' ? this.parseDate(data[n][1]) : null);
      var label = data[n][2];
      var bubbleType = (data[n][3] !== '' ? data[n][3] : 'default');
      var link = (data[n][4] !== '' ? data[n][4] : '');

      // todo: if start before beginning, if end after end don't add to list of bubbles.

      // Check if  timesheet year min/max wasn't set and use minimum/maximum bubble value for setting up the year sections.
      if (overrideTimesheetMin && bubbleStart.getFullYear() < this.options.timesheetYearMin) {
        this.options.timesheetYearMin = bubbleStart.getFullYear();
      }

      if (overrideTimesheetMax) {
        if (bubbleEnd && bubbleEnd.getFullYear() > this.options.timesheetYearMax) {
          this.options.timesheetYearMax = bubbleEnd.getFullYear();
        }
        else if (bubbleStart.getFullYear() > this.options.timesheetYearMax) {
          this.options.timesheetYearMax = bubbleStart.getFullYear();
        }
      }

      this.data.push({start: bubbleStart, end: bubbleEnd, label: label, bubbleType: bubbleType});

      this.bubbles.push(this.createBubble({
          start: bubbleStart,
          end: bubbleEnd,
          type: bubbleType,
          label: label,
          timesheetYearMin: this.options.timesheetYearMin,
          timesheetYearMax: this.options.timesheetYearMax,
          link: link,
          present: false
        })
      );
    }
  };

  /**
   * Function for checking whether bubble fits timesheet.
   *
   * @param {date} bubbleStart Beginning date for a bubble.
   * @param {date} bubbleEnd Ending date for a bubble.
   *
   * @return {boolean} fits.
   */
  Timesheet.prototype.bubbleFits = function(bubbleStart, bubbleEnd) {
    var dateTimesheetStart = new Date('01/01/' + this.options.timesheetYearMin);
    var dateTimesheetEnd = new Date('12/31/' + this.options.timesheetYearMax);

    var fits = false;

    if (dateTimesheetStart < bubbleStart && bubbleStart < dateTimesheetEnd) {
      fits = true;
    }

    if (dateTimesheetEnd > bubbleStart && bubbleEnd > dateTimesheetStart) {
      fits = true;
    }

    return fits;
  };

  /**
   * Parse date string
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

    if (this.options.theme.length) {
      this.container.className += ' timesheet--' + this.options.theme;
    }

    if (this.options.extraClass.length) {
      this.container.className += ' ' + this.options.extraClass;
    }

    this.container.innerHTML = '<div class="tsa-scale">' + html.join('') + '</div>';
  };

  /**
   * Adds vertical line which represents current month on X axis (if applicable).
   */
  Timesheet.prototype.drawCurrentMonth = function() {
    var date = new Date();

    // If max year on X axis is after or is the current year.
    if (this.options.timesheetYearMax >= date.getFullYear()) {
      if (this.options.timesheetYearMax === date.getFullYear() && date.getMonth() < 12) {
        this.widthYear = this.container.querySelector('.tsa-scale section').offsetWidth;

        var currentMonthOffset = (this.options.timesheetYearMax - this.options.timesheetYearMin) * 12 + date.getMonth();
        this.container.innerHTML += '<div class="tsa-vertical-line" style="left: ' + currentMonthOffset * (this.widthYear / 12) + 'px;"></div>';
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

    // Elements on which to detect click event.
    var bubbleFilter = function(elem) {return hasClass(elem, 'tsa-bubble');};

    if (this.container.addEventListener) {
      this.container.addEventListener('click', delegate(bubbleFilter, drawTooltip, this.options.theme));

      if (this.options.scrollX) {
        // IE9, Chrome, Safari, Opera
        this.container.addEventListener('mousewheel', timesheetScrollbar, false);
        // Firefox
        this.container.addEventListener('DOMMouseScroll', timesheetScrollbar, false);
      }
    }
    else {
      this.container.attachEvent('click', delegate(bubbleFilter, drawTooltip, this.options.theme));
      
      if (this.options.scrollX) {
        // IE 6/7/8
        this.container.attachEvent('onmousewheel', timesheetScrollbar);
      }
    }
  };

  /**
   * Helper function for setting event handler for elements that satisfy criteria.
   *
   * @param {function} criteria Function that selects elements for which to register click event.
   * @param {function} listener Function that responds to click event.
   * @param {string} theme Color theme for the tooltip.
   */
  var delegate = function(criteria, listener, theme) {
    return function(e) {
      var el = e.target;
      do {
        if (!criteria(el)) {
          continue;
        }
        e.delegateTarget = el;
        e.theme = theme;
        listener.apply(this, arguments);
        return;
      } while((el = el.parentNode));
    };
  };

  /**
   * Helper function for checking if element has class.
   *
   * @param {Object} element
   * @param {string} cls Class name.
   *
   * @return {boolean} True if element has given class.
   */
  var hasClass = function(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
  };

  /**
   * Scroll timesheet on X axis if it doesn't fit.
   *
   * @param {Object} e Scroll event.
   */
  var timesheetScrollbar = function(e) {
    e = window.event || e;
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    this.scrollLeft -= (delta * 40); // Multiplied by 40

    // Prevent body scroll only if scrollLeft is between the content (scrollLeft is not at the start or end).
    if (this.scrollLeft > 0 && (this.scrollWidth - this.scrollLeft !== this.offsetWidth)) {
      e.preventDefault();
    }
  };

  /**
   * Generate parallel markup.
   */
  Timesheet.prototype.generateMarkupParallel = function() {
    var html = [];
    this.widthYear = this.container.querySelector('.tsa-scale section').offsetWidth;
    var startTag = '';
    var endTag = '';

    for (var n = 0; n < this.bubbles.length; n++) {
      var bubble = this.bubbles[n];
      if (this.bubbleFits(bubble.start, bubble.end)) {
        var position = bubble.getPosition(this);
        if (bubble.link !== '') {
          startTag ='<a class="tsa-bubble-link" href="' + bubble.link + '" style="margin-left: ' + position.offset + '">';
          endTag = '</a>';
        }
        else {
          startTag = '<span style="margin-left: ' + position.offset + '">';
          endTag = '</span>';
        }

        var bubbleClasses = ['tsa-bubble', 'tsa-bubble-' + bubble.type];
        if (bubble.startedBeforeTimesheet) {
          bubbleClasses.push('tsa-bubble--started-before');
        }

        if (bubble.endedAfterTimesheet) {
          bubbleClasses.push('tsa-bubble--ended-after');
        }

        var line = [
          '<span data-bubble-link="' + bubble.link + '" data-bubble-label="' + bubble.label + '" data-bubble-date="' + bubble.getDateLabel() + '" style="margin-left: ' + position.offset + '; width: ' + position.width + ';" class="' + bubbleClasses.join(' ') + '" data-duration="' + bubble.monthsLength + '"></span>' +
          startTag +
          '<span class="tsa-date">' + bubble.getDateLabel() + '</span>',
          '<span class="tsa-label">' + bubble.label + '</span>' + endTag
        ].join('');

        html.push('<li>' + line + '</li>');
      }
    }

    this.container.innerHTML += '<ul class="tsa-data">' + html.join('') + '</ul>';
  };

  /**
   * Generate serial markup.
   */
  Timesheet.prototype.generateMarkupSerial = function() {
    var html = [];
    var i, j, currentList, currentBubble;
    this.widthYear = this.container.querySelector('.tsa-scale section').offsetWidth;

    var lists = this.buildSerialBubbleLists();

    html.push('<ul class="tsa-data">');
    // Lists loop, for rendering markup.
    for (i = 0; i < lists.length; i++) {
      currentList = lists[i];
      if (currentList.bubbles.length) {
        html.push('<li>');
        html.push('<ul class="tsa-bubbles-wrapper">');
        var line = [];
        for (j = 0; j < currentList.bubbles.length; j++) {
          currentBubble = currentList.bubbles[j];
          var position = currentBubble.getPosition(this);
          var bubbleClasses = ['tsa-bubble', 'tsa-bubble-' + currentBubble.type];
          if (currentBubble.startedBeforeTimesheet) {
            bubbleClasses.push('tsa-bubble--started-before');
          }

          if (currentBubble.endedAfterTimesheet) {
            bubbleClasses.push('tsa-bubble--ended-after');
          }

          line.push(
            '<li>',
              '<span data-bubble-link="' + currentBubble.link + '" data-bubble-label="' + currentBubble.label + '" data-bubble-date="' + currentBubble.getDateLabel() + '" style="left: ' + position.offset + '; width: ' + position.width + ';" class="' + bubbleClasses.join(' ') + '" data-duration="' + currentBubble.monthsLength + '"></span>',
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
   *
   * @return {Array} Lists of bubbles.
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

      if (this.bubbleFits(bubble.start, bubble.end)) {
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
          if (j === lists.length - 1) {
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
    }

    return lists;
  };

  /**
   * Wrapper for adding bubbles.
   *
   * @param {Object} options Bubble options.
   *
   * @return {Object} New bubble.
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
      options.present = true;
    }

    return new Bubble(options);
  };

  /**
   * Show tooltip for given mouse event.
   *
   * @param {Object} e Mouse event.
   */
  var drawTooltip = function(e) {
    e.stopPropagation();

    var readAttributes = function(element) {
      return {
        dateLabel: element.getAttribute('data-bubble-date'),
        label: element.getAttribute('data-bubble-label'),
        link: element.getAttribute('data-bubble-link')
      };
    };

    var content = readAttributes(e.delegateTarget),
        tooltip = document.createElement('div'),
        dateLabel = document.createElement('span'),
        textLabel,
        dateLabelValue = document.createTextNode(content.dateLabel),
        labelValue = document.createTextNode(content.label),
        oldTooltip = document.querySelector('#timesheet-tooltip');

    tooltip.className = 'tsa-tooltip';
    if (e.theme === 'light') {
      tooltip.className += ' tsa-tooltip--dark';
    }
    tooltip.id = 'timesheet-tooltip';

    dateLabel.appendChild(dateLabelValue);
    dateLabel.className = 'tsa-tooltip-date';
    tooltip.appendChild(dateLabel);

    if (content.link) {
      textLabel = document.createElement('a');
      textLabel.appendChild(labelValue);
      textLabel.title = content.label;
      textLabel.href = content.link;
    }
    else {
      textLabel = document.createElement('p');
      textLabel.appendChild(labelValue);
    }

    textLabel.className = 'tsa-tooltip-label';
    tooltip.appendChild(textLabel);

    tooltip.style.left = ((e.pageX + 90 >= document.body.clientWidth) ? (document.body.clientWidth - 181) : ((e.pageX - 90 < 0) ? 0 : (e.pageX - 90))) + 'px';

    if (oldTooltip) {
      document.body.replaceChild(tooltip, oldTooltip);
    }
    else {
      document.body.appendChild(tooltip);
    }
    if (document.body.clientHeight < e.pageY + tooltip.offsetHeight) {
      tooltip.style.top = (e.pageY - tooltip.offsetHeight - 5) + 'px';
    }
    else {
      tooltip.style.top = e.pageY + 'px';
    }

    if (document.body.addEventListener) {
      document.body.addEventListener('click', hideTooltips);
    }
    else {
      document.body.attachEvent('click', hideTooltips);
    }
  };

  /**
   * Removes tooltips.
   */
  var hideTooltips = function(e) {
    var source = e.srcElement;

    if (!source.className || (source.className.indexOf('tooltip') === -1)) {
      var tooltip = document.querySelector('#timesheet-tooltip');
      if (tooltip) {
        document.body.removeChild(tooltip);
        if (document.body.removeEventListener) {
          document.body.removeEventListener('click', hideTooltips);
        }
        else {
          document.body.detachEvent('click', hideTooltips);
        }
      }
    }
  };

  /**
   * Timesheet Bubble.
   * @constructor
   *
   * @param {Object} options Bubble options.
   */
  var Bubble = function(options) {
    this.start = options.start;
    this.end = options.end;

    this.timesheetYearMin = options.timesheetYearMin;
    this.timesheetYearMax = options.timesheetYearMax;

    this.startedBeforeTimesheet = false;
    this.endedAfterTimesheet = false;

    var offsets = this.getMonthOffsets();
    this.monthOffsetStart = offsets.monthStart;
    this.monthOffsetEnd = offsets.monthEnd;

    this.monthsLength = this.monthOffsetEnd - this.monthOffsetStart;

    this.link = options.link;
    this.type = options.type;
    this.label = options.label;
    this.present = options.present;
  };

  /**
   * Get month offsets for start and end of bubbles.
   *
   * @return {Object} offsets Month offsets.
   */
  Bubble.prototype.getMonthOffsets = function() {
    var offsets = {};

    offsets.monthStart = Math.abs(12 * (this.start.getFullYear() - this.timesheetYearMin) + this.start.getMonth());
    offsets.monthEnd = Math.abs(12 * (this.end.getFullYear() - this.timesheetYearMin) + this.end.getMonth());

    if (this.start.getFullYear() < this.timesheetYearMin) {
      // Remove the years of difference from start.
      this.startedBeforeTimesheet = true;
      offsets.monthStart -= ((this.timesheetYearMin - this.start.getFullYear()) * 12) - this.start.getMonth();
    }

    if (this.end.getFullYear() > this.timesheetYearMax) {
      // Round it to the end of the year by removing 1 year from offset.
      this.endedAfterTimesheet = true;
      offsets.monthEnd -= ((this.end.getFullYear() - this.timesheetYearMax - 1) * 12) + this.end.getMonth();
    }

    return offsets;
  };

  /**
   * Format month number
   *
   * @param {int} num
   *
   * @return {string} num.
   */
  Bubble.prototype.formatMonth = function(num) {
    num = parseInt(num, 10);

    return num >= 10 ? num : '0' + num;
  };

  /**
   * Get bubble's width in pixel
   *
   * @param {int} widthYear
   *
   * @return {number} Bubble width.
   */
  Bubble.prototype.getWidth = function(widthYear) {
    return (widthYear/12) * this.monthsLength;
  };

  /**
   * Returns bubble pixel dimensions and left offset.
   *
   * @param {Object} timesheet Timesheet object.
   *
   * @return {Object} position Width and offset of a bubble.
   */
  Bubble.prototype.getPosition = function(timesheet) {
    var position = {};

    position.offset = this.monthOffsetStart * timesheet.widthYear / 12 + 'px';
    position.width = this.getWidth(timesheet.widthYear) + 'px';

    return position;
  };

  /**
   * Get the bubble's label
   *
   * @return {string} Bubble label.
   */
  Bubble.prototype.getDateLabel = function() {
    return [
      (this.start.hasMonth ? this.formatMonth(this.start.getMonth() + 1) + '/' : '' ) + this.start.getFullYear(),
      (this.present ? ' - present' : ' - ' + ((this.end.hasMonth ? this.formatMonth(this.end.getMonth() + 1) + '/' : '' ) + this.end.getFullYear()))
    ].join('');
  };

  window.Timesheet = Timesheet;
})();
