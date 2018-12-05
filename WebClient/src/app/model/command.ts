export class ICommand {
    constructor(
        public Id:number,
        public CommandType:string,
        public Params:string,
        public Issued:Date,
        public Actioned:Date, 
        public DeviceId: number,
        public CreatedAt:Date,
        public UpdatedAt:Date
    ){}
}