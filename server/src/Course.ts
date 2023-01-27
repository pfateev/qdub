import Student from "./Student.js";
import Queue from "./Queue.js";
// import e from "express";

class Course {
      id : number;
      name: string; 
      queue: Queue;

      constructor(id: number, name: string) {
            this.id = id; 
            this.name = name; 
            this.queue = new Queue();
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
      
      // //add a student
      // enqueue(data: Student) {
      //       this.queue.insert(data);
      // }

      // //remove student from front
      // dequeue() {

      // }
      
      // //remove student from any position
      // exit() {
            
      // }

}

export default Course;