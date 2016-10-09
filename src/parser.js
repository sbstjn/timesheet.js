import Bubble from './bubble';
import List from './list';

// CLASS_MAIN identifies the main timesheet container
const CLASS_MAIN = 'timesheet';
// CLASS_ITEM stores the HTML class name which indicates an item for timesheet
const CLASS_ITEM = 'timesheet-item';
// CLASS_ITEM_DATE_START identifies the start date of an item
const CLASS_ITEM_DATE_START = 'timesheet-item--date-start';
// CLASS_ITEM_DATE_END identifies the end date of an item
const CLASS_ITEM_DATE_END = 'timesheet-item--date-end';
// CLASS_ITEM_LABEL identifies the label of an item
const CLASS_ITEM_LABEL = 'timesheet-item--label';

// Parser is used to parse the HTML DOM into timesheet data
export default class Parser {
  constructor() {
    this.list = new List((a, b) => (a.Start() < b.Start() ? -1 : 1));
  }

  Parse(html) {
    let dateStart, dateEnd, label, item;

    // Clear list
    this.list.Clear();

    // Return an empty List if the passed element does not have the needed
    // timesheet class.
    if (!html.classList.contains(CLASS_MAIN)) {
      return this.list;
    }

    // Get all items with timesheet-item class from the list
    const items = html.querySelectorAll(`.${CLASS_ITEM}`);
    for (let i = 0, m = items.length; i < m; i++) {
      item = items[i];

      // Get needed elements from timsheet item
      dateStart = item.querySelector(`.${CLASS_ITEM_DATE_START}`);
      dateEnd = item.querySelector(`.${CLASS_ITEM_DATE_END}`);
      label = item.querySelector(`.${CLASS_ITEM_LABEL}`);

      // Skip the item if not all needed elements are found
      if (dateStart === null || dateEnd === null || label === null) {
        continue;
      }

      // Add the parsed Bubble to the List
      this.list.Add(new Bubble(
        dateStart ? dateStart.innerHTML : null,
        dateEnd ? dateEnd.innerHTML : null,
        label ? label.innerHTML : null
      ));
    }

    return this.list;
  }
}
