export default class List {
  constructor(sort) {
    this.storage = [];
    this.position = 0;
    this.sorter = sort
  }

  sort() {
    if (!this.sorter) {
      return;
    }

    this.storage.sort(this.sorter)
  }

  Next() {
    this.position++;

    return this.storage[this.position-1];
  }

  Add() {
    for (var i = 0, m = arguments.length; i < m; i++) {
      this.storage.push(arguments[i])
    }

    this.sort();
  }

  Walk(func) {
    return this.storage.forEach(func);
  }

  First() {
    return this.storage[0]
  }

  Last() {
    return this.storage[this.Size()-1]
  }

  Get() {
    return this.storage;
  }

  Size() {
    return this.storage.length;
  }
}
