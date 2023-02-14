import {Student} from "./Student.js";
class DoublyLinkedListNode
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

export default DoublyLinkedListNode;