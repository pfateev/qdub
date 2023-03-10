export class Student {
      private id: string;
      private pos: number;
      private time: number;
      private qtime: number;
      private status: boolean;
      private question: string;
      private name: string;

      constructor(id: string, pos: number,
            time: number, status: boolean,
            qtime: number, question: string,
            name: string) {

            this.id = id; // ID of the query associated with student's uwNetID
            this.pos = pos; // Position of query in queue
            this.time = time; // Time estimation of how long to resolve query
            this.status = status; // Status of student 
            this.qtime = qtime; //Estimated time length until student can get helped
            this.question = question; // Question of the query
            this.name = name;
      }

      // getter methods:
      public getId(): string {
            return this.id;
      }

      public getPos(): number {
            return this.pos;
      }
      public getTime(): number {
            return this.time;
      }

      public getQTime(): number {
            return this.qtime;
      }

      public getStatus(): boolean {
            return this.status;
      }

      public getQuestion(): string {
            return this.question;
      }

      public getName(): string {
            return this.name;
      }

      // setter methods:
      public setPos(pos: number): void {
            this.pos = pos;
      }
      public setTime(time: number): void {
            this.time = time;
      }

      public setStatus(b: boolean): void {
            this.status = b;
      }

      public setQTime(t: number): void {
            this.qtime = t;
      }


}


export default Student;