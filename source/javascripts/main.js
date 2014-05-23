//= require_tree .

/* global Lib, Timesheet */

(function(){
  'use strict';

  Lib.ready(function() {
    /* jshint -W031 */
    new Timesheet('timesheet', [
      ['2002', 'Lorem ipsum dolor sit amet #1', 'lorem'],
      ['05/2002', 'Lorem ipsum dolor sit amet #1', 'lorem'],
      ['05/2002', '2003', 'Lorem ipsum dolor sit amet #1', 'lorem'],
      ['2002', '04/2002', 'Lorem ipsum dolor sit amet #1', 'lorem'],
      ['2002', '2003', 'Lorem ipsum dolor sit amet #1', 'lorem'],
      ['2002', '01/2003', 'Lorem ipsum dolor sit amet #1', 'lorem'],
      ['2002', '02/2003', 'Lorem ipsum dolor sit amet #1', 'lorem'],
      ['2002', '2004', 'Lorem ipsum dolor sit amet #1', 'lorem'],
      ['2002', '05/2007', 'Lorem ipsum dolor sit amet #1', 'lorem'],
      ['2002', '06/2006', 'Lorem ipsum dolor sit amet #2', 'lorem'],
      ['01/2005', '07/2006', 'Lorem ipsum dolor sit amet #3', 'ipsum'],
      ['06/2007', 'Lorem ipsum dolor sit amet #4'],
      ['11/2007', '03/2009', 'Lorem ipsum dolor sit amet #5', 'dolor'],
      ['07/2008', '07/2009', 'Lorem ipsum dolor sit amet #6', 'lorem'],
      ['02/2009', '012/2009', 'Lorem ipsum dolor sit amet #7', 'sit'],
      ['2010', '10/2011', 'Lorem ipsum dolor sit amet #8', 'ipsum']
    ]);

  });
})();
