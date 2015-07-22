new Timesheet(
    [
      ['2002', '09/2002', 'First project', 'red', ''],
      ['06/2002', '09/2003', 'Second project', 'blue', ''],
      ['2003', '', 'Still working on', '', ''],
      ['10/2003', '2006', 'Yellow project', 'yellow', 'http://www.example.com'],
      ['02/2005', '05/2006', 'Green project', 'green', '#'],
      ['07/2005', '09/2005', 'The shortest project', 'purple', '#']
    ],
    {
      container: 'timesheet-default', // container ID
      type: 'parallel', // can also be 'serial'
      timesheetYearMin: 2002,
      timesheetYearMax: 2008
      // extraClass: add custom classes
      // theme: 'dark' or 'light'
      // showDate: true or false - show or hide date in label
      // scrollX: true or false - allow or prevent horizontal scroll of timesheet on mouse wheel
    });
