"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Student_js_1 = require("./Student.js");
const dbly_linked_list_1 = __importDefault(require("dbly-linked-list"));
class Queue {
    constructor() {
        this.q = new dbly_linked_list_1.default();
        this.timelen = 0;
    }
    getTime() {
        return this.timelen;
    }
    getData(n) {
        return n.getData();
    }
    swap() {
        let curr = this.q.getHeadNode();
        if (curr == null)
            return;
        let i = 0;
        while (curr != null) {
            let s = Object.assign(new Student_js_1.Student(0, 0, 0, false, 0, ""), curr.getData());
            if (s.getStatus()) {
                if (i != 0) {
                    this.q.removeAt(i);
                    this.q.insertFirst(s);
                }
                return;
            }
            curr = curr.next;
            i++;
        }
    }
    updateQueue() {
        let currTime = 0;
        let curr = this.q.getHeadNode();
        let index = 0;
        while (curr != null) {
            let s = Object.assign(new Student_js_1.Student(0, 0, 0, false, 0, ""), curr.getData());
            s.setQTime(currTime);
            s.setPos(index);
            currTime += s.getTime();
            index++;
            curr = curr.next;
        }
        return currTime;
    }
    updateTime(time) {
        this.timelen += time;
    }
    stepOut(pos) {
        if (pos < this.q.getSize()) {
            let node = this.q.findAt(pos);
            let s = Object.assign(new Student_js_1.Student(0, 0, 0, false, 0, ""), node.getData());
            s.setStatus(false);
            this.q.removeAt(pos);
            this.q.insertAt(pos, s);
            return true;
        }
        else {
            return false;
        }
    }
    stepIn(pos) {
        if (pos < this.q.getSize()) {
            let node = this.q.findAt(pos);
            let s = Object.assign(new Student_js_1.Student(0, 0, 0, false, 0, ""), node.getData());
            s.setStatus(true);
            this.q.removeAt(pos);
            this.q.insertAt(pos, s);
            return true;
        }
        else {
            return false;
        }
    }
    enqueue(id, time, question) {
        let pos = this.q.getSize();
        let s = new Student_js_1.Student(id, pos, time, true, this.timelen, question);
        this.q.insert(s);
        this.timelen += time;
    }
    dequeue() {
        this.q.removeFirst();
        this.swap();
        this.timelen = this.updateQueue();
    }
    exit(pos) {
        this.q.removeAt(pos);
    }
}
exports.default = Queue;
//# sourceMappingURL=Queue.js.map