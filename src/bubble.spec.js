import Bubble from '../src/bubble.js';

describe('Bubble', function () {
  const b = new Bubble(1, 2, "label");

  it('should have a start and end value', () => {
    expect(b.date.start).toEqual(1);
    expect(b.date.end).toEqual(2);
  });

  it("should have a label", () => {
    expect(b.label).toEqual("label")
  })
});
