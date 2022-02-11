const Node = require('../node/node');

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  addToHead(data) {
    // create new head node
    const newHead = new Node(data);
    // keep track of current head node
    const currentHead = this.head;

    // make sure there is a current head (list isn't empty)
    if (currentHead) {
      // update pointers if a head exists
      currentHead.setPreviousNode(newHead);
      newHead.setNextNode(currentHead);
    }

    // update list's head to newHead
    this.head = newHead;
    // if the list doesn't currently have a tail (list was empty), set the list's tail to newHead (newHead node is now the head AND tail, and the only node in the list)
    if (!this.tail) {
      this.tail = newHead
    }
  }

  // since DLL's have a tail property, we don't have to iterate through the entire list to add to the tail like we do with a SLL
  addToTail(data) {
    const newTail = new Node(data);
    const currentTail = this.tail;

    if (currentTail) {
      currentTail.setNextNode(newTail);
      newTail.setPreviousNode(currentTail);
    }

    this.tail = newTail;

    if (!this.head) {
      this.head = newTail;
    }
  }

  removeHead() {
    // set removedHead to the current head node
    const removedHead = this.head;
    // make sure removedHead exists (list isn't empty)... if it is empty, return
    if (!removedHead) {
      return
    }
    // set the list's head to the removedHead's next node
    this.head = removedHead.getNextNode();
    // make sure the new head exists (the removedHead wasn't the only node in the list)
    // if it does exist, set its previous pointer to null, since the head of a list shouldn't have a previous node
    if (this.head) {
      this.head.setPreviousNode(null);
    }
    // if removedHead equals the current tail (the list only had one node, which was both its head and tail), call this.removeTail()
    if (removedHead === this.tail) {
      this.removeTail();
    }
    // return removedHead's data
    return removedHead.data
  }

  removeTail() {
    const removedTail = this.tail;
    if (!removedTail) {
      return
    }

    this.tail = removedTail.getPreviousNode();
    if (this.tail) {
      this.tail.setNextNode(null);
    }
    if (removedTail === this.head) {
      this.removeHead();
    }

    return removedTail.data
  }

  removeByData(data) {
    let nodeToRemove;
    let currentNode = this.head;

    while (currentNode !== null) {
      // if the currentNode matches the one we want to remove
      if (currentNode.data === data) {
        // set nodeToRemove to currentNode
        nodeToRemove = currentNode;
        // break out of the while loop since we found the node we need and don't need to iterate over the rest of the list
        break;
      }
      currentNode = currentNode.getNextNode();
    }
    // check if nodeToRemove has value
    // if it doesn't, that means there was no matching node in the list, so return null
    if (!nodeToRemove) {
      return null
    }

    
    if (nodeToRemove === this.head) { // check if the nodeToRemove is the head, and call this.removeHead() if so
      this.removeHead();
    } else if (nodeToRemove === this.tail) { // check if the nodeToRemove is the tail, and call this.removeTail() if so
      this.removeTail();
    } else { // otherwise, nodeToRemove is somewhere in the middle, so get its next and previous nodes and update their pointers to each other
      const nextNode = nodeToRemove.getNextNode();
      const previousNode = nodeToRemove.getPreviousNode();

      nextNode.setPreviousNode(previousNode);
      previousNode.setNextNode(nextNode);
    }

    // return nodeToRemove
    return nodeToRemove
  }
  
  printList() {
    let currentNode = this.head;
    let output = '<head> ';
    while (currentNode !== null) {
      output += currentNode.data + ' ';
      currentNode = currentNode.getNextNode();
    }
    output += '<tail>';
    console.log(output);
  }
}

const subway = new DoublyLinkedList();

subway.addToHead('TimesSquare');
subway.addToHead('GrandCentral');
subway.addToHead('CentralPark');
subway.printList(); // should print CentralPark GrandCentral TimesSquare

subway.addToTail('PennStation');
subway.addToTail('WallStreet');
subway.addToTail('BrooklynBridge');
subway.printList(); // should print CentralPark GrandCentral TimesSquare PennStation WallStreet BrooklynBridge

subway.removeHead();
subway.removeTail();
subway.printList(); // should print GrandCentral TimesSquare PennStation WallStreet

subway.removeByData('TimesSquare');
subway.printList(); // should print GrandCentral PennStation WallStreet

console.log(subway);
// DoublyLinkedList {
//   head: 
//    Node {
//      data: 'GrandCentral',
//      next: Node { data: 'PennStation', next: [Object], previous: [Circular] },
//      previous: null },
//   tail: 
//    Node {
//      data: 'WallStreet',
//      next: null,
//      previous: Node { data: 'PennStation', next: [Circular], previous: [Object] }
//    } 
// }

module.exports = DoublyLinkedList;
