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
      container: 'timesheet-default', // container ID
      type: 'parallel', // can also be 'serial'
      timesheetYearMin: 2002,
      timesheetYearMax: 2011
      // extraClass: add extra classes
      // theme: 'dark' or 'light'
      // showDate: true - show date in label
    });
