import {Injectable} from "@angular/core";
import {Location} from '@angular/common';
import {Router} from "@angular/router";

@Injectable()
export class NavService {
    constructor(private router: Router,
        private location: Location) {}

    getActive(route): string {
        if (this.router.url.indexOf(route) > 0) {
            return 'active';
        }
        return '';
    }

    public NavTo(url) {
        this.router.navigate([url]);
    }

    public Back() {
        this.location.back();
    }
 
    public Home() {
        this.router.navigate(['/']);
    }
}