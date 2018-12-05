export class IAnalog {
    constructor(
        public id: number,
        public Name: string,
        public Description: string,
        public HardwareType: string,
        public Address: string,
        public Multiplier: number,
        public RawValue: number,
        public Units: string,
        public Value: number,
        public DeviceId: number
    ) {}
}
