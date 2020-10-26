/**
 * Pattern Iterator
 * 
 */
class Iterator {
  /**
   * 
   * @param {Array} items
   * @returns {Iterator}
   */
  constructor(items) {
    this.index = 0;
    this.items = items;
  }
  
  /**
   * Get the first item from array
   * @returns {Array}
   */
  first () {
    this.reset();
    return this.next();
  }
  
  /**
   * Get the next item from array
   * @returns {Array}
   */
  next() {
    return this.items[this.index++];
  }
  
  /**
   * Validate value to index, Never should be maJor to length
   * @returns {Boolean}
   */
  hasNext() {
    return this.index <= this.items.length;
  }
  
  /**
   * Reset index
   */
  reset() {
    this.index = 0;
  }
  
  /**
   * Loop for all Array
   * @param {array} callback
   */
  each(callback) {
    for (var item = this.first(); this.hasNext(); item = this.next()) {
      callback(item);
    }
  }
  
}