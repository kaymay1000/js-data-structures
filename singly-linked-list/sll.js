const Node = require('../node/node');

class SinglyLinkedList {
  constructor() {
    this.head = null;
  }

  addToHead(data) {
    const newHead = new Node(data);
    const currentHead = this.head;
    this.head = newHead;
    if (currentHead) {
      newHead.setNextNode(currentHead);
    }
  }

    addToTail(data) {
    // initialize tail to this.head so we can do a couple checks, which will help us figure out where to add this node
    let tail = this.head;

    // check if tail has no value (no head node exists)
    // if it doesn't, we'll create the head AND tail node with the data that was passed in
    if (!tail) {
      this.head = new Node(data);
    } else { // head node already exists
      // as long as tail has a next node that's not null (we haven't reached the end of the list), keep iterating
      while (tail.getNextNode() != null) {
        tail = tail.getNextNode()
      }
      // once the loop finishes, we've iterated over the entire list and "tail" is now equal to the current tail node
      // so we call tail.setNextNode() and pass in a new Node that takes "data" as its argument, effectively creating a new tail node
      tail.setNextNode(new Node(data));
    }
  }

  removeHead() {
    // set removedHead to the current head
    const removedHead = this.head;
    // check if a current head exists and return if it doesn't
    if (!removedHead) {
      return
    }

    // set the current head's next node to the list's head
    this.head = removedHead.getNextNode();
    // return the old head's data
    return removedHead.data
  }

  printList() {
    let currentNode = this.head;
    let output = '<head> ';
    
    while (currentNode != null) {
      output += currentNode.data + ' ';
      currentNode = currentNode.getNextNode();
    }

    output += '<tail>';
    console.log(output);
  }

  
}

const seasons = new SinglyLinkedList();

seasons.addToHead('summer');
seasons.addToHead('spring');
seasons.addToTail('fall');
seasons.addToTail('winter');
// should log <head> spring summer fall winter <tail>
seasons.printList();
seasons.removeHead();
// should log <head> summer fall winter <tail>
seasons.printList();

// should log the entire SLL
// LinkedList {
//  head: Node { data: 'summer', next: Node { data: 'fall', next: [Object] }}
// }
console.log(seasons);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// algorithm for swapping two nodes of an SLL

// Time and space complexity:
// The worst case for time complexity in swapNodes() is if both while loops must iterate all the way through to the end 
// (either if there are no matching nodes, or if the matching node is the tail). 
// This means that it has a linear big O runtime of O(n), since each while loop has a O(n) runtime, and constants are dropped.
// There are four new variables created in the function regardless of the input, which means that it has a constant space complexity of O(1).

const testList = new SinglyLinkedList();
for (let i = 0; i <= 10; i++) {
  testList.addToTail(i);
}

testList.printList();
swapNodes(testList, 2, 5);
testList.printList();

function swapNodes(list, data1, data2) {
  console.log(`Swapping ${data1} and ${data2}:`);
  
  let node1Prev = null;
  let node2Prev = null;
  let node1 = list.head;
  let node2 = list.head;

  if (data1 === data2) {
    console.log('Elements are the same - no swap to be made');
    return;
  }
  
  while (node1 !== null) {
    if (node1.data === data1) { 
      break;
    }
    node1Prev = node1;
    node1 = node1.getNextNode();
  }
  
  while (node2 !== null) {
    if (node2.data === data2) {
      break;
    }
    node2Prev = node2;
    node2 = node2.getNextNode();
  }
  
  if (node1 === null || node2 === null) {
    console.log('Swap not possible - one or more element is not in the list');
    return;
  }

  if (node1Prev === null) {
    list.head = node2;
  } else {
    node1Prev.setNextNode(node2);
  }

  if (node2Prev === null) { 
    list.head = node1;
  } else {
node2Prev.setNextNode(node1);
  }
  
  let temp = node1.getNextNode();
  node1.setNextNode(node2.getNextNode());
  node2.setNextNode(temp); 
}

module.exports = SinglyLinkedList;
