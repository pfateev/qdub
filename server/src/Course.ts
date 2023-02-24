import Student from "./Student.js";
// import Queue from "./Queue.js";
// import e from "express";
import  DoublyLinkedList  from "./DoublyLinkedList.js";

class Course {
      id : number;
      name: string; 
      queue: DoublyLinkedList;
      status: boolean;
      message: string | null;

      constructor(id: number, name: string) {
            this.id = id; 
            this.name = name; 
            this.queue = new DoublyLinkedList();
            this.status = false;
            this.message = null;
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
      activate(): void {
            this.status = true;
      }

      deactivate() : void {
            this.status = false;
						this.queue = new DoublyLinkedList();
      }
      //add a student
      enqueue(data: Student) : boolean {
            if(this.status) {
                  this.queue.enqueue(data);
                  return true;
            } else {
                  return false;
            }
      }

      // //remove student from front
      dequeue() : boolean {
            if(this.status)  {
                  this.queue.dequeue();
                  return true;
            } else {
                  return false;
            }
      }

      reset() {
            this.queue = new DoublyLinkedList();
      }

      notify(message: string) {
            this.message = message;
      }
      
      // //remove student from any position
      // exit() {
            
      // }

}

export default Course;