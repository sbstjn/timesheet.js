import Bubble from '../src/bubble.js';

describe('Bubble', function () {
  const b = new Bubble(1, 2, "label");

  it('should have a start and end value', () => {
    expect(b.Start()).toEqual(1);
    expect(b.End()).toEqual(2);
  });

  it("should have a label", () => {
    expect(b.Label()).toEqual("label")
  })
});
