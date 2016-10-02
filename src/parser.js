import Bubble from './bubble.js'

export default class Parser {
  constructor() {

  }

  parse(list) {
    if (!list.classList.contains('timesheet')) {
      return [];
    }

    var items = list.querySelectorAll('.timesheet-item');
    if (items.length === 0) {
      return [];
    }

    var data = []
    for (var i = 0, m = items.length; i < m; i++) {
      var item = items[i];

      var dateStart = item.querySelector('.timesheet-item--date-start')
        , dateEnd = item.querySelector('.timesheet-item--date-end')
        , label = item.querySelector('.timesheet-item--label');

      data.push(new Bubble(
        dateStart ? dateStart.innerHTML : null,
        dateEnd ? dateEnd.innerHTML : null,
        label ? label.innerHTML : null
      ))
    }

    return data;
  }
}
