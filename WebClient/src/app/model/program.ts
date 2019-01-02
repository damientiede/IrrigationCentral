import { IStep } from './step';
export class IProgram {
    constructor(
        public id: number,
        public Name: string,
        public Start: Date,
        public Finished: Date,
        public Enabled: boolean,
        public DeviceId: number,
        public Steps: IStep[],
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}
