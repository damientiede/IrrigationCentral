export class IDevice {
    constructor(
        public id: number,
        public Name: string,
        public Description: string,
        public State: string,
        public Mode: string,
        public Status: string,
        public Pressure: Number,
        public PumpSolenoidId: number,
        public SoftwareVersion: string,
        public DeviceMAC: string,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}
