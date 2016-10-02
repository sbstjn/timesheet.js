import Bubble from './bubble.js'
import List from './list.js'

export default class Parser {
  constructor() {

  }

  parse(html) {
    var list = new List();

    if (!html.classList.contains('timesheet')) {
      return list;
    }

    var items = html.querySelectorAll('.timesheet-item');
    if (items.length === 0) {
      return list;
    }


    for (var i = 0, m = items.length; i < m; i++) {
      var item = items[i];

      var dateStart = item.querySelector('.timesheet-item--date-start')
        , dateEnd = item.querySelector('.timesheet-item--date-end')
        , label = item.querySelector('.timesheet-item--label');

      if (dateStart === null || dateEnd === null || label === null) {
        continue;
      }

      list.Add(new Bubble(
        dateStart ? dateStart.innerHTML : null,
        dateEnd ? dateEnd.innerHTML : null,
        label ? label.innerHTML : null
      ))
    }

    return list;
  }
}
