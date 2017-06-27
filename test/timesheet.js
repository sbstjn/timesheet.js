/**
 * Load Timesheet lib and fake a window object …
 */
window = {};
require(__dirname + '/../source/javascripts/timesheet-advanced.js');

var assert = require('assert');
suite('Timesheet', function() {
  test('Calculation', function(done) {
    done();
  });
});
