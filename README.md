# Timesheet-advanced.js

JavaScript library to create HTML time sheets.

![https://ntucakovic.github.io/timesheet-advanced.js]

You only have to include `dist/timesheet-advanced.js` and `dist/timesheet.min.css` in your HTML and initialize time sheet with:

```HTML
<div id="my-timesheet"></div>
```

```javascript
var bubbles = [
  {start: '2002',    end: '09/2002', label: 'First project', type: 'red', data: { technologies: 'php,drupal,mysql,symfony' }},
  {start: '06/2002', end: '09/2003', label: 'Second project', type: 'blue'},
  {start: '2003',    label: 'Still working on'},
  {start: '10/2003', end: '2006',    label: 'Yellow project', type: 'yellow', link: 'http://www.example.com'},
  {start: '02/2005', end: '05/2006', label: 'Green project', type: 'green', link: '#'},
  {start: '07/2005', end: '09/2005', label: 'The shortest project', type: 'purple', link: '#'}
];

new Timesheet(bubbles, {
    container: 'my-timesheet',
    type: 'parallel',
    timesheetYearMin: 2002,
    timesheetYearMax: 2008,
    theme: 'light'
});
```

### Explanation

'Bubbles' array contains information about all the bubbles that will appear in the time sheet. Each bubble can have:
- start: required; starting date in one of the following formats: mm/yyyy or yyyy
- end  : optional; end date (if no end date is given, bubble is stretched until the end of the timesheet)
- label: required; name of the bubble (what does it refer to)
- type : optional; color of the bubble (if nothing is given, default value is used)
- link : optional; URL (if bubble name should act as a link)
- data : optional; HTML data attributes of a bubble. Foreach key in data object a data attribute is created in HTML. Values must be STRINGS.

Timesheet object contains information about the time sheet itself. It consists of:
- bubbles array,
- timesheetYearMax,
- timesheetYearMin,
- container : ID of the HTML element,
- theme: light or dark,
- type: serial or parallel.

In parallel mode, every bubble is in its own row.
In serial mode, bubbles are 'packed' in one row without overlapping.

Parallel Dark
![https://ntucakovic.github.io/timesheet-advanced.js](https://raw.githubusercontent.com/ntucakovic/timesheet-advanced.js/master/images/parallel-dark.png)

Serial Dark
![https://ntucakovic.github.io/timesheet-advanced.js](https://raw.githubusercontent.com/ntucakovic/timesheet-advanced.js/master/images/serial-dark.png)

Serial Light
![https://ntucakovic.github.io/timesheet-advanced.js](https://raw.githubusercontent.com/ntucakovic/timesheet-advanced.js/master/images/serial-light.png)


### Bower

`$ > bower install https://github.com/ntucakovic/timesheet-advanced.js.git`

## Grunt commands

Use `grunt` to build all JavaScript and StyleSheet files located inside `dist/`. 

Use `grunt server` to start a local web server on [localhost:8080](http://localhost:8080) to customize Timesheet-advanced.js, afterwards run `grunt` to compile all needed files.

Use `grunt gh` to generate the site and files available at [ntucakovic.github.io/timesheet-advanced.js](http://ntucakovic.github.io/timesheet-advanced.js) into the `gh-pages` folder.

## License

Timesheet-advanced.js is licensed under MIT License.
