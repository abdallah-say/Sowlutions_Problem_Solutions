// Class to represent a node in the linked list
class ListNode {
  constructor(value) {
    this.value = value; // Node's value
    this.next = null; // Reference to the next node (initially null)
  }
}

// Class to represent the linked list
class LinkedIn {
  // Constructor to initialize an empty linked list
  LinkedList() {
    this.head = null; // First node in the list
    this.tail = null; // Last node in the list
  }

  // Method to add a new node to the end of the list
  addNode(value) {
    const newNode = new ListNode(value); // Create a new node

    // If the list is empty, set both head and tail to the new node
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // Otherwise, link the current tail to the new node and update the tail
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  // Method to remove nodes with values greater than x
  removeNodes(x) {
    // Create a dummy node to handle edge cases (e.g., removing the head)
    const dummy = new ListNode(0);
    dummy.next = this.head;

    let prev = dummy; // Previous node pointer
    let current = this.head; // Current node pointer

    // Traverse the list
    while (current) {
      // If the current node's value is greater than x, skip it
      if (current.value > x) {
        prev.next = current.next;
        current = current.next;
      } else {
        // Otherwise, move both pointers forward
        prev = current;
        current = current.next;
      }
    }

    // Update the head of the list
    this.head = dummy.next;

    // Update the tail: If the list is empty, set tail to null
    this.tail = this.head ? prev : null;
  }
}

// Helper function to remove nodes greater than x (not used in the main logic)
function removeGreaterNodes(head, x) {
  const dummy = new ListNode(0); // Create a dummy node
  dummy.next = head;

  let prev = dummy;
  let current = head;

  // Traverse the list
  while (current) {
    if (current.value > x) {
      prev.next = current.next; // Remove the node
      current = current.next; // Move to the next node
    } else {
      prev = current;
      current = current.next;
    }
  }

  return dummy.next; // Return the updated list
}

// Create a linked list and add some nodes
const ll = new LinkedIn();
ll.removeNodes(7);

[10, 5, 12, 7, 3, 9, 10].forEach((n) => ll.addNode(n));

// Remove nodes with values greater than 7
ll.removeNodes(7);

// Print the remaining nodes
let current = ll.head;
while (current) {
  console.log(current.value);
  current = current.next;
}
