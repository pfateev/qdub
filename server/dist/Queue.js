class Queue {
    constructor() {
        timelen = 0;
        storage = [];
    }
    enqueue(item) {
        this.storage.push(item);
    }
    dequeue() {
        return this.storage.shift();
    }
    size() {
        return this.storage.length;
    }
}
export default Queue;
//# sourceMappingURL=Queue.js.map