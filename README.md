# Timesheet.js

Simple JavaScript library to create HTML time sheets. Wrapped in an example project using Middleman…

![https://semu.github.io/timesheet.js](https://raw.githubusercontent.com/semu/timesheet.js/master/screen.png)

You only have to include `dist/timesheet.js` and `dist/timesheet.css` in your HTML and initialize Timesheet.js with:

```HTML
<div id="timesheet"></div>
```

```javascript
new Timesheet('timesheet', 2002, 2013, [
  ['2002', '09/2002', 'A freaking awesome time', 'lorem'],
  ['06/2002', '09/2003', 'Some great memories', 'ipsum'],
  ['2003', 'Had very bad luck'],
  ['10/2003', '2006', 'At least had fun', 'dolor'],
  ['02/2005', '05/2006', 'Enjoyed those times as well', 'ipsum'],
  ['07/2005', '09/2005', 'Bad luck again', 'default'],
  ['10/2005', '2008', 'For a long time nothing happened', 'dolor'],
  ['01/2008', '05/2009', 'LOST Season #4', 'lorem'],
  ['01/2009', '05/2009', 'LOST Season #4', 'lorem'],
  ['02/2010', '05/2010', 'LOST Season #5', 'lorem'],
  ['09/2008', '06/2010', 'FRINGE #1 & #2', 'ipsum']
]);
```

Timesheet.js is licensed under MIT License.
