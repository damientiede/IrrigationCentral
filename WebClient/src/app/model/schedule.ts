export class ISchedule {
    constructor(
        public id: number,
        public Name: string,
        public StartDate: Date,
        public StartHours: number,
        public StartMins: number,
        public Duration: number,
        public Days: string,
        public Repeat: boolean,
        public Enabled: boolean,
        public SolenoidId: number,
        public DeviceId: number
    ) {}
}
