export class IEvent {
    constructor(
        public id:number,
        public eventtype:string,
        public eventvalue:number,        
        public createdAt:Date,
        public updatedAt:Date
    ){}
}