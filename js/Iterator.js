class Iterator {
  constructor(items) {
    this.index = 0;
    this.items = items;
  }
  
  first () {
    this.reset();
    return this.next();
  }
  
  next() {
    return this.items[this.index++];
  }
  
  hasNext() {
    return this.index <= this.items.length;
  }
        
  reset() {
    this.index = 0;
  }
  
  each(callback) {
    for (var item = this.first(); this.hasNext(); item = this.next()) {
      callback(item);
    }
  }
  
}


     
    // log helper
     
    var log = (function() {
        var log = "";
        return {
            add: function(msg) { log += msg + "\n"; },
            show: function() { alert(log); log = ""; }
        }
    })();
     
    function runIter() {
        var items = ["one", 2, "circle", true, "Applepie"];
        var iter = new Iterator(items);
     
        // using for loop
     
        for (var item = iter.first(); iter.hasNext(); item = iter.next()) {
            log.add(item);
        }
        log.add("");
     
        // using Iterator's each method
     
        iter.each(function(item) {
            log.add(item);
        });
     
        log.show();
    }