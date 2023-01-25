import Student from "./Student.js";
import Queue from "./Queue.js";
import e from "express";

class Course {
      id : number;
      name: string; 
      queue: Queue<Student>;

      constructor(id: number, name: string) {
            this.id = id; 
            this.name = name; 
            this.queue = new Queue();
      }

      updateQueue(deduct: number) {
            this.queue.getStorage().forEach(element => {
                  element.setTime(element.getTime - deduct);
            });
      }
}