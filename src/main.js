import Parser from "./parser.js"

export default class Timesheet {
  constructor(html) {
    var p = new Parser()

    this.list = p.parse(html)
  }

  Start() {
    var start = null;

    this.list.Walk((item) => {
      if (start === null || item.Start() < start) {
        start = item.Start();
      }
    });

    return start;
  }

  End() {
    var end = null;

    this.list.Walk((item) => {
      if (end === null || item.End() > end) {
        end = item.End();
      }
    });

    return end;
  }
}
