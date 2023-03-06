import DoublyLinkedListNode from "./DoublyLinkedListNode.js"

import { Student } from "./Student";

class DoublyLinkedList
{
   private head: DoublyLinkedListNode | null;
   private tail: DoublyLinkedListNode | null;

   private size: number;
   private timelen: number;

   constructor() {
       this.head = null;
       this.tail = null;
       this.size = 0;
       this.timelen = 0;
   }

    public getSize(): number {
        return this.size;
    }

    public getWaitTime(): number {
        return this.timelen;
    }

    public isEmpty(): boolean {
        return this.size <= 0;
    }

    // Gets the data at that index
    // @returns the data at that index or null if there is no such index
    public get(index: number): Student | null {
        if(index > this.size || this.isEmpty() || this.tail == null || this.head == null) {
            return null;
            // throw new RangeError("Index out of range.");
        }

        if(index > this.size / 2) {
            let i = (this.size - 1) - index;
            let tmp = this.tail;
            while(i > 0) {
                if(tmp.prev == null) {
                    throw new RangeError("Index out of range.");
                }
                tmp = tmp.prev;
                i--;
            }
            return tmp.value;
        } else {
            let tmp = this.head;
            for(let i = 0; i < index; i++) {
                if(tmp.next == null) {
                    throw new RangeError("Index out of range.");
                }
                tmp = tmp.next;
            }
            return tmp.value;
        }
    }


    // Enqueues a student
    // @param value: Type student. Stores infromation about the question and positon of this query
    public enqueue(value: Student){
        value.setQTime(this.getWaitTime());
        let newNode = new DoublyLinkedListNode(value);
        if(this.isEmpty()) {
                this.head = newNode;
                this.tail = newNode;
        } else {
            newNode.next = null;
            newNode.prev = this.tail;
            if (this.tail != null) {
                this.tail.next = newNode;
            }
            this.tail = newNode;
        }
        this.size += 1;
        this.timelen += value.getTime();
	}

    // Removes a query from queue
    // @param value of type Student. Holds information about the query that must be removed.
    // @returns true if student was removed and false otherwise
    public remove(value: Student) :boolean {
        if(this.isEmpty()) {
            return false;
        }
        let tmp = this.head;
        while(tmp != null) {
            if(tmp.value === value) {
                if(tmp.prev != null) {
                    tmp.prev.next = tmp.next;
                } else {
                    this.head = tmp.next;
                }
                if(tmp.next != null) {
                    tmp.next.prev = tmp.prev;
                } else {
                    this.tail = tmp.prev;
                }
                this.size--;
                this.updateQueue();
                return true;
            }

            tmp = tmp.next;
        }
        return false;
    }
   
    // Dequeues a query from the front of the queue
    // @returns the Student being dequeue or null if there are no students to dequeue
    public dequeue(): Student | null {
        if (this.isEmpty() || this.head == null) {
            return null;
        } else if (this.size == 1) {
            const student = this.head.value;
            this.head = null;
            this.tail = null;
            this.size = 0;
            this.timelen = 0;
            return student;
        } else {
            let student = this.head.value;
            this.head = this.head.next;
            if (this.head) {
                this.head.prev = null;
								if (!this.head.value.getStatus()) {
									this.swap();
								}
            }
						//this.swap();
            this.size--;
            this.timelen = this.updateQueue();
            return student;

        }
	}

    // finds the position of the given student
    // @param value: Type Student. The query we are trying to find
    // returns: the index of the student. Returns -1 if no such student found.
    public indexOf(value: Student): number{
        if(this.isEmpty()){
            return  -1;
        }
        let index = 0;
        let tmp = this.head;
        while(tmp != null) {
            if(tmp.value === value)
            {
                return index;
            }
            tmp = tmp.next;
            index++;
        }
        return -1;
    }

    //Updates the time and position of each query of the queue
    // @returns the total queue time 
    public updateQueue(): number {
        let currTime = 0;
        let curr = this.head;
        let index = 0;
        while(curr != null) {
            curr.value.setQTime(currTime);
            curr.value.setPos(index);
            //move the markers forward
            currTime += curr.value.getTime();
            index++;
            curr = curr.next;
        }
        return currTime;
    } 

    // Update the student.status
    // @param pos : the position of the student we want to step out
    // @returns true if the status was set successfully at pos and false otherwise
    public stepOut(pos: number): boolean {
				if (pos === 0 && this.getSize() === 1) {
					return false;
				}
        if(pos < this.getSize() && pos >= 0) {
            let s = this.get(pos);
            if(s == null) return false;

            s.setStatus(false);
            return true;
        } else {
            return false;
        }
    }

    // Update the student.status
    // @param pos : the position of the student we want to step in
    // @returns true if the status was set successfully at pos and false otherwise
    public stepIn(pos: number): boolean {
        if(pos < this.getSize() && pos >= 0) {
            let s = this.get(pos);
            if(s == null) return false;
            s.setStatus(true);
            return true;
        } else {
            return false;
        }
    }

    // move an item to the front if it's status is valid.
    public swap(): void{
        let curr = this.head;
        while(curr != null) {
            if(curr.value.getStatus()) {
							let prev = curr.prev; 
							let temp = this.head;
							if (curr.next != null) { // checks if it is the tail
								let next = curr.next;
								if (prev)
									prev.next = next; 
								next.prev = prev;
							} else {
								this.tail = prev;
								if (prev)
									prev.next = null;
							}
							curr.prev = null;
							curr.next = temp;
							this.head = curr;
							break;
            }
            curr = curr.next;
        }
    }
	// old version
	//	public swap(): void{
	//		let curr = this.head;
	//		while(curr != null) {
	//				if(curr.value.status) {
	//						if(curr.prev != null) { //checks if it is the head
	//								curr.prev.next = curr.next;
	//						} else {
	//								return;
	//						}
	//						if(curr.next != null) { // checks if it is the tail
	//								curr.next.prev = curr.prev;
	//						} else {
	//								this.tail = curr.prev;
	//						}
	//						curr.prev = null;
	//						curr.next = this.head;
	//						this.head = curr;
	//						break;
	//				}
	//				curr = curr.next;
	//		}
	//}

    // Checks to see if the student associated with the NETID is in the queue
    // @param NetID: netid of the student we are looking for in the queue
    // @returns true if found and false otherwise
    public alreadyInQueue(NetID: string): boolean {
        let curNode = this.head;
        let res = false;
        while (curNode) {
            if (curNode.value.id === NetID) {
                res = true;
                break; 
            }
            curNode = curNode?.next;
        }
        return res;
    }
    
    // Remove a node at with given index
    public removeAtIndex(index: number): boolean {
        if (index < 0 || index >= this.size) {
            return false;
        }
        const student = this.get(index);
        if(student){
            this.remove(student);
        }
        return true;

    }

		public alreadyInQueue(NetID: string): boolean {
			let curNode = this.head;
			let res = false;
			while (curNode) {
				if (curNode.value.getId() === NetID) {
					res = true;
					break; 
				}
				curNode = curNode?.next;
			}
			return res;
		}
		
		// Remove a node at with given index
		public removeAtIndex(index: number): boolean {
			if (index < 0 || index >= this.size) {
				return false;
			}
			const student = this.get(index);
			if(student){
				this.remove(student);
			}
			return true;

		}

    //Checks if the queue contains that data
    public find(netID: String): Student | null {
        if(this.isEmpty())
        {
            return null;
        }
        let tmp = this.head;
        while(tmp != null)
        {
            if(tmp.value.getId() === netID)
            {
                return tmp.value;
            }
            tmp = tmp.next;
        }
        return null;
    }
		

//    //Adds to the front of the queue we don't need this
//    public addFirst(value: Student)
//    {
//        if(this.isEmpty())
//        {
//            let tmp = new DoublyLinkedListNode();
//            tmp.value = value;
//            this.head = tmp;
//            this.tail = tmp;
//            this.size++;
//        }
//        else
//        {
//            let tmp = new DoublyLinkedListNode();
//            tmp.next = this.head;
//            tmp.prev = null;
//            tmp.value = value;

//            this.head.prev = tmp;

//            this.head = tmp;
//            this.size++;
//        }
//    }
//Checks if the queue contains that data
// public contains(value: Student): boolean {
//     if(this.isEmpty())
//     {
//         return false;
//     }
//     let tmp = this.head;
//     while(tmp != null)
//     {
//         if(tmp.value === value)
//         {
//             return true;
//         }
//         tmp = tmp.next;
//     }
//     return false;
// }
// Gets the data at that index
// public get(index: number): Student {
//     if(index > this.size || this.isEmpty() || this.tail == null || this.head == null) {
//         throw new RangeError("Index out of range.");
//     }

//     if(index > this.size / 2) {
//         let i = (this.size - 1) - index;
//         let tmp = this.tail;
//         while(i > 0) {
//             if(tmp.prev == null) {
//                 throw new RangeError("Index out of range.");
//             }
//             tmp = tmp.prev;
//             i--;
//         }
//         return tmp.value;
//     } else {
//         let tmp = this.head;
//         for(let i = 0; i < index; i++) {
//             if(tmp.next == null) {
//                 throw new RangeError("Index out of range.");
//             }
//             tmp = tmp.next;
//         }
//         return tmp.value;
//     }
// }
}

export default DoublyLinkedList;