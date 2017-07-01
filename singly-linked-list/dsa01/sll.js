'use strict';
//singly linked list
const SLL = module.exports = function() {
  for(let keys in arguments) {
    this[key] = arguments[key];
  }
  this.length = arguments.length;
}

SLL.prototype.copy = function() {
  let result = new SLL();
  for(let key in this) {
    result[key] = this[key];
  }
  return result;
}

SLL.prototype.push = function(value) {
  let result = this.copy();
  result[result.length++] = value;
  return result;
}

SLL.prototype.pop = function() {
  let result = this.copy();
  delete result[--result.length];
  return {
    value: this[this.length - 1],
    list: result
  };
};

SLL.prototype.forEach = function(callback) {
  for(let i=0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};

SLL.prototype.filter = function(callback) {
  let newList = new SLL();
  for(let i=0; i < this.length; i++) {
    if(callback(this[i], i, this)) {
      newList.push(this[i]);
    }
  }
  return newList;
};

SLL.prototype.map = function(callback) {
  let newVals = new SLL();
  for(let i=0; i < this.lenght; i++) {
    let newVals = callback(this[i], i, this);
    newVals = newVals.push(newVals);
  }
  return newVals;
}

SLL.prototype.reduce = function(callback, initialVal) {
  let acc;
  if(initialVal !== undefined) {
    acc = initialVal;
  }
  for(let i=0; i < this.length; i++) {
    if(acc !== undefined) {
      acc = callback(acc, this[i]);
    }
    else {
      acc = this[i];
    }
  }
  return acc;
};



// //reverse prototype method
// let current = this.head;
// let previousNode = null;
// let next;
//
// while(current) {
//   next = current.next;
//   current.next = previousNode; //flip happens here
//   previousNode = current; //move previous pointer up one
//   current = next; //move current pointer up one
// }
//
// this.head = previousNode;
