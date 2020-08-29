export class IIrrigationAction {
    constructor(
        public id: number,
        public Name: string,
        public Start: Date,
        public Finished: Date,
        public Paused: Date,
        public Duration: number,
        public Progress: number,
        public SolenoidId: number,
        public RequiresPump: boolean,
        public DeviceId: number,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}
