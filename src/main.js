import Parser from './parser';

export default class Timesheet {
  constructor(html) {
    const p = new Parser();

    this.list = p.parse(html);
  }

  // End returns the last end date of all bubbles
  End() {
    let end = null;

    this.list.Walk((item) => {
      if (end === null || item.End() > end) {
        end = item.End();
      }
    });

    return end;
  }

  // Start returns the earliest start date of all bubbles
  Start() {
    let start = null;

    this.list.Walk((item) => {
      if (start === null || item.Start() < start) {
        start = item.Start();
      }
    });

    return start;
  }
}
