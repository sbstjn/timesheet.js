import Parser from '../src/parser.js';

var toDOM = function(text) {
  var div = document.createElement('div');
  div.innerHTML = text;

  return div.childNodes[1];
}

describe('Parser', function () {
  const p = new Parser();

  it('should return an empty array for empty lists', () => {
    var input = toDOM(`
      <ul>
      </ul>
    `);

    expect(p.Parse(input).Size()).toEqual(0);
  });

  it('should return an empty array for lists without timesheet class', () => {
    var input = toDOM(`
      <ul>
        <li>example</li>
      </ul>
    `);

    expect(p.Parse(input).Size()).toEqual(0);
  });

  it('should return an empty array for lists with timesheet class but without timesheet-item elements', () => {
    var input = toDOM(`
      <ul class="timesheet">
        <li>example</li>
      </ul>
    `);

    expect(p.Parse(input).Size()).toEqual(0);
  });

  it('should return an array for lists with timesheet class and timesheet-item elements', () => {
    var input = toDOM(`
      <ul class="timesheet">
        <li class="timesheet-item">
          <span class="timesheet-item--date-start">January 1, 2015</span>
          <span class="timesheet-item--date-end">January 12, 2015</span>
          <span class="timesheet-item--label">example</span>
        </li>
      </ul>
    `);

    expect(p.Parse(input).Size()).toEqual(1);
  });

  it('should return an array of bubbles for lists with timesheet class and timesheet-item elements', () => {
    var input = toDOM(`
      <ul class="timesheet">
        <li class="timesheet-item">
          <span class="timesheet-item--date-start">2015-01-01T00:00:00Z</span>
          <span class="timesheet-item--label">example-0</span>
          <span class="timesheet-item--date-end">2015-01-12</span>
        </li>
        <li class="timesheet-item">
          <span class="timesheet-item--label">example-1</span>
          <span class="timesheet-item--date-end">February 4, 2015</span>
        </li>
        <li class="timesheet-item">
          <span class="timesheet-item--date-start">March 1, 2015</span>
          <span class="timesheet-item--label">example-2</span>
        </li>
        <li class="timesheet-item">
          <span class="timesheet-item--date-end">April 12, 2015</span>
          <span class="timesheet-item--date-start">April 1, 2015</span>
        </li>
      </ul>
    `);

    var output = p.Parse(input);
    expect(output.Size()).toEqual(1);

    var item = output.Next();
    expect(item.Start()).toEqual(1420070400000)
    expect(item.End()).toEqual(1421020800000)
    expect(item.Label()).toEqual('example-0')
  });
});
