(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// A bubble represents the colorized area with a start date, end date and a
// label. Tags will be added as HTML classes for custom colors.
var Bubble = function () {
  function Bubble(start, end, label, tags) {
    _classCallCheck(this, Bubble);

    this.label = label;
    this.tags = tags || [];

    this.date = {
      start: Date.parse(start),
      end: Date.parse(end)
    };
  }

  // End returns the Bubble's end date object


  _createClass(Bubble, [{
    key: "End",
    value: function End() {
      return this.date.end;
    }

    // Label returns the Bubble's label text

  }, {
    key: "Label",
    value: function Label() {
      return this.label;
    }

    // Start returns the Bubble's start date object

  }, {
    key: "Start",
    value: function Start() {
      return this.date.start;
    }
  }]);

  return Bubble;
}();

exports.default = Bubble;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// List is a basic wrapper for Array access
var List = function () {

  // When initializing a new List item you can pass a custom function to sort
  // the items stored in the List
  function List(sort) {
    _classCallCheck(this, List);

    this.storage = [];
    this.position = 0;
    this.sorter = sort;
  }

  _createClass(List, [{
    key: "sort",
    value: function sort() {
      if (!this.sorter) {
        return;
      }

      this.storage.sort(this.sorter);
    }

    // Add can receive one or multiple parameters which are added to the List

  }, {
    key: "Add",
    value: function Add() {
      for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
        items[_key] = arguments[_key];
      }

      Array.prototype.push.apply(this.storage, items);

      this.sort();
    }

    // Clear removes all data from storage

  }, {
    key: "Clear",
    value: function Clear() {
      this.storage = [];
      this.position = 0;
    }

    // First returns the first item of the List

  }, {
    key: "First",
    value: function First() {
      return this.storage[0];
    }

    // Get returns all items in the List

  }, {
    key: "Get",
    value: function Get() {
      return this.storage;
    }

    // Last returns the last item of the List

  }, {
    key: "Last",
    value: function Last() {
      return this.storage[this.Size() - 1];
    }

    // Next increase the position pointer and return the current element

  }, {
    key: "Next",
    value: function Next() {
      if (this.position === this.Size()) {
        return null;
      }

      this.position = this.position + 1;

      return this.storage[this.position - 1];
    }

    // Size returns the length of the List

  }, {
    key: "Size",
    value: function Size() {
      return this.storage.length;
    }

    // Walk is an alias for forEach

  }, {
    key: "Walk",
    value: function Walk(func) {
      return this.storage.forEach(func);
    }
  }]);

  return List;
}();

exports.default = List;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timesheet = function () {
  function Timesheet(html) {
    _classCallCheck(this, Timesheet);

    var p = new _parser2.default();

    this.list = p.parse(html);
  }

  // End returns the last end date of all bubbles


  _createClass(Timesheet, [{
    key: 'End',
    value: function End() {
      var end = null;

      this.list.Walk(function (item) {
        if (end === null || item.End() > end) {
          end = item.End();
        }
      });

      return end;
    }

    // Start returns the earliest start date of all bubbles

  }, {
    key: 'Start',
    value: function Start() {
      var start = null;

      this.list.Walk(function (item) {
        if (start === null || item.Start() < start) {
          start = item.Start();
        }
      });

      return start;
    }
  }]);

  return Timesheet;
}();

exports.default = Timesheet;

},{"./parser":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bubble = require('./bubble');

var _bubble2 = _interopRequireDefault(_bubble);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// CLASS_MAIN identifies the main timesheet container
var CLASS_MAIN = 'timesheet';
// CLASS_ITEM stores the HTML class name which indicates an item for timesheet
var CLASS_ITEM = 'timesheet-item';
// CLASS_ITEM_DATE_START identifies the start date of an item
var CLASS_ITEM_DATE_START = 'timesheet-item--date-start';
// CLASS_ITEM_DATE_END identifies the end date of an item
var CLASS_ITEM_DATE_END = 'timesheet-item--date-end';
// CLASS_ITEM_LABEL identifies the label of an item
var CLASS_ITEM_LABEL = 'timesheet-item--label';

// Parser is used to parse the HTML DOM into timesheet data

var Parser = function () {
  function Parser() {
    _classCallCheck(this, Parser);

    this.list = new _list2.default(function (a, b) {
      return a.Start() < b.Start() ? -1 : 1;
    });
  }

  _createClass(Parser, [{
    key: 'parse',
    value: function parse(html) {
      var dateStart = void 0,
          dateEnd = void 0,
          label = void 0,
          item = void 0;

      // Clear list
      this.list.Clear();

      // Return an empty List if the passed element does not have the needed
      // timesheet class.
      if (!html.classList.contains(CLASS_MAIN)) {
        return this.list;
      }

      // Get all items with timesheet-item class from the list
      var items = html.querySelectorAll('.' + CLASS_ITEM);
      for (var i = 0, m = items.length; i < m; i++) {
        item = items[i];

        // Get needed elements from timsheet item
        dateStart = item.querySelector('.' + CLASS_ITEM_DATE_START);
        dateEnd = item.querySelector('.' + CLASS_ITEM_DATE_END);
        label = item.querySelector('.' + CLASS_ITEM_LABEL);

        // Skip the item if not all needed elements are found
        if (dateStart === null || dateEnd === null || label === null) {
          continue;
        }

        // Add the parsed Bubble to the List
        this.list.Add(new _bubble2.default(dateStart ? dateStart.innerHTML : null, dateEnd ? dateEnd.innerHTML : null, label ? label.innerHTML : null));
      }

      return this.list;
    }
  }]);

  return Parser;
}();

exports.default = Parser;

},{"./bubble":1,"./list":2}]},{},[3]);
