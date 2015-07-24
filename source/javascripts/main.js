/* global Lib, Timesheet */

(function(){
  'use strict';

  Lib.ready(function() {
    /* jshint -W031 */
    var data = [
      {start: '2002',    end: '09/2002', label: 'First project', type: 'red'},
      {start: '06/2002', end: '09/2003', label: 'Second project', type: 'blue'},
      {start: '2003',    label: 'Still working on'},
      {start: '10/2003', end: '2006',    label: 'First project', type: 'yellow', link: 'http://www.example.com'},
      {start: '02/2005', end: '05/2006', label: 'Green project', type: 'green', link: '#'},
      {start: '07/2005', end: '09/2005', label: 'The shortest project', type: 'purple', link: '#'}
    ];

    new Timesheet(data, {
        container: 'timesheet-default',
        type: 'parallel',
        timesheetYearMin: 2002,
        timesheetYearMax: 2008
      });

    new Timesheet(data, {
        container: 'timesheet-projects',
        type: 'serial',
        timesheetYearMin: 2002,
        timesheetYearMax: 2008
      });

    new Timesheet(data, {
        container: 'timesheet-white',
        type: 'serial',
        timesheetYearMin: 2002,
        timesheetYearMax: 2008,
        theme: 'light'
      });
  });
})();
