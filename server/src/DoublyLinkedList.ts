import DoublyLinkedListNode from "./DoublyLinkedListNode.js"

import { Student } from "./Student";

class DoublyLinkedList
{
   private head: DoublyLinkedListNode | null;
   private tail: DoublyLinkedListNode | null;

   private size: number;
   private timelen: number;

   constructor()
   {
       this.head = null;
       this.tail = null;
       this.size = 0;
       this.timelen = 0;
   }

    public getSize(): number
    {
        return this.size;
    }

    public getWaitTime(): number
    {
        return this.timelen;
    }

    public isEmpty(): boolean
    {
        return this.size <= 0;
    }

   //Enqueues the student
    public enqueue(value: Student){
        value.qtime = this.timelen;
        if(this.isEmpty()) {
            let tmp = new DoublyLinkedListNode(value);
            this.head = tmp;
            this.tail = tmp;
            return;
        } else {
            let tmp = new DoublyLinkedListNode(value);
            tmp.next = null;
            tmp.prev = this.tail;
            if(this.tail != null) {
                this.tail.next = tmp;
            }
            this.tail = tmp;
        }
        this.size++;
        this.timelen += value.getTime();
    }

   
   //Dequeues the query that was previously helped
    public dequeue() {
        if(this.isEmpty() || this.head == null) {
            return;
        } else if(this.size == 1) {
            this.head = null;
            this.tail = null;
            this.size--;
        } else {
            this.head = this.head.next;
            if(this.head != null) {
                this.head.prev = null;
                this.size--;
            }
        }
   }
// Removes a query from queue
//    public remove(value: Student) :void {
//        if(this.isEmpty())
//        {
//            return;
//        }
//        let tmp = this.head;
//        while(tmp != null)
//        {
//            if(tmp.value === value)
//            {
//                if(tmp.prev != null)
//                {
//                    tmp.prev.next = tmp.next;
//                }
//                else
//                {
//                    this.head = tmp.next;
//                }
//                if(tmp.next != null)
//                {
//                    tmp.next.prev = tmp.prev;
//                }
//                else
//                {
//                    this.tail = tmp.prev;
//                }
//                this.size--;
//                return;
//            }

//            tmp = tmp.next;
//        }
//    }
   //finds the position of the given student
//    public indexOf(value: Student)
//    {
//        if(this.isEmpty())
//        {
//            return  -1;
//        }
//        let index = 0;
//        let tmp = this.head;
//        while(tmp != null)
//        {
//            if(tmp.value === value)
//            {
//                return index;
//            }
//            tmp = tmp.next;
//            index++;

//        }
//        return -1;
//    }

    // public updateQueue(): number {
    //     let currTime = 0;
    //     let curr = this.head;
    //     let index = 0;
    //     while(curr != null) {
    //         curr.value.setQTime(currTime);
    //         curr.value.setPos(index);
    //         //move the markers forward
    //         currTime += curr.value.getTime();
    //         index++;
    //         curr = curr.next;
    //     }
    //     return currTime;
    // } 

   //    We don't need these 
//    public getFirst(): any
//    {
//        if(this.head != null)
//        {
//            return this.head.value;
//        }
//        return null;
//    }

//    public getLast(): Student | null
//    {
//        if(this.tail != null)
//        {
//            return this.tail.value;
//        }
//        return null;
//    }

//    //Don't need 
//    public removeLast()
//    {
//        if(this.isEmpty())
//        {
//            return;
//        }
//        if(this.size == 1)
//        {
//            this.head = null;
//            this.tail = null;
//            this.size--;
           
//        }
//        else
//        {
//            this.tail = this.tail.prev;
//            this.tail.next = null;
//            this.size--;
//        }
//    }

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

