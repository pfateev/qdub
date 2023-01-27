import {Student} from "./Student.js";
import LinkedList from "dbly-linked-list";
// import { Node } from "dbly-linked-list";

class Queue{
  //private storage: Student[];
  private timelen: number;
  private q: LinkedList;

  constructor() {
    this.q = new LinkedList();
    this.timelen = 0;;
  }


  getTime(): number {
    return this.timelen;
  }

   //override
  // getData(n : Node) : Student {
  //   return n.getData() as Student ;
  // }
  
  swap(): void{
    // move an item to the front
    let curr = this.q.getHeadNode();
    if(curr == null) return;
    let i = 0;
    while(curr != null) {
      // thats the same as this line below 
      let s = Object.assign(new Student(0, 0, 0, false, false), curr.getData() );
      if(s.getStatus()) {
        if(i != 0) {
          this.q.removeAt(i);
          this.q.insertFirst(s);
        }
        return;
      }
      i++;
    }
  }

  updateQueue(deduct: number) {
    // this.queue..forEach(element => {
    //       element.setTime(element.getTime - deduct);
    // });
}

// update the time of each student
updateTime(time: number): void {
  this.timelen += time;
}

//update the position of each student
updatePos() {
    
}

// Update the student.status
stepOut() {

}

// Update the student.status
stepIn() {

}

//add a student
enqueue(data: Student) {
    this.q.insert(data);
}

//remove student from front
dequeue() {

}

//remove student from any position
exit() {
    
}


//   update(deduct: number): void {
//     for (var i = 0; i < this.size(); i++) {
//         this.storage[i].setTime();
//     }
//     // this.storage.forEach(function(item)  {
//     //   item.setTime(item.getTime() - deduct);

//     // });
//   }
}

export default Queue;
