import Bubble from '../src/bubble.js';

describe('Bubble', function () {
  const b = new Bubble("2015-01-01T00:00:00Z", "2015-01-01", "label");

  it('should have a start and end value', () => {
    expect(b.Start()).toEqual(1420070400000);
    expect(b.End()).toEqual(1420070400000);
  });

  it("should have a label", () => {
    expect(b.Label()).toEqual("label")
  })
});
