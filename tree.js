/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if (!this.root) return 0;
    let sum = 0;
    let toVisitStack = [this.root];
    while (toVisitStack.length) {
      let current = toVisitStack.pop();
      sum += current.val;
      toVisitStack.push(...current.children);
    }
    return sum;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if (!this.root) return 0;
    let count = 0;
    let toVisitStack = [this.root];
    while (toVisitStack.length) {
      let current = toVisitStack.pop();
      if (current.val % 2 === 0) count++;
      toVisitStack.push(...current.children);
    }
    return count;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if (!this.root) return 0;
    let count = 0;
    let toVisitStack = [this.root];
    while (toVisitStack.length) {
      let current = toVisitStack.pop();
      if (current.val > lowerBound) count++;
      toVisitStack.push(...current.children);
    }
    return count;
  }
}

//let t = new Tree(new TreeNode(1, [new TreeNode(2), new TreeNode(3)]));
//console.log(t.sumValues()); // 6
module.exports = { Tree, TreeNode };
