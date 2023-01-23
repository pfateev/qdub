import {Student} from "./Student.ts";
interface IQueue<Student> {
      enqueue(item: Student): void;
      dequeue(): Student | undefined;
      size(): number;
}

class Queue<Student> implements IQueue<Student> {
  private storage: Student[];
  private timelen: number;

  constructor() {
    this.timelen = 0;
    this.storage = [];
  }

  enqueue(item: Student): void {
    this.storage.push(item);
  }

  dequeue(): Student | undefined {
    return this.storage.shift();
  }

  time(): number {
    return this.timelen;
  }

  size(): number {
    return this.storage.length;
  }

  update(deduct: number): void {
    for (var i = 0; i < this.size(); i++) {
        this.storage[i].setTime();
    }
    // this.storage.forEach(function(item)  {
    //   item.setTime(item.getTime() - deduct);

    // });
  }
}

export default Queue;
