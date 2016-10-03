import Parser from "./parser.js"

export default class Timesheet {
  constructor(html) {
    var p = new Parser()

    this.list = p.parse(html)
  }

  // End returns the last end date of all bubbles
  End() {
    var end = null;

    this.list.Walk((item) => {
      if (end === null || item.End() > end) {
        end = item.End();
      }
    });

    return end;
  }

  // Start returns the earliest start date of all bubbles
  Start() {
    var start = null;

    this.list.Walk((item) => {
      if (start === null || item.Start() < start) {
        start = item.Start();
      }
    });

    return start;
  }
}
