// interfaces & types
export interface SnakePosition {
    row: number;
    col: number;
    cell: number;
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';



// classes 
export class LinkedListNode {
    value: SnakePosition;
    next: LinkedListNode | null;
    constructor(value: SnakePosition) {
        this.value = value;
        this.next = null;
    }
}

export class LinkedList {
    head: LinkedListNode;
    tail: LinkedListNode;
    constructor(value: SnakePosition) {
        const node = new LinkedListNode(value);
        this.head = node;
        this.tail = node;
    }
    add(value: SnakePosition) {
        const newNode = new LinkedListNode(value);
        newNode.next = this.head;
        this.head = newNode;
    }
    remove() {
        if (!this.head) return;
        if (!this.head.next) {
            return;
        }
        let current = this.head;
        while (current.next !== this.tail && current.next) {
            current = current.next;
        }

        this.tail = current;
        this.tail.next = null;
    }
}