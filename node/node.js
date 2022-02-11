class Node {
  constructor(data, next) {
    this.data = data;
    this.next = null;
    this.previous = null;
  }

  setNextNode(node) {
    if (node instanceof Node || node === null) {
      this.next = node;
    } else {
      throw new Error("Not a node!");
    }
  }

  setPreviousNode(node) {
    if (node instanceof Node || node === null) {
      this.previous = node;
    } else {
      throw new Error('Not a node!')
    }
  }

  getNextNode() {
    return this.next;
  }

  getPreviousNode() {
    return this.previous;
  }
}

// ex1: sundaes

const strawberryNode = new Node('Berry Tasty');
const vanillaNode = new Node('Vanilla');
const coconutNode = new Node('Coconuts for Coconut');

// expected order is vanilla --> strawberry --> coconut
vanillaNode.setNextNode(strawberryNode);
strawberryNode.setNextNode(coconutNode);

let currentNode = vanillaNode;

while (currentNode != null) {
  console.log(currentNode.data);
  currentNode = currentNode.next;
}


// ex2: animals
const firstNode = new Node('dog');
const secondNode = new Node('cat');

// will pass
firstNode.setNextNode(secondNode);

// will fail
firstNode.setNextNode('I am not a node.');

module.exports = Node;
