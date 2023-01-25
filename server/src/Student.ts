export class Student {
      id: number; 
      // firstName: string; 
      // lastName: string;
      isTA: boolean;
      pos: number;
      time: number;

      constructor(id: number, isTA: false) {
            this.id = id; 
            // this.firstName = firstName;
            // this.lastName = lastName;
            this.isTA = isTA;
      }
      // getter methods:
      getId(): number {
            return this.id;
      }
      getIsTA(): boolean {
            return this.isTA;
      }
      getPos(): number {
            return this.pos;
      }
      getTime(): number {
            return this.time;
      }

      // setter methods:
      setTA(): void {
            this.isTA = true;
      }
      public setPos(pos: number): void {
            this.pos = pos;
      }
      public setTime(time: number): void {
            this.time = time;
      } 


      
      // will need relationalMappings to map to the data later
}


// export default Student;