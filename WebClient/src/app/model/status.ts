export class IStatus {
    constructor(
        public state:string,
        public mode:string,
        public pressure:number,
        public station:number,   
        public start:Date,
        public duration:number,
        public scheduleId:number,
        public inputs:string,
        public outputs:string,
        public updatedAt:Date
    ){}
}