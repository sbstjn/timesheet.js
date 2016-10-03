// List is a basic wrapper for Array access
export default class List {

  // When initializing a new List item you can pass a custom function to sort
  // the items stored in the List
  constructor(sort) {
    this.storage = [];
    this.position = 0;
    this.sorter = sort;
  }

  sort() {
    if (!this.sorter) {
      return;
    }

    this.storage.sort(this.sorter);
  }

  // Add can receive one or multiple parameters which are added to the List
  Add(...items) {
    for (let i = 0, m = items.length; i < m; i++) {
      this.storage.push(items[i]);
    }

    this.sort();
  }

  // Clear removes all data from storage
  Clear() {
    this.storage = [];
    this.position = 0;
  }

  // First returns the first item of the List
  First() {
    return this.storage[0];
  }

  // Get returns all items in the List
  Get() {
    return this.storage;
  }

  // Last returns the last item of the List
  Last() {
    return this.storage[this.Size() - 1];
  }

  // Next increase the position pointer and return the current element
  Next() {
    if (this.position === this.Size()) {
      return null;
    }

    this.position = this.position + 1;

    return this.storage[this.position - 1];
  }

  // Size returns the length of the List
  Size() {
    return this.storage.length;
  }

  // Walk is an alias for forEach
  Walk(func) {
    return this.storage.forEach(func);
  }
}
