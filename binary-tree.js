/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;
    let min = Infinity;
    let toVisitStack = [[this.root, 1]];
    while (toVisitStack.length) {
      let [current, depth] = toVisitStack.pop();
      if (!current.left && !current.right) {
        min = Math.min(min, depth);
      }
      if (current.left) toVisitStack.push([current.left, depth + 1]);
      if (current.right) toVisitStack.push([current.right, depth + 1]);
    }
    return min;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;
    let max = 0;
    let toVisitStack = [[this.root, 1]];
    while (toVisitStack.length) {
      let [current, depth] = toVisitStack.pop();
      if (!current.left && !current.right) {
        max = Math.max(max, depth);
      }
      if (current.left) toVisitStack.push([current.left, depth + 1]);
      if (current.right) toVisitStack.push([current.right, depth + 1]);
    }
    return max;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if (!this.root) return 0;
    let maxSum = -Infinity;
    const stack = [];
    const nodeToMaxPath = new Map();

    stack.push([this.root, false]);

    while (stack.length > 0) {
      const [node, visited] = stack.pop();

      if (node === null) continue;

      if (visited) {
        const leftMax = Math.max(nodeToMaxPath.get(node.left) || 0, 0);
        const rightMax = Math.max(nodeToMaxPath.get(node.right) || 0, 0);
        const currentPathSum = node.val + leftMax + rightMax;

        maxSum = Math.max(maxSum, currentPathSum);
        nodeToMaxPath.set(node, node.val + Math.max(leftMax, rightMax));
      } else {
        stack.push([node, true]);
        stack.push([node.right, false]);
        stack.push([node.left, false]);
      }
    }

    return maxSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;
    const queue = [this.root];
    const largerValues = [];
    while (queue.length) {
      const current = queue.shift();
      if (current.val > lowerBound) largerValues.push(current.val);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    console.log("larger Values", largerValues);
    return largerValues.length ? Math.min(...largerValues) : null;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (node1 === this.root || node2 === this.root) return false;

    function findLevelAndParent(
      nodeToFind,
      currentNode,
      level = 0,
      data = { level: 0, parent: null }
    ) {
      if (data.parent) return data;
      if (currentNode.left === nodeToFind || currentNode.right === nodeToFind) {
        data.level = level + 1;
        data.parent = currentNode;
      }
      if (currentNode.left) {
        findLevelAndParent(nodeToFind, currentNode.left, level + 1, data);
      }
      if (currentNode.right) {
        findLevelAndParent(nodeToFind, currentNode.right, level + 1, data);
      }
      return data;
    }

    let node1Info = findLevelAndParent(node1, this.root);
    let node2Info = findLevelAndParent(node2, this.root);

    let sameLevel =
      node1Info && node2Info && node1Info.level === node2Info.level;
    let differentParents =
      node1Info && node2Info && node1Info.parent !== node2Info.parent;
    return sameLevel && differentParents;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {}

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {}

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {}
}

module.exports = { BinaryTree, BinaryTreeNode };
