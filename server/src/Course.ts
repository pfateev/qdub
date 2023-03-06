import Student from "./Student.js";
// import Queue from "./Queue.js";
// import e from "express";
import  DoublyLinkedList  from "./DoublyLinkedList.js";

class Course {
      private id : number;
      private name: string; 
      private queue: DoublyLinkedList;
      private status: boolean;
      private message: string | null;

      constructor(id: number, name: string) {
            this.id = id; 
            this.name = name; 
            this.queue = new DoublyLinkedList();
            this.status = false;
            this.message = null;
      }
			getId(): number {
				return this.id;
			}
			
			getName(): string {
				return this.name;
			}

			getQueue(): DoublyLinkedList {
				return this.queue;
			}
      getStatus(): boolean {
            return this.status;
      }
     
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
      //Set the message for the course
      notify(message: string) {
            this.message = message;
      }
      //Gets the message fro the course
      getMessage() {
            return this.message;
      }
      
      

}

export default Course;