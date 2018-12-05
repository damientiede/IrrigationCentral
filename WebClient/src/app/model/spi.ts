export class ISpi {
    constructor(
        public id: number,
        public Name: string,
        public Clock: number,
        public CS: number,
        public MISO: number,
        public MOSI: number,
        public DeviceId: number
    ) {}
}
