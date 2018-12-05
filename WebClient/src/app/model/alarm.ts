export class IAlarm {
    constructor(
        public id: number,
        public Name: string,
        public Description: string,
        public HardwareType: string,
        public Address: string,
        public Value: number,
        public DeviceId: number
    ) {}
}
