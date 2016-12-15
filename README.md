# Timesheet.js

Simple JavaScript library to create HTML time sheets. Wrapped in an example project using Middleman …

![https://sbstjn.github.io/timesheet.js](https://raw.githubusercontent.com/sbstjn/timesheet.js/master/screen.png)

You only have to include `dist/timesheet.js` and `dist/timesheet.css` in your HTML and initialize Timesheet.js with:

```HTML
<div id="timesheet"></div>
```

```javascript
new Timesheet('timesheet', 2015, 2025+1, 643, 2, '-', [
  ['2015-02-04', '2016-02-03', '1', 'default'],
  ['2016-02-04', '2025-12-31', '2', 'lorem'], ]
);
```

### Bower

`$ > bower install https://github.com/sbstjn/timesheet.js.git`

## Grunt commands

Use `grunt` to build all JavaScript and StyleSheet files located inside `dist/`.

Use `grunt server` to start a local web server on [localhost:8080](http://localhost:8080) to customize Timesheet.js, afterwards run `grunt` to compile all needed files.

Use `grunt gh` to generate the site and files available at [sbstjn.github.io/timesheet.js](http://sbstjn.github.io/timesheet.js) into the `gh-pages` folder.

## License

Timesheet.js is licensed under MIT License.
