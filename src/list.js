// List is a basic wrapper for Array access
export default class List {

  // When initializing a new List item you can pass a custom function to sort
  // the items stored in the List
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

  // Next increase the position pointer and return the current element
  Next() {
    this.position++;

    if (this.position > this.storage.length) {
      return null;
    }

    return this.storage[this.position-1];
  }

  // Add can receive one or multiple parameters which are added to the List
  Add() {
    for (var i = 0, m = arguments.length; i < m; i++) {
      this.storage.push(arguments[i])
    }

    this.sort();
  }

  // Walk is an alias for forEach
  Walk(func) {
    return this.storage.forEach(func);
  }

  // First returns the first item of the List
  First() {
    return this.storage[0]
  }

  // Last returns the last item of the List
  Last() {
    return this.storage[this.Size()-1]
  }

  // Get returns all items in the List
  Get() {
    return this.storage;
  }

  // Size returns the length of the List
  Size() {
    return this.storage.length;
  }
}
