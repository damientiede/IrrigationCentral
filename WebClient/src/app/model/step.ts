import { IIrrigationAction } from "./irrigationaction";

export class IStep {
    constructor(
        public id: number,
        public Sequence: number,
        public Duration: number,
        public SolenoidId: number,
        public SolenoidName: string,
        public RequiresPump: boolean,
        public ProgramId: number,
        public IrrigationActionId: number,
        public IrrigationAction: IIrrigationAction,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}

// const step = new IStep(1, 1, 60, 1, 'solenoidName', true, 1, 0, new Date(), new Date());
