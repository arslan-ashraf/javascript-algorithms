import BinarySearchTree from '../binary-search-tree/BinarySearchTree';

export default class AvlTree extends BinarySearchTree {
  /**
   * @param {*} value
   */
  insert(value) {
    // Do the normal BST insert.
    super.insert(value);

    // Let's move up to the root and check balance factors along the way.
    let currentNode = this.root.find(value);
    while (currentNode) {
      this.balance(currentNode);
      currentNode = currentNode.parent;
    }
  }

  /**
   * @param {*} value
   * @return {boolean}
   */

  remove(value) {
    const tree = this.root;
    this.remove_node(tree, value);
  }
  
  remove_node(tree, value) {
    if (!tree) return null;
    if (tree.value == value){
      if (!tree.left && !tree.right){ return null; }
      if (!tree.left){ return tree.right; } 
      if (!tree.right){ return tree.left;} 
      let temp_node = this.find_minimum_value(tree.right);
      tree.value = temp_node;
      tree.right = this.remove_node(tree.right, temp_node);
    } else if (tree.value > value){
      tree.left = this.remove_node(tree.left, value);
    } else if (tree.value < value){
      tree.right = this.remove_node(tree.right, value);
    }
    if (tree.balanceFactor > 1) {
      // Left rotation.
      if (tree.left.balanceFactor > 0) {
        // Left-Left rotation
        this.rotateLeftLeft(tree);
      } else if (tree.left.balanceFactor < 0) {
        // Left-Right rotation.
        this.rotateLeftRight(tree);
      }
    } else if (tree.balanceFactor < -1) {
      // Right rotation.
      if (tree.right.balanceFactor < 0) {
        // Right-Right rotation
        this.rotateRightRight(tree);
      } else if (tree.right.balanceFactor > 0) {
        // Right-Left rotation.
        this.rotateRightLeft(tree);
      }
    }
    return tree;
  }
  

  // helper function for finding the minimum value
  find_minimum_value(tree){
    if (!tree.left) {
      return tree.value;
    }
    return this.find_minimum_value(tree.left);
  }

  /**
   * @param {BinarySearchTreeNode} node
   */
  balance(node) {
    // If balance factor is not OK then try to balance the node.
    if (node.balanceFactor > 1) {
      // Left rotation.
      if (node.left.balanceFactor > 0) {
        // Left-Left rotation
        this.rotateLeftLeft(node);
      } else if (node.left.balanceFactor < 0) {
        // Left-Right rotation.
        this.rotateLeftRight(node);
      }
    } else if (node.balanceFactor < -1) {
      // Right rotation.
      if (node.right.balanceFactor < 0) {
        // Right-Right rotation
        this.rotateRightRight(node);
      } else if (node.right.balanceFactor > 0) {
        // Right-Left rotation.
        this.rotateRightLeft(node);
      }
    }
  }

  /**
   * @param {BinarySearchTreeNode} rootNode
   */
  rotateLeftLeft(rootNode) {
    // Detach left node from root node.
    const leftNode = rootNode.left;
    rootNode.setLeft(null);

    // Make left node to be a child of rootNode's parent.
    if (rootNode.parent) {
      rootNode.parent.setLeft(leftNode);
    } else if (rootNode === this.root) {
      // If root node is root then make left node to be a new root.
      this.root = leftNode;
    }

    // If left node has a right child then detach it and
    // attach it as a left child for rootNode.
    if (leftNode.right) {
      rootNode.setLeft(leftNode.right);
    }

    // Attach rootNode to the right of leftNode.
    leftNode.setRight(rootNode);
  }

  /**
   * @param {BinarySearchTreeNode} rootNode
   */
  rotateLeftRight(rootNode) {
    // Detach left node from rootNode since it is going to be replaced.
    const leftNode = rootNode.left;
    rootNode.setLeft(null);

    // Detach right node from leftNode.
    const leftRightNode = leftNode.right;
    leftNode.setRight(null);

    // Preserve leftRightNode's left subtree.
    if (leftRightNode.left) {
      leftNode.setRight(leftRightNode.left);
      leftRightNode.setLeft(null);
    }

    // Attach leftRightNode to the rootNode.
    rootNode.setLeft(leftRightNode);

    // Attach leftNode as left node for leftRight node.
    leftRightNode.setLeft(leftNode);

    // Do left-left rotation.
    this.rotateLeftLeft(rootNode);
  }

  /**
   * @param {BinarySearchTreeNode} rootNode
   */
  rotateRightLeft(rootNode) {
    // Detach right node from rootNode since it is going to be replaced.
    const rightNode = rootNode.right;
    rootNode.setRight(null);

    // Detach left node from rightNode.
    const rightLeftNode = rightNode.left;
    rightNode.setLeft(null);

    if (rightLeftNode.right) {
      rightNode.setLeft(rightLeftNode.right);
      rightLeftNode.setRight(null);
    }

    // Attach rightLeftNode to the rootNode.
    rootNode.setRight(rightLeftNode);

    // Attach rightNode as right node for rightLeft node.
    rightLeftNode.setRight(rightNode);

    // Do right-right rotation.
    this.rotateRightRight(rootNode);
  }

  /**
   * @param {BinarySearchTreeNode} rootNode
   */
  rotateRightRight(rootNode) {
    // Detach right node from root node.
    const rightNode = rootNode.right;
    rootNode.setRight(null);

    // Make right node to be a child of rootNode's parent.
    if (rootNode.parent) {
      rootNode.parent.setRight(rightNode);
    } else if (rootNode === this.root) {
      // If root node is root then make right node to be a new root.
      this.root = rightNode;
    }

    // If right node has a left child then detach it and
    // attach it as a right child for rootNode.
    if (rightNode.left) {
      rootNode.setRight(rightNode.left);
    }

    // Attach rootNode to the left of rightNode.
    rightNode.setLeft(rootNode);
  }
}
