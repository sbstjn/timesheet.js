import List from '../src/list.js';

describe('List', function () {
  it("should be initialized with length 0", () => {
    const l = new List();

    expect(l.Size()).toEqual(0);
  });

  it("should be able to add element and have size 1", () => {
    const l = new List();
    
    l.Add(1);

    expect(l.Size()).toEqual(1);
  });

  it("should be able to add elements and have size 3", () => {
    const l = new List();

    l.Add(1);
    l.Add(2);
    l.Add(3);

    expect(l.Size()).toEqual(3);
  });

  it("should be able to add multiple elements and have size 4", () => {
    const l = new List();

    l.Add(0);
    l.Add(1, 2, 3);

    expect(l.Size()).toEqual(4);
  });

  it("should be able to add multiple elements and use Next() for access", () => {
    const l = new List();

    l.Add(0);
    l.Add(1, 2, 3);

    var cur = l.Next();
    expect(cur).toEqual(0);
    var cur = l.Next();
    expect(cur).toEqual(1);
    var cur = l.Next();
    expect(cur).toEqual(2);
    var cur = l.Next();
    expect(cur).toEqual(3);
  });

  it("should be able to add multiple elements and use Next() for access with custom sorter", () => {
    const l = new List((a, b) => {
      return a < b ? 1 : -1;
    });

    l.Add(0);
    l.Add(1, 2, 3);

    var cur = l.Next();
    expect(cur).toEqual(3);
    var cur = l.Next();
    expect(cur).toEqual(2);
    var cur = l.Next();
    expect(cur).toEqual(1);
    var cur = l.Next();
    expect(cur).toEqual(0);
  });
});
