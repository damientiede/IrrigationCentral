export class IIrrigationProgram {
    constructor(
        public id: number,
        public Name: string,
        public Start: Date,
        public Finished: Date,
        public Duration: number,
        public SolenoidId: number,
        public RequiresPump: boolean,
        public DeviceId: number,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}
