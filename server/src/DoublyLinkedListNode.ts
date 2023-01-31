import {Student} from "./Student.js";
export class DoublyLinkedListNode
{
   public value: Student;
   public next: DoublyLinkedListNode | null;
   public prev: DoublyLinkedListNode | null;

   constructor(data: Student) {
    this.value = data;
    this.next = null;
    this.prev = null;
   }
   
}
