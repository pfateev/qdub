// used to store on the front end in order to help identify 
// the student for subsequent calls.
export interface StudentInfo {
	studentID: number;
}

// used for the StudentView
export interface QueueInfo {
	numberOfPeople: number;
	estimatedWait: number;
}
// used for the TAView
export interface TAQueueInfo extends QueueInfo {
	studentName: string | undefined;
}

export type StudentQuestion = {
	name: string,
	question: string
}