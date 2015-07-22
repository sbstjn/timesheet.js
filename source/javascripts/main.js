/* global Lib, Timesheet */

(function(){
  'use strict';

  Lib.ready(function() {
    /* jshint -W031 */
    new Timesheet(
      [
        ['2002', '09/2002', 'First project', 'red', ''],
        ['06/2002', '09/2003', 'Second project', 'blue', ''],
        ['2003', '', 'Still working on', '', ''],
        ['10/2003', '2006', 'Example project', 'yellow', 'http://www.example.com'],
        ['02/2005', '05/2006', 'Green project', 'green', '#'],
        ['07/2005', '09/2005', 'Most recent project', 'purple', '#']
      ],
      {
        container: 'timesheet-default',
        type: 'parallel',
        timesheetYearMin: 2002,
        timesheetYearMax: 2008
      });

    new Timesheet(
      [
        ['2002', '09/2002', 'First project', 'red', ''],
        ['06/2002', '09/2003', 'Second project', 'blue', ''],
        ['2003', '', 'Still working on', '', ''],
        ['10/2003', '2006', 'Example project', 'yellow', 'http://www.example.com'],
        ['02/2005', '05/2006', 'Green project', 'green', '#'],
        ['07/2005', '09/2005', 'Most recent project', 'purple', '#']
      ],
      {
        container: 'timesheet-projects',
        type: 'serial',
        timesheetYearMin: 2002,
        timesheetYearMax: 2008
      });

    new Timesheet(
      [
        ['2002', '09/2002', 'First project', 'red', ''],
        ['06/2002', '09/2003', 'Second project', 'blue', ''],
        ['2003', '', 'Still working on', '', ''],
        ['10/2003', '2006', 'Example project', 'yellow', 'http://www.example.com'],
        ['02/2005', '05/2006', 'Green project', 'green', '#'],
        ['07/2005', '09/2005', 'Most recent project', 'purple', '#']
      ],
      {
        container: 'timesheet-white',
        type: 'serial',
        timesheetYearMin: 2002,
        timesheetYearMax: 2008,
        theme: 'light'
      });
  });
})();
