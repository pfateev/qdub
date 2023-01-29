import { assert } from "console";
import {Student} from "./Student.js";
import LinkedList from "dbly-linked-list";
import { Node } from "dbly-linked-list";

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
   getData(n : Node) : Student {
     return n.getData() as Student ;
   }
  
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

	//Tri's version of swap.
	//swap(): void {
	//	if (this.q.getSize() < 2) {
	//		return; 
	//	}

	//	let head = this.q.getHeadNode(); 
	//	let nextNode = head.next;
	//	let nextData = Object.assign(new Student(0, 0, 0, false, false), nextNode.getData() );

	//	while(!nextData.status && nextNode.next) {
	//		nextNode = nextNode.next;
	//	}
	//	nextData = Object.assign(new Student(0, 0, 0, false, false), nextNode.getData());

	//	// start swapping active node to the top of the queue
	//	if (nextData.status) {
	//		this.q.removeAt(nextData.pos);
	//		this.q.insertFirst(nextNode);
	//	}
	//}

  //update pos and time for each student
  updateQueue() {
    let currTime = 0;
    let curr = this.q.getHeadNode();
    let index = 0;
    while(curr != null) {
      let s = Object.assign(new Student(0, 0, 0, false, false), curr.getData());
      let sTime = s.getTime();
      currTime += sTime;
      s.setPos(index);
      s.setQTime(currTime);
      index++;
			curr = curr.next;
    }
  } 

  // update the time of queue
  updateTime(time: number): void {
    this.timelen += time;
  }

  // Update the student.status
  stepOut(pos: number): boolean {
    if(pos < this.q.getSize()) {
      let node = this.q.findAt(pos);
      let s = Object.assign(new Student(0, 0, 0, false, false), node.getData());
      s.setStatus(false);
      this.q.removeAt(pos);
      this.q.insertAt(pos, s);
      return true;
    } else {
      return false;
    }
  }

  // Update the student.status
  stepIn(pos: number): boolean {
    if(pos < this.q.getSize()) {
      let node = this.q.findAt(pos);
      let s = Object.assign(new Student(0, 0, 0, false, false), node.getData());
      s.setStatus(true);
      this.q.removeAt(pos);
      this.q.insertAt(pos, s);
      return true;
    } else {
      return false;
    }

  }

  //add a student
  enqueue(id: number, time: number, isTA: boolean) {
    let pos = this.q.getSize();
    let s = new Student(id, pos, time, true, isTA );
    this.timelen += time;
    s.setQTime(this.getTime());
    this.q.insert(s);
  }

  //remove student from front and update the queue 
  dequeue() {
    this.q.removeFirst(); 
    this.swap();
    this.updateQueue();
  }

  //remove student from any position
  exit(pos: number) {
      this.q.removeAt(pos);
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
