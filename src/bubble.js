export default class Bubble {
  constructor(start, end, label) {
    this.label = label;

    this.date = {
      start: Date.parse(start),
      end: Date.parse(end)
    };
  }

  Label() {
    return this.label;
  }

  Start() {
    return this.date.start;
  }

  End() {
    return this.date.end;
  }
}
