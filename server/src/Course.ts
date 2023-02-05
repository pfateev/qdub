import Student from "./Student.js";
// import Queue from "./Queue.js";
// import e from "express";
import  DoublyLinkedList  from "./DoublyLinkedList.js";

class Course {
      id : number;
      name: string; 
      queue: DoublyLinkedList;

      constructor(id: number, name: string) {
            this.id = id; 
            this.name = name; 
            this.queue = new DoublyLinkedList();
      }

      // updateQueue(deduct: number) {
      //       // this.queue..forEach(element => {
      //       //       element.setTime(element.getTime - deduct);
      //       // });
      // }
      
      // //update each student time
      // updateTime() {

      // }

      // //update the position of each student
      // updatePos() {
            
      // }

      // // Update the student.status
      // stepOut() {

      // }
      
      // // Update the student.status
      // stepIn() {

      // }
      
      //add a student
      enqueue(data: Student) {
            this.queue.enqueue(data);
      }

      // //remove student from front
      dequeue() {
            this.queue.dequeue();
      }
      
      // //remove student from any position
      // exit() {
            
      // }

}

export default Course;