import { IDevice } from '../model/device';
export class IUser {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public mobile: string,
        public password: string,
        public createdAt: Date,
        public updatedAt: Date,
        public salt: string
    ) {}
    public devices: IDevice[];
}
