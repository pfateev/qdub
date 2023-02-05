"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Queue_js_1 = __importDefault(require("./Queue.js"));
class Course {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.queue = new Queue_js_1.default();
    }
}
exports.default = Course;
//# sourceMappingURL=Course.js.map