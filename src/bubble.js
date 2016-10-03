// A bubble represents the colorized area with a start date, end date and a
// label. Tags will be added as HTML classes for custom colors.
export default class Bubble {
  constructor(start, end, label, tags) {
    this.label = label;
    this.tags = tags || [];

    this.date = {
      start: Date.parse(start),
      end: Date.parse(end)
    };
  }

  // End returns the Bubble's end date object
  End() {
    return this.date.end;
  }

  // Label returns the Bubble's label text
  Label() {
    return this.label;
  }

  // Start returns the Bubble's start date object
  Start() {
    return this.date.start;
  }
}
