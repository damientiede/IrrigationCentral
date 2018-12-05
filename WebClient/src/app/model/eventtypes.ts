export class IEventType {
    constructor(
        public id:number,
        public name:string,
        public description:string,        
        public createdAt:Date,
        public updatedAt:Date
    ){}
}