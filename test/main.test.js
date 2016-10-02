import Timesheet from '../src/main.js';

describe('Timesheet', function () {
  let foo;

  beforeEach(() => {
    foo = new Timesheet('custom');
  });

  it('name should be set to "custom"', () => {
    expect(foo.name).toEqual('custom');
  });
});
