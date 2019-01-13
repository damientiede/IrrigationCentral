import {Injectable} from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { IStatus } from '../model/status';
import { IDevice } from '../model/device';
import { IUser } from '../model/user';
import { IProgram } from '../model/program';
import { IStep } from '../model/step';
import { ISchedule } from '../model/schedule';
import { ISolenoid } from '../model/solenoid';
import { IAlarm } from '../model/alarm';
import { IAnalog } from '../model/analog';
import { ISpi } from '../model/spi';
import { IIrrigationAction} from '../model/irrigationaction';
import { IEvent } from '../model/event';
import { ICommand } from '../model/command';
import { IEventType } from '../model/eventtypes';
import { AuthService } from '../services/auth.service';
import { environment } from './../../environments/environment';

// Import RxJs required methods
import {Observable} from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class IrrigationControllerService {
    cacheExpiry: Number = 5;
    // devices: { [index: string]: any; } = {};
    deviceCache: IDevice[] = [];
    private restUrl = `${environment.auth.audience}/api`;  // 'http://irrigationcentral.co.nz:8011/api';
    // private restUrl = 'http://delta:8001/api';

    constructor(private http: Http,
                private client: HttpClient,
                private router: Router,
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
        const url = `${this.restUrl}/users/${uid}`;
        return this.client.get<IUser>(url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    getDevices(username: string): Observable <IDevice[]> {
        const url = `${this.restUrl}/devices`;
        return this.client.get<IDevice[]>(url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    getPrograms(id: number): Observable <IProgram[]> {
        const url = `${this.restUrl}/devices/${id}/programs`;
        return this.client.get<IProgram[]>(url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    getProgram(id: number): Observable <IProgram> {
        /* const steps = [
            new IStep(1, 'Step1', 1, 60, 1, 'Shelter', true, 1, 0, new Date(), new Date()),
            new IStep(2, 'Step2', 2, 60, 1, 'Station 1', true, 1, 0, new Date(), new Date()),
            new IStep(3, 'Step3', 3, 60, 1, 'Station 2', true, 1, 0, new Date(), new Date())];

            // new IStep(1, 'Step1', 1, 60, 1, 'Station1', true, 1, 1, new Date(), new Date())];
            /* new IStep(2, 'Step2', 2, 60, 1, 'Station2', true, 1, 0, new Date(), new Date()),
            new IStep(3, 'Step3', 3, 60, 1, 'Station3', true, 1, 0, new Date(), new Date())
        ]; */

        /* const mocked = new IProgram(1, 'Spring program 1',new Date(),null,true,1, steps, new Date(), new Date());
        return of (mocked); */ 

        const url = `${this.restUrl}/programs/${id}`;
        return this.client.get<IProgram>(url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    getStep(id: number): Observable <IStep> {
        const url = `${this.restUrl}/steps/${id}`;
        return this.client.get<IStep>(url, {
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
    getIrrigationActions(id: number): Observable <IIrrigationAction[]> {
        const url = `${this.restUrl}/devices/${id}/irrigationactions`;
        return this.client.get<IIrrigationAction[]>(url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    getCurrentAction(id: number): Observable <IIrrigationAction> {
        const url = `${this.restUrl}/devices/${id}/currentaction`;
        return this.client.get<IIrrigationAction>(url, {
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
        return this.client.post<ICommand>(url, cmd, {
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
    createProgram(program: IProgram): Observable <IProgram> {
        const url = `${this.restUrl}/programs`;
        return this.client.post<IProgram>(url, program, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    createStep(step: IStep): Observable <IStep> {
        const url = `${this.restUrl}/steps`;
        return this.client.post<IStep>(url, step, {
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
    saveDevice(device: IDevice): Observable <IDevice> {
        const url = `${this.restUrl}/devices/${device.id}/config`;
        return this.client.put<IDevice>(url, device, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    saveSolenoid(solenoid: ISolenoid): Observable <ISolenoid> {
        const url = `${this.restUrl}/solenoids/${solenoid.id}`;
        return this.client.put<ISolenoid>(url, solenoid, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    saveProgram(program: IProgram): Observable <IProgram> {
        console.log(program);
        const url = `${this.restUrl}/programs/${program.id}`;
        return this.client.put<IProgram>(url, program, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    saveStep(step: IStep): Observable <IStep> {
        const url = `${this.restUrl}/steps/${step.id}`;
        return this.client.put<IStep>(url, step, {
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
    deleteProgram(program: IProgram): Observable <IProgram> {
        const url = `${this.restUrl}/programs/${program.id}`;
        return this.client.delete<IProgram>(url, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
        });
    }
    deleteStep(step: IStep): Observable <IStep> {
        const url = `${this.restUrl}/programs/${step.id}`;
        return this.client.delete<IStep>(url, {
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
    redirectUserToLandingPage() {
      if (this.authService.isLoggedIn) {
        const username = this.authService.userProfile.name;
        this.getUser(username)
            .subscribe((user: IUser) => {
                if (user === null) { return; }
                if (user.devices.length > 1) {
                this.router.navigate(['/devices']);
                } else {
                const device = user.devices[0];
                if (device != null) {
                    this.router.navigate([`/device/${device.id}`]);
                }
            }
        });
      } else {
        this.router.navigate(['home']);
      }
    }
}
