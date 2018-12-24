import {Injectable} from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { IStatus } from '../model/status';
import { IDevice } from '../model/device';
import { IUser } from '../model/user';
import { ISchedule } from '../model/schedule';
import { ISolenoid } from '../model/solenoid';
import { IAlarm } from '../model/alarm';
import { IAnalog } from '../model/analog';
import { ISpi } from '../model/spi';
import { IIrrigationProgram} from '../model/irrigationprogram';
import { IEvent } from '../model/event';
import { ICommand } from '../model/command';
import { IEventType } from '../model/eventtypes';
import { AuthService } from '../services/auth.service';

// Import RxJs required methods
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class IrrigationControllerService {
    cacheExpiry: Number = 5;
    // devices: { [index: string]: any; } = {};
    deviceCache: IDevice[] = [];
    private restUrl = 'http://irrigationcentral.co.nz:8001/api';
    // private restUrl = 'http://delta:8001/api';

    constructor(private http: Http,
                private client: HttpClient,
                private authService: AuthService) {}

    eventTypes: IEventType[] = [];
    getStatus(): Observable <IStatus[]> {
        const url = `${this.restUrl}/status`;
        return this.client.get<IStatus[]>(url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    login(email: string, password: string): Observable<any> {
        const url = `${this.restUrl}/login`;
        const body = { email, password };
        return this.http.post(url, body);
            // ...and calling .json() on the response to return data
            // .map((res: Response) => res.json())
            // ...errors if any
            // .catch((error: any) => Observable.throw('Server error'));
    }
    recoverPassword(email: string) {
        const url = `${this.restUrl}/recoverpassword/${email}`;
        return this.http.get(url);
    }

    getDevice(id: number): Observable <IDevice> {
        const url = `${this.restUrl}/devices/${id}`;
        return this.client.get<IDevice>(url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
       /*  return this.http.get(url)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            // ...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); */
    }

    getUser(uid: string): Observable <IUser> {
        const url = `${this.restUrl}/user/${uid}`;
        return this.http.get(url)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            // ...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getDevices(userid: Number): Observable <IDevice[]> {
        const url = `${this.restUrl}/devices`;
        return this.client.get<IDevice[]>(url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    getSchedules(id: number): Observable <ISchedule[]> {
        const url = `${this.restUrl}/devices/${id}/schedules`;
        return this.client.get<ISchedule[]>(url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    getSchedule(id: number): Observable <ISchedule> {
        const url = `${this.restUrl}/schedule/${id}`;
        return this.client.get<ISchedule>(url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    getSolenoids(id: number): Observable <ISolenoid[]> {
        const url = `${this.restUrl}/devices/${id}/solenoids`;
        return this.client.get<ISolenoid[]>(url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    getAlarms(id: number): Observable <IAlarm[]> {
        const url = `${this.restUrl}/devices/${id}/alarms`;
        return this.client.get<IAlarm[]>(url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    getAnalogs(id: number): Observable <IAnalog[]> {
        const url = `${this.restUrl}/devices/${id}/analogs`;
        return this.client.get<IAnalog[]>(url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    getSpis(id: number): Observable <ISpi[]> {
        const url = `${this.restUrl}/devices/${id}/spis`;
        return this.client.get<ISpi[]>(url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    getSolenoid(id: number): Observable <ISolenoid> {
        const url = `${this.restUrl}/solenoids/${id}`;
        return this.client.get<ISolenoid>(url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    getAlarm(id: number): Observable <IAlarm> {
        const url = `${this.restUrl}/alarms/${id}`;
        return this.client.get<IAlarm>(url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    getAnalog(id: number): Observable <IAnalog> {
        const url = `${this.restUrl}/analogs/${id}`;
        return this.client.get<IAnalog>(url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    getSpi(id: number): Observable <ISpi> {
        const url = `${this.restUrl}/spis/${id}`;
        return this.client.get<ISpi>(url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    getIrrigationPrograms(id: number): Observable <IIrrigationProgram[]> {
        const url = `${this.restUrl}/devices/${id}/irrigationprograms`;
        return this.client.get<IIrrigationProgram[]>(url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    getActiveProgram(id: number): Observable <IIrrigationProgram> {
        const url = `${this.restUrl}/devices/${id}/activeprogram`;
        return this.client.get<IIrrigationProgram>(url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    getEvents(id: number): Observable <IEvent[]> {
        const url = `${this.restUrl}/devices/${id}/events`;
        return this.client.get<IEvent[]>(url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    getEventTypes(): Observable <IEventType[]> {
        const url = `${this.restUrl}/eventtypes`;
        return this.client.get<IEventType[]>(url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    sendCommand(cmd: ICommand): Observable <ICommand> {
        const url = `${this.restUrl}/commands`;
        return this.client.get<ICommand>(url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    createSolenoid(solenoid: ISolenoid): Observable <ISolenoid> {
        const url = `${this.restUrl}/solenoids`;
        return this.client.post<ISolenoid>(url, solenoid, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    createSchedule(schedule: ISchedule): Observable <ISchedule> {
        const url = `${this.restUrl}/schedules`;
        return this.client.post<ISchedule>(url, schedule, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    createAlarm(alarm: IAlarm): Observable <IAlarm> {
        const url = `${this.restUrl}/alarms`;
        return this.client.post<IAlarm>(url, alarm, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    createAnalog(analog: IAnalog): Observable <IAnalog> {
        const url = `${this.restUrl}/analogs`;
        return this.client.post<IAnalog>(url, analog, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    createSpi(spi: ISpi): Observable <ISpi> {
        const url = `${this.restUrl}/spis`;
        return this.client.post<ISpi>(url, spi, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    createUser(user: IUser): Observable <IUser> {
        const url = `${this.restUrl}/users`;
        return this.client.post<IUser>(url, user, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    saveSolenoid(solenoid: ISolenoid): Observable <ISolenoid> {
        const url = `${this.restUrl}/solenoids/${solenoid.id}`;
        return this.client.put<ISolenoid>(url, solenoid, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    saveSchedule(schedule: ISchedule): Observable <ISchedule> {
        const url = `${this.restUrl}/schedules/${schedule.id}`;
        return this.client.put<ISchedule>(url, schedule, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    saveAlarm(alarm: IAlarm): Observable <IAlarm> {
        console.log(alarm);
        const url = `${this.restUrl}/alarms/${alarm.id}`;
        return this.client.put<IAlarm>(url, alarm, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    saveSpi(spi: ISpi): Observable <ISpi> {
        console.log(spi);
        const url = `${this.restUrl}/spis/${spi.id}`;
        return this.client.put<ISpi>(url, spi, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    saveAnalog(analog: IAnalog): Observable <IAnalog> {
        console.log(analog);
        const url = `${this.restUrl}/analogs/${analog.id}`;
        return this.client.put<IAnalog>(url, analog, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    deleteSolenoid(solenoid: ISolenoid): Observable <ISolenoid> {
        const url = `${this.restUrl}/solenoids/${solenoid.id}`;
        return this.client.delete<ISolenoid>(url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    deleteSchedule(schedule: ISchedule): Observable <ISchedule> {
        const url = `${this.restUrl}/schedules/${schedule.id}`;
        return this.client.delete<ISchedule>(url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    deleteAlarm(alarm: IAlarm): Observable <IAlarm> {
        const url = `${this.restUrl}/alarms/${alarm.id}`;
        return this.client.delete<IAlarm>(url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    deleteAnalog(analog: IAnalog): Observable <IAnalog> {
        const url = `${this.restUrl}/alarms/${analog.id}`;
        return this.client.delete<IAnalog>(url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }

    deleteSpi(spi: ISpi): Observable <ISpi> {
        const url = `${this.restUrl}/spis/${spi.id}`;
        return this.client.delete<ISpi>(url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
}
