/* global Lib, Timesheet */

(function(){
  'use strict';
  
  Lib.ready(function() {
    /* jshint -W031 */
    new Timesheet('timesheet-default', 'serial', 2002, 2013, [
        // example 1: ['2002', '09/2002', 'A freaking awesome time', 'red', 'www.example.com']
        // example 2: ['2002', '', 'A freaking awesome time', '', ''] - 5 parameters required, start and label are obligatory
      ['2002', '09/2002', 'A freaking awesome time', 'red', ''],
      ['06/2002', '09/2003', 'Some great memories', 'blue', ''],
      ['2003', '', 'Had very bad luck', '', ''],
      ['10/2003', '2006', 'At least had fun', 'yellow', ''],
      ['02/2005', '05/2006', 'Enjoyed those times as well', 'green', '#'],
      ['07/2005', '09/2005', 'Bad luck again', 'purple', '#'],
      ['10/2005', '2008', 'For a long time nothing happened', 'red', 'www.google.com'],
      ['01/2008', '05/2009', 'LOST Season #4', 'yellow', ''],
      ['01/2009', '05/2009', 'LOST Season #4', 'red', ''],
      ['02/2010', '05/2010', 'LOST Season #5', 'blue', ''],
      ['09/2008', '06/2010', 'FRINGE #1 & #2', 'blue', '']
    ]);

    new Timesheet('timesheet-projects', 'serial', 2010, 2015, [
      // example 1: ['2002', '09/2002', 'A freaking awesome time', 'red', 'www.example.com']
      // example 2: ['2002', '', 'A freaking awesome time', '', ''] - 5 parameters required, start and label are obligatory
      ['2010', '', 'Slickguns', 'red', 'www.slickguns.com'],
      ['2011', '', 'Wikiarms', 'blue', 'www.wikairms.com'],
      ['03/2012', '', 'Lorem ipsum', 'yellow', '']
    ]);

    document.querySelector('#switch-dark').addEventListener('click', function() {
      document.querySelector('body').className = 'index black';
    });

    document.querySelector('#switch-light').addEventListener('click', function() {
      document.querySelector('body').className = 'index white';
    });
  });
})();
