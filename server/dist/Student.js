"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
class Student {
    constructor(id, pos, time, status, qtime, question) {
        this.id = id;
        this.pos = pos;
        this.time = time;
        this.status = status;
        this.qtime = qtime;
        this.question = question;
    }
    getId() {
        return this.id;
    }
    getPos() {
        return this.pos;
    }
    getTime() {
        return this.time;
    }
    getQTime() {
        return this.qtime;
    }
    getStatus() {
        return this.status;
    }
    getQuestion() {
        return this.question;
    }
    setPos(pos) {
        this.pos = pos;
    }
    setTime(time) {
        this.time = time;
    }
    setStatus(b) {
        this.status = b;
    }
    setQTime(t) {
        this.qtime = t;
    }
}
exports.Student = Student;
exports.default = Student;
//# sourceMappingURL=Student.js.map