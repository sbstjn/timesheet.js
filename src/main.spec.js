import Timesheet from '../src/main.js';

var toDOM = function(text) {
  var div = document.createElement('div');
  div.innerHTML = text;

  return div.childNodes[1];
}

describe('Timesheet', function () {
  var input = toDOM(`
    <ul class="timesheet">
      <li class="timesheet-item">
        <span class="timesheet-item--date-start">2015-01-01T00:00:00Z</span>
        <span class="timesheet-item--label">example-0</span>
        <span class="timesheet-item--date-end">2015-01-12T00:00:00Z</span>
      </li>
      <li class="timesheet-item">
        <span class="timesheet-item--date-start">2014-01-01T00:00:00Z</span>
        <span class="timesheet-item--label">example-1</span>
        <span class="timesheet-item--date-end">2015-01-12T00:00:00Z</span>
      </li>
      <li class="timesheet-item">
        <span class="timesheet-item--date-start">2014-02-01</span>
        <span class="timesheet-item--label">example-1</span>
        <span class="timesheet-item--date-end">2014-05-01</span>
      </li>
      <li class="timesheet-item">
        <span class="timesheet-item--date-start">2014-12-01</span>
        <span class="timesheet-item--label">example-1</span>
        <span class="timesheet-item--date-end">2015-05-12</span>
      </li>
    </ul>
  `);

  const t = new Timesheet(input);

  it("should calculate the first element from list of bubbles", () => {
    expect(t.Start()).toEqual(1388534400000)
  });

  it("should calculate the last element from list of bubbles", () => {
    expect(t.End()).toEqual(1431388800000)
  })
});
