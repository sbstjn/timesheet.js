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

    expect(p.parse(input)).toEqual([]);
  });

  it('should return an empty array for lists without timesheet class', () => {
    var input = toDOM(`
      <ul>
        <li>example</li>
      </ul>
    `);

    expect(p.parse(input)).toEqual([]);
  });

  it('should return an empty array for lists with timesheet class but without timesheet-item elements', () => {
    var input = toDOM(`
      <ul class="timesheet">
        <li>example</li>
      </ul>
    `);

    expect(p.parse(input)).toEqual([]);
  });

  it('should return an array for lists with timesheet class and timesheet-item elements', () => {
    var input = toDOM(`
      <ul class="timesheet">
        <li class="timesheet-item">
          <span class="timesheet-item--date-start">2015-01-01</span>
          <span class="timesheet-item--date-end">2015-01-12</span>
          <span class="timesheet-item--label">example</span>
        </li>
      </ul>
    `);

    expect(p.parse(input).length).toEqual(1);
  });

  it('should return an array of bubbles for lists with timesheet class and timesheet-item elements', () => {
    var input = toDOM(`
      <ul class="timesheet">
        <li class="timesheet-item">
          <span class="timesheet-item--date-start">2015-01-01</span>
          <span class="timesheet-item--date-end">2015-01-12</span>
          <span class="timesheet-item--label">example-0</span>
        </li>
        <li class="timesheet-item">
          <span class="timesheet-item--date-end">2015-02-12</span>
          <span class="timesheet-item--label">example-1</span>
        </li>
        <li class="timesheet-item">
          <span class="timesheet-item--date-start">2015-03-01</span>
          <span class="timesheet-item--label">example-2</span>
        </li>
        <li class="timesheet-item">
          <span class="timesheet-item--date-start">2015-04-01</span>
          <span class="timesheet-item--date-end">2015-04-12</span>
        </li>
      </ul>
    `);

    var output = p.parse(input);
    expect(output.length).toEqual(4);

    var item = output.shift();
    expect(item.Start()).toEqual('2015-01-01')
    expect(item.End()).toEqual('2015-01-12')
    expect(item.Label()).toEqual('example-0')

    var item = output.shift();
    expect(item.Start()).toEqual(null)
    expect(item.End()).toEqual('2015-02-12')
    expect(item.Label()).toEqual("example-1")

    var item = output.shift();
    expect(item.Start()).toEqual("2015-03-01")
    expect(item.End()).toEqual(null)
    expect(item.Label()).toEqual("example-2")

    var item = output.shift();
    expect(item.Start()).toEqual("2015-04-01")
    expect(item.End()).toEqual("2015-04-12")
    expect(item.Label()).toEqual(null)
  });
});
