export class IStep {
    constructor(
        public id: number,
        public Name: string,
        public Sequence: number,
        public Duration: number,
        public SolenoidId: number,
        public SolenoidName: string,
        public RequiresPump: boolean,
        public ProgramId: number,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}
