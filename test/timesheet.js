/**
 * Load Timesheet lib and fake a window object …
 */
window = {};
require(__dirname + '/../source/javascripts/timesheet.js');
require(__dirname + '/../source/javascripts/timesheet.bubble.js');

var assert = require('assert');
suite('Timesheet', function() {
  test('Calculation', function(done) {
    var TS = new window.Timesheet();

    assert.equal(12,  (new window.TimesheetBubble(60, 2012, TS.parseDate('2002'), TS.parseDate('2002'))).getMonths());
    assert.equal(12,  (new window.TimesheetBubble(60, 2012, TS.parseDate('2002'), TS.parseDate('2003'))).getMonths());
    assert.equal(24,  (new window.TimesheetBubble(60, 2012, TS.parseDate('2002'), TS.parseDate('2004'))).getMonths());

    assert.equal(9,   (new window.TimesheetBubble(60, 2012, TS.parseDate('04/2002'), TS.parseDate('2002'))).getMonths());
    assert.equal(9,   (new window.TimesheetBubble(60, 2012, TS.parseDate('04/2002'), TS.parseDate('2003'))).getMonths());
    assert.equal(21,  (new window.TimesheetBubble(60, 2012, TS.parseDate('04/2002'), TS.parseDate('2004'))).getMonths());

    assert.equal(13,  (new window.TimesheetBubble(60, 2012, TS.parseDate('04/2002'), TS.parseDate('04/2003'))).getMonths());

    assert.equal(25,  (new window.TimesheetBubble(60, 2012, TS.parseDate('04/2002'), TS.parseDate('04/2004'))).getMonths());

    assert.equal(1,   (new window.TimesheetBubble(60, 2012, TS.parseDate('04/2002'))).getMonths());
    assert.equal(12,  (new window.TimesheetBubble(60, 2012, TS.parseDate('2002'))).getMonths());

    done();
  });
});
