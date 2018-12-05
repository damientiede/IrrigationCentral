webpackJsonp(["main"],{

/***/ "../../../../../src lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"header\">\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-2\"></div>\n            <div class=\"col-8 centre-text\">\n                <h1>Irrigation Controller</h1>                    \n            </div>\n            <div class=\"col-2\"></div>\n        </div>\n    </div>\n</div>\n<div class=\"container\">\n    <router-outlet></router-outlet>\n</div>\n<div class=\"footer\">\n    <div class=\"row\">\n        <div class=\"col-3\"></div>\n        <div class=\"col-6 centre-text\">                \n        </div>\n        <div class=\"col-3\"></div>\n    </div>\n</div>\n\n\n\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

//import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster';
var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html")
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_auth_guard__ = __webpack_require__("../../../../../src/app/common/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__nav_component_nav_component__ = __webpack_require__("../../../../../src/app/nav.component/nav.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__history_history_component__ = __webpack_require__("../../../../../src/app/history/history.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_IrrigationController_service__ = __webpack_require__("../../../../../src/app/services/IrrigationController.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_routes__ = __webpack_require__("../../../../../src/app/app.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__config_config_component__ = __webpack_require__("../../../../../src/app/config/config.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__config_solenoid_solenoid_component__ = __webpack_require__("../../../../../src/app/config/solenoid/solenoid.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__config_alarm_alarm_component__ = __webpack_require__("../../../../../src/app/config/alarm/alarm.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__config_analog_analog_component__ = __webpack_require__("../../../../../src/app/config/analog/analog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__config_spi_spi_component__ = __webpack_require__("../../../../../src/app/config/spi/spi.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__status_status_component__ = __webpack_require__("../../../../../src/app/status/status.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__device_tools_device_tools_component__ = __webpack_require__("../../../../../src/app/device-tools/device-tools.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__schedules_schedules_component__ = __webpack_require__("../../../../../src/app/schedules/schedules.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_18__status_status_component__["a" /* StatusComponent */],
            __WEBPACK_IMPORTED_MODULE_10__history_history_component__["a" /* HistoryComponent */],
            __WEBPACK_IMPORTED_MODULE_13__config_config_component__["a" /* ConfigComponent */],
            __WEBPACK_IMPORTED_MODULE_14__config_solenoid_solenoid_component__["a" /* SolenoidComponent */],
            __WEBPACK_IMPORTED_MODULE_15__config_alarm_alarm_component__["a" /* AlarmComponent */],
            __WEBPACK_IMPORTED_MODULE_16__config_analog_analog_component__["a" /* AnalogComponent */],
            __WEBPACK_IMPORTED_MODULE_17__config_spi_spi_component__["a" /* SpiComponent */],
            __WEBPACK_IMPORTED_MODULE_19__device_tools_device_tools_component__["a" /* DeviceToolsComponent */],
            __WEBPACK_IMPORTED_MODULE_20__schedules_schedules_component__["a" /* SchedulesComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
            __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__["ToastModule"].forRoot(),
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* JsonpModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* RouterModule */].forRoot(__WEBPACK_IMPORTED_MODULE_12__app_routes__["a" /* routes */])
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_11__services_IrrigationController_service__["a" /* IrrigationControllerService */], __WEBPACK_IMPORTED_MODULE_9__nav_component_nav_component__["a" /* NavComponent */], __WEBPACK_IMPORTED_MODULE_6__common_auth_guard__["a" /* AuthGuard */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__status_status_component__ = __webpack_require__("../../../../../src/app/status/status.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__schedules_schedules_component__ = __webpack_require__("../../../../../src/app/schedules/schedules.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__history_history_component__ = __webpack_require__("../../../../../src/app/history/history.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_config_component__ = __webpack_require__("../../../../../src/app/config/config.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_solenoid_solenoid_component__ = __webpack_require__("../../../../../src/app/config/solenoid/solenoid.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config_alarm_alarm_component__ = __webpack_require__("../../../../../src/app/config/alarm/alarm.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__config_analog_analog_component__ = __webpack_require__("../../../../../src/app/config/analog/analog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__config_spi_spi_component__ = __webpack_require__("../../../../../src/app/config/spi/spi.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__common_auth_guard__ = __webpack_require__("../../../../../src/app/common/auth.guard.ts");









// Define which component should be loaded based on the current URL
var routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'device/:deviceid/status', component: __WEBPACK_IMPORTED_MODULE_0__status_status_component__["a" /* StatusComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_8__common_auth_guard__["a" /* AuthGuard */]] },
    { path: 'device/:deviceid/schedules', component: __WEBPACK_IMPORTED_MODULE_1__schedules_schedules_component__["a" /* SchedulesComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_8__common_auth_guard__["a" /* AuthGuard */]] },
    { path: 'device/:deviceid/history', component: __WEBPACK_IMPORTED_MODULE_2__history_history_component__["a" /* HistoryComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_8__common_auth_guard__["a" /* AuthGuard */]] },
    { path: 'device/:deviceid/config', component: __WEBPACK_IMPORTED_MODULE_3__config_config_component__["a" /* ConfigComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_8__common_auth_guard__["a" /* AuthGuard */]] },
    { path: 'device/:deviceid/config?view=:view', component: __WEBPACK_IMPORTED_MODULE_3__config_config_component__["a" /* ConfigComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_8__common_auth_guard__["a" /* AuthGuard */]] },
    { path: 'device/:deviceid/solenoid/:id', component: __WEBPACK_IMPORTED_MODULE_4__config_solenoid_solenoid_component__["a" /* SolenoidComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_8__common_auth_guard__["a" /* AuthGuard */]] },
    { path: 'device/:deviceid/alarm/:id', component: __WEBPACK_IMPORTED_MODULE_5__config_alarm_alarm_component__["a" /* AlarmComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_8__common_auth_guard__["a" /* AuthGuard */]] },
    { path: 'device/:deviceid/analog/:id', component: __WEBPACK_IMPORTED_MODULE_6__config_analog_analog_component__["a" /* AnalogComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_8__common_auth_guard__["a" /* AuthGuard */]] },
    { path: 'device/:deviceid/spi/:id', component: __WEBPACK_IMPORTED_MODULE_7__config_spi_spi_component__["a" /* SpiComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_8__common_auth_guard__["a" /* AuthGuard */]] },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_0__status_status_component__["a" /* StatusComponent */] },
];
//# sourceMappingURL=app.routes.js.map

/***/ }),

/***/ "../../../../../src/app/common/auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { tokenNotExpired } from 'angular2-jwt';
var AuthGuard = (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        // Check to see if a user has a valid JWT
        //if (tokenNotExpired()) {
        // If they do, return true and allow the user to load the home component
        return true;
        //}
        // If not, they redirect them to the login page
        //this.router.navigate(['/login']);
        //return false;
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object])
], AuthGuard);

var _a;
//# sourceMappingURL=auth.guard.js.map

/***/ }),

/***/ "../../../../../src/app/config/alarm/alarm.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/config/alarm/alarm.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" *ngIf=\"loaded\">\n  <div class=\"col-2\"></div>\n  <div class=\"col-8\">\n    <div *ngIf=\"loaded\">\n        <div class=\"row left\">\n          <button (click)=\"back()\" class=\"btn btn-primary\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Back\">\n              <i class=\"fa fa-angle-left\"></i>\n          </button>\n          <h5>{{getTitle()}}</h5>\n        </div>\n        \n        <div class=\"form-group\">\n          <label for=\"name\">Name</label>\n          <input type=\"text\" class=\"form-control\" id=\"name\" [(ngModel)]=\"alarm.Name\" required>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"description\">Description</label>\n          <input type=\"text\" class=\"form-control\" id=\"description\" [(ngModel)]=\"alarm.Description\">\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"hardwareType\">Hardware Type</label>          \n          <select class=\"form-control\" id=\"hardwareType\" [(ngModel)]=\"alarm.HardwareType\" required>\n            <option *ngFor=\"let ht of hardwareTypes\" value=\"{{ht}}\">{{ht}}</option>\n          </select>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"address\">Address</label>\n          <input type=\"text\" class=\"form-control\" id=\"address\" [(ngModel)]=\"alarm.Address\" required>\n        </div>\n\n        <button class=\"btn btn-success btn-sm\" (click)=\"save()\">Save</button>\n        <button class=\"btn btn-warning btn-sm\" (click)=\"delete()\">Delete</button>\n        <button class=\"btn btn-secondary btn-sm\" (click)=\"cancel()\">Cancel</button>\n\n      </div>  \n  </div>\n  <div class=\"col-2\"></div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/config/alarm/alarm.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlarmComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_alarm__ = __webpack_require__("../../../../../src/app/model/alarm.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nav_component_nav_component__ = __webpack_require__("../../../../../src/app/nav.component/nav.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_IrrigationController_service__ = __webpack_require__("../../../../../src/app/services/IrrigationController.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_toastr_ng2_toastr__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AlarmComponent = (function () {
    function AlarmComponent(service, route, nav, vcr, toastr) {
        this.service = service;
        this.route = route;
        this.nav = nav;
        this.toastr = toastr;
        this.id = 0;
        this.deviceid = 0;
        this.loaded = false;
        this.hardwareTypes = ['GPIO', 'Distributed', 'SPI'];
        this.toastr.setRootViewContainerRef(vcr);
    }
    AlarmComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            // parse device id
            _this.deviceid = params['deviceid'];
            console.log(params);
            if (Number.isNaN(_this.deviceid)) {
                alert('Missing Device ID');
            }
            // parse alarm id
            var id = params['id'];
            if (id === 'new') {
                _this.alarm = new __WEBPACK_IMPORTED_MODULE_2__model_alarm__["a" /* IAlarm */](-1, '', '', '', '', 0, _this.deviceid);
                _this.loaded = true;
            }
            else if (Number.isNaN(id)) {
                alert("Invalid Alarm ID " + id);
            }
            else {
                _this.id = id;
                _this.getAlarm(_this.id);
            }
        });
    };
    AlarmComponent.prototype.getAlarm = function (id) {
        var _this = this;
        this.service
            .getAlarm(id)
            .subscribe(function (a) {
            console.log(a);
            _this.alarm = a;
            _this.loaded = true;
        }, function (error) { return function () {
            console.log('Something went wrong...');
        }; }, function () {
            console.log('Success');
        });
    };
    AlarmComponent.prototype.getTitle = function () {
        if (this.alarm == null) {
            return;
        }
        if (this.alarm.id === -1) {
            return 'New alarm';
        }
        return "Edit alarm - " + this.alarm.id;
    };
    AlarmComponent.prototype.save = function () {
        var _this = this;
        console.log(this.alarm);
        if (this.alarm.id === -1) {
            this.service.createAlarm(this.alarm)
                .subscribe(function (s) {
                console.log(s);
                _this.alarm = s;
            }, function (error) { return function () {
                console.log('Something went wrong...');
                _this.toastr.error('Something went wrong...', 'Damn');
            }; }, function () {
                console.log('Success');
                _this.toastr.success('Changes saved');
            });
            return;
        }
        this.service.saveAlarm(this.alarm)
            .subscribe(function () {
            console.log("Saving alarm");
            console.log(_this.alarm);
        }, function (error) { return function () {
            console.log('Something went wrong...');
            _this.toastr.error('Something went wrong...', 'Damn');
        }; }, function () {
            console.log('Success');
            _this.toastr.success('Changes saved');
        });
    };
    AlarmComponent.prototype.back = function () {
        this.nav.NavTo("/device/" + this.deviceid + "/config");
    };
    AlarmComponent.prototype.cancel = function () {
        this.nav.NavTo("/device/" + this.deviceid + "/config");
    };
    AlarmComponent.prototype.delete = function () {
        var _this = this;
        console.log("Deleting alarm " + this.alarm.Name);
        this.service.deleteAlarm(this.alarm)
            .subscribe(function () { }, function (error) { return function () {
            console.log('Something went wrong...');
            _this.toastr.error('Something went wrong...', 'Damn');
        }; }, function () {
            console.log('Success');
            _this.toastr.success('Changes saved');
        });
        this.nav.NavTo("/device/" + this.deviceid + "/config");
    };
    return AlarmComponent;
}());
AlarmComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-alarm',
        template: __webpack_require__("../../../../../src/app/config/alarm/alarm.component.html"),
        styles: [__webpack_require__("../../../../../src/app/config/alarm/alarm.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__services_IrrigationController_service__["a" /* IrrigationControllerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_IrrigationController_service__["a" /* IrrigationControllerService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__nav_component_nav_component__["a" /* NavComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__nav_component_nav_component__["a" /* NavComponent */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5_ng2_toastr_ng2_toastr__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ng2_toastr_ng2_toastr__["ToastsManager"]) === "function" && _e || Object])
], AlarmComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=alarm.component.js.map

/***/ }),

/***/ "../../../../../src/app/config/analog/analog.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/config/analog/analog.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" *ngIf=\"loaded\">\n  <div class=\"col-2\"></div>\n  <div class=\"col-8\">\n    <div *ngIf=\"loaded\">\n        <div class=\"row left\">\n          <button (click)=\"back()\" class=\"btn btn-primary\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Back\">\n              <i class=\"fa fa-angle-left\"></i>\n          </button>\n          <h5>{{getTitle()}}</h5>\n        </div>\n        \n        <div class=\"form-group\">\n          <label for=\"name\">Name</label>\n          <input type=\"text\" class=\"form-control\" id=\"name\" [(ngModel)]=\"analog.Name\" required>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"description\">Description</label>\n          <input type=\"text\" class=\"form-control\" id=\"description\" [(ngModel)]=\"analog.Description\">\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"hardwareType\">Hardware Type</label>          \n          <select class=\"form-control\" id=\"hardwareType\" [(ngModel)]=\"analog.HardwareType\" required>\n            <option *ngFor=\"let ht of hardwareTypes\" value=\"{{ht}}\">{{ht}}</option>\n          </select>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"address\">Address</label>\n          <input type=\"text\" class=\"form-control\" id=\"address\" [(ngModel)]=\"analog.Address\" required>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"address\">Multiplier</label>\n          <input type=\"text\" class=\"form-control\" id=\"multiplier\" [(ngModel)]=\"analog.Multiplier\" required>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"address\">Units</label>\n          <input type=\"text\" class=\"form-control\" id=\"units\" [(ngModel)]=\"analog.Units\" required>\n        </div>\n\n        <button class=\"btn btn-success btn-sm\" (click)=\"save()\">Save</button>\n        <button class=\"btn btn-warning btn-sm\" (click)=\"delete()\">Delete</button>\n        <button class=\"btn btn-secondary btn-sm\" (click)=\"cancel()\">Cancel</button>\n\n      </div>  \n  </div>\n  <div class=\"col-2\"></div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/config/analog/analog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnalogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_analog__ = __webpack_require__("../../../../../src/app/model/analog.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nav_component_nav_component__ = __webpack_require__("../../../../../src/app/nav.component/nav.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_IrrigationController_service__ = __webpack_require__("../../../../../src/app/services/IrrigationController.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_toastr_ng2_toastr__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AnalogComponent = (function () {
    function AnalogComponent(service, route, nav, vcr, toastr) {
        this.service = service;
        this.route = route;
        this.nav = nav;
        this.toastr = toastr;
        this.id = 0;
        this.deviceid = 0;
        this.loaded = false;
        this.hardwareTypes = ['GPIO', 'Distributed', 'SPI'];
        this.toastr.setRootViewContainerRef(vcr);
    }
    AnalogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            // parse device id
            _this.deviceid = params['deviceid'];
            console.log(params);
            if (Number.isNaN(_this.deviceid)) {
                alert('Missing Device ID');
            }
            // parse analog id
            var id = params['id'];
            if (id === 'new') {
                _this.analog = new __WEBPACK_IMPORTED_MODULE_2__model_analog__["a" /* IAnalog */](-1, '', '', '', '', 0, 0, '', 0, _this.deviceid);
                _this.loaded = true;
            }
            else if (Number.isNaN(id)) {
                alert("Invalid Analog ID " + id);
            }
            else {
                _this.id = id;
                _this.getAnalog(_this.id);
            }
        });
    };
    AnalogComponent.prototype.getAnalog = function (id) {
        var _this = this;
        this.service
            .getAnalog(id)
            .subscribe(function (a) {
            _this.analog = a;
            _this.loaded = true;
        }, function (error) { return function () {
            console.log('Something went wrong...');
        }; }, function () {
            console.log('Success');
        });
    };
    AnalogComponent.prototype.getTitle = function () {
        if (this.analog == null) {
            return;
        }
        if (this.analog.id === -1) {
            return 'New analog';
        }
        return "Edit analog - " + this.analog.id;
    };
    AnalogComponent.prototype.save = function () {
        var _this = this;
        console.log(this.analog);
        if (this.analog.id === -1) {
            this.service.createAnalog(this.analog)
                .subscribe(function (s) {
                console.log(s);
                _this.analog = s;
            }, function (error) { return function () {
                console.log('Something went wrong...');
                _this.toastr.error('Something went wrong...', 'Damn');
            }; }, function () {
                console.log('Success');
                _this.toastr.success('Changes saved');
            });
            return;
        }
        this.service.saveAnalog(this.analog)
            .subscribe(function () { }, function (error) { return function () {
            console.log('Something went wrong...');
            _this.toastr.error('Something went wrong...', 'Damn');
        }; }, function () {
            console.log('Success');
            _this.toastr.success('Changes saved');
        });
    };
    AnalogComponent.prototype.back = function () {
        this.nav.NavTo("/device/" + this.deviceid + "/config");
    };
    AnalogComponent.prototype.cancel = function () {
        this.nav.NavTo("/device/" + this.deviceid + "/config");
    };
    AnalogComponent.prototype.delete = function () {
        var _this = this;
        console.log("Deleting analog " + this.analog.Name);
        this.service.deleteAnalog(this.analog)
            .subscribe(function () { }, function (error) { return function () {
            console.log('Something went wrong...');
            _this.toastr.error('Something went wrong...', 'Damn');
        }; }, function () {
            console.log('Success');
            _this.toastr.success('Changes saved');
        });
    };
    return AnalogComponent;
}());
AnalogComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-analog',
        template: __webpack_require__("../../../../../src/app/config/analog/analog.component.html"),
        styles: [__webpack_require__("../../../../../src/app/config/analog/analog.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__services_IrrigationController_service__["a" /* IrrigationControllerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_IrrigationController_service__["a" /* IrrigationControllerService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__nav_component_nav_component__["a" /* NavComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__nav_component_nav_component__["a" /* NavComponent */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5_ng2_toastr_ng2_toastr__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ng2_toastr_ng2_toastr__["ToastsManager"]) === "function" && _e || Object])
], AnalogComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=analog.component.js.map

/***/ }),

/***/ "../../../../../src/app/config/config.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "ul {list-style: none;padding-left:0px;}\r\nli:hover {cursor: pointer;}\r\ntable.solenoids {width:100%;}\r\ntable.solenoids td {border-top:1px solid #777;}\r\ntable.solenoids tr:hover {cursor: pointer;}\r\n\r\nh4 {float:left;margin-top:5px;}\r\nbutton {float:left;margin:5px;}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/config/config.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!loaded\"></div>\n<div class=\"row\" *ngIf=\"loaded\">\n    <div class=\"col-2\"></div>\n\n    <div class=\"col-8\">\n        <app-device-tools [device]=\"device\"></app-device-tools>\n    </div>\n    <div class=\"col-2\"></div>\n</div>\n<div class=\"row\" *ngIf=\"loaded\">\n    <div class=\"col-2\"></div>\n    <div class=\"col-8\">\n        <ul class=\"nav nav-tabs\">\n            <li class=\"nav-item\">\n              <a class=\"nav-link\" [ngClass]=\"getActiveClass('Device')\" (click)=\"deviceClicked()\">Device</a>\n            </li>\n            <li class=\"nav-item\">\n              <a class=\"nav-link\" [ngClass]=\"getActiveClass('Solenoids')\" (click)=\"solenoidsClicked()\">Solenoids</a>\n            </li>\n            <li class=\"nav-item\">\n              <a class=\"nav-link\" [ngClass]=\"getActiveClass('Alarms')\" (click)=\"alarmsClicked()\">Alarms</a>\n            </li>\n            <li class=\"nav-item\">\n              <a class=\"nav-link\" [ngClass]=\"getActiveClass('Analogs')\" (click)=\"analogsClicked()\">Analogs</a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" [ngClass]=\"getActiveClass('SPIs')\" (click)=\"spisClicked()\">SPIs</a>\n            </li>\n          </ul>\n    </div>\n    <div class=\"col-2\"></div>\n</div>\n\n<div class=\"row\" *ngIf=\"loaded\">\n    <div class=\"col-2\"></div>\n    <div class=\"col-8\"> \n        <!-- Device section -->\n        <div *ngIf=\"isView('Device')\">            \n            <table>\n                <tbody>                                     \n                    <tr><td>Name: {{device.Name}}</td></tr>                    \n                    <tr><td>Description: {{device.Description}}</td></tr>\n                    <tr><td>Last updated: {{getLastUpdated()}}</td></tr>\n                    <tr><td>Device MAC: {{device.DeviceMAC}}</td></tr>\n                    <tr><td>Software version: {{device.SoftwareVersion}}</td></tr>\n                    <tr><td>Device ID: {{device.id}}</td></tr>\n                    <tr><td>Mode: {{device.Mode}}</td></tr>\n                    <tr><td>State: {{device.State}}</td></tr>\n                    <tr><td>Status: {{device.Status}}</td></tr>        \n                </tbody>\n            </table>\n            <button type=\"button\" class=\"btn btn-success\" (click)=\"refreshConfig()\">\n                <i class=\"fa fa-sync-alt\"></i>Refresh config\n            </button>\n        </div>\n        <!-- Solenoids section -->\n        <div *ngIf=\"isView('Solenoids')\">\n            <h5 *ngIf=\"solenoids?.length==0\">No solenoids configured</h5>\n            <table class=\"solenoids\">\n                <tbody>\n                    <tr *ngFor=\"let solenoid of solenoids\" (click)=\"editSolenoid(solenoid)\">\n                        <td>{{solenoid.Name}} </td>\n                        <td>{{solenoid.Description}} </td>\n                        <td>{{solenoid.HardwareType}} </td>\n                        <td>{{solenoid.Address}} </td>\n                        <td>{{solenoid.Value}} </td> \n                    </tr>\n                </tbody>\n            </table>\n            <button type=\"button\" class=\"btn btn-success\" (click)=\"newSolenoid()\">\n                <i class=\"fa fa-plus\"></i>\n            </button>\n            <br>\n        </div>\n        <!-- Alarms section -->\n        <div *ngIf=\"isView('Alarms')\">\n            <h5 *ngIf=\"alarms?.length==0\">No alarms configured</h5>\n            <table class=\"solenoids\">\n                <tbody>\n                    <tr *ngFor=\"let alarm of alarms\" (click)=\"editAlarm(alarm)\">\n                        <td>{{alarm.Name}} </td>\n                        <td>{{alarm.Description}} </td>\n                        <td>{{alarm.HardwareType}} </td>\n                        <td>{{alarm.Address}} </td>\n                        <td>{{alarm.Value}} </td> \n                    </tr>\n                </tbody>\n            </table>\n            <button type=\"button\" class=\"btn btn-success\" (click)=\"newAlarm()\">\n                <i class=\"fa fa-plus\"></i>\n            </button>\n            <br>\n        </div>\n        <!-- Analogs section -->\n        <div *ngIf=\"isView('Analogs')\">\n            <h5 *ngIf=\"analogs.length==0\">No analogs configured</h5>\n            <table class=\"solenoids\">\n                <tbody>\n                    <tr *ngFor=\"let analog of analogs\" (click)=\"editAnalog(analog)\">\n                        <td>{{analog.Name}} </td>\n                        <td>{{analog.Description}} </td>\n                        <td>{{analog.HardwareType}} </td>\n                        <td>{{analog.Address}} </td>\n                        <td>{{analog.Value}} </td> \n                    </tr>\n                </tbody>\n            </table>\n            <button type=\"button\" class=\"btn btn-success\" (click)=\"newAnalog()\">\n                <i class=\"fa fa-plus\"></i>\n            </button>\n            <br>\n        </div>\n        <!-- SPIs section -->\n        <div *ngIf=\"isView('SPIs')\">\n                <h5 *ngIf=\"spis.length==0\">No SPIs configured</h5>\n                <table class=\"solenoids\">\n                    <tbody>\n                        <tr *ngFor=\"let spi of spis\" (click)=\"editSPI(spi)\">\n                            <td>{{spi.Name}} </td>\n                            <td>{{spi.Description}} </td>\n                            <td>{{spi.HardwareType}} </td>\n                            <td>{{spi.Address}} </td>\n                            <td>{{spi.Value}} </td> \n                        </tr>\n                    </tbody>\n                </table>\n                <button type=\"button\" class=\"btn btn-success\" (click)=\"newSPI()\">\n                    <i class=\"fa fa-plus\"></i>\n                </button>\n                <br>\n            </div>\n    </div>\n    <div class=\"col-2\"></div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/config/config.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nav_component_nav_component__ = __webpack_require__("../../../../../src/app/nav.component/nav.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_IrrigationController_service__ = __webpack_require__("../../../../../src/app/services/IrrigationController.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_command__ = __webpack_require__("../../../../../src/app/model/command.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ConfigComponent = (function () {
    function ConfigComponent(service, route, toastr, vcr, nav) {
        this.service = service;
        this.route = route;
        this.toastr = toastr;
        this.nav = nav;
        this.deviceid = 0;
        this.loaded = false;
        this.selection = 'Device';
        this.activeView = 'Device';
        this.showDevice = true;
        this.showSolenoids = false;
        this.showAlarms = false;
        this.toastr.setRootViewContainerRef(vcr);
    }
    ConfigComponent.prototype.ngOnInit = function () {
        var _this = this;
        // extract query params
        this.route.queryParams.subscribe(function (queryparams) {
            var view = queryparams['view'];
            if (view != null) {
                console.log("activeView: " + view);
                _this.activeView = view;
            }
        });
        // extract route params
        this.route.params.subscribe(function (params) {
            _this.deviceid = params['deviceid'];
            if (Number.isNaN(_this.deviceid)) {
                alert('Missing Device ID');
            }
            _this.getDevice(_this.deviceid);
        });
    };
    ConfigComponent.prototype.getDevice = function (id) {
        var _this = this;
        console.log('getDevice()');
        this.service
            .getDevice(id)
            .subscribe(function (d) {
            console.log(d);
            _this.device = d;
            //this.getIrrigationPrograms();
            _this.getSolenoids();
            _this.getAlarms();
            _this.getAnalogs();
            _this.getSpis();
            _this.loaded = true;
        }, function (error) { return function () {
            console.log('Something went wrong...');
        }; }, function () {
            console.log('Success');
        });
    };
    ConfigComponent.prototype.getIrrigationPrograms = function () {
        var _this = this;
        if (this.device != null) {
            this.service.getIrrigationPrograms(this.device.id)
                .subscribe(function (data) {
                _this.irrigationPrograms = data;
            });
        }
    };
    ConfigComponent.prototype.getSolenoids = function () {
        var _this = this;
        if (this.device != null) {
            this.service.getSolenoids(this.device.id)
                .subscribe(function (data) {
                _this.solenoids = data;
                console.log(data);
            });
        }
    };
    ConfigComponent.prototype.getAlarms = function () {
        var _this = this;
        if (this.device != null) {
            this.service.getAlarms(this.device.id)
                .subscribe(function (data) {
                _this.alarms = data;
                console.log(data);
            });
        }
    };
    ConfigComponent.prototype.getAnalogs = function () {
        var _this = this;
        if (this.device != null) {
            this.service.getAnalogs(this.device.id)
                .subscribe(function (data) {
                _this.analogs = data;
                console.log(data);
            });
        }
    };
    ConfigComponent.prototype.getSpis = function () {
        var _this = this;
        if (this.device != null) {
            this.service.getSpis(this.device.id)
                .subscribe(function (data) {
                _this.spis = data;
                console.log(data);
            });
        }
    };
    ConfigComponent.prototype.getLastUpdated = function () {
        if (this.device != null) {
            return __WEBPACK_IMPORTED_MODULE_3_moment__(this.device.updatedAt).format('Do MMM YYYY h:mm:ss a');
        }
        return '';
    };
    ConfigComponent.prototype.timeFormat = function (date) {
        return __WEBPACK_IMPORTED_MODULE_3_moment__(date).format('h:mm:ss a');
    };
    ConfigComponent.prototype.dateTimeFormat = function (date) {
        if (__WEBPACK_IMPORTED_MODULE_3_moment__(date).isValid()) {
            return __WEBPACK_IMPORTED_MODULE_3_moment__(date).format('Do MMM YYYY h:mm:ss a');
        }
        return '';
    };
    ConfigComponent.prototype.editSolenoid = function (s) {
        this.nav.NavTo("/device/" + this.device.id + "/solenoid/" + s.id);
    };
    ConfigComponent.prototype.editAlarm = function (a) {
        this.nav.NavTo("/device/" + this.device.id + "/alarm/" + a.id);
    };
    ConfigComponent.prototype.editAnalog = function (a) {
        this.nav.NavTo("/device/" + this.device.id + "/analog/" + a.id);
    };
    ConfigComponent.prototype.editSPI = function (s) {
        this.nav.NavTo("/device/" + this.device.id + "/spi/" + s.id);
    };
    ConfigComponent.prototype.newSolenoid = function () {
        this.nav.NavTo("/device/" + this.device.id + "/solenoid/new");
    };
    ConfigComponent.prototype.newAlarm = function () {
        this.nav.NavTo("/device/" + this.device.id + "/alarm/new");
    };
    ConfigComponent.prototype.newAnalog = function () {
        this.nav.NavTo("/device/" + this.device.id + "/analog/new");
    };
    ConfigComponent.prototype.newSPI = function () {
        this.nav.NavTo("/device/" + this.device.id + "/spi/new");
    };
    ConfigComponent.prototype.deviceClicked = function () {
        this.activeView = 'Device';
        this.showDevice = true;
        this.showSolenoids = false;
        this.showAlarms = false;
    };
    ConfigComponent.prototype.solenoidsClicked = function () {
        this.activeView = 'Solenoids';
        this.showDevice = false;
        this.showSolenoids = true;
        this.showAlarms = false;
    };
    ConfigComponent.prototype.alarmsClicked = function () {
        this.activeView = 'Alarms';
    };
    ConfigComponent.prototype.analogsClicked = function () {
        this.activeView = 'Analogs';
    };
    ConfigComponent.prototype.spisClicked = function () {
        this.activeView = 'SPIs';
    };
    ConfigComponent.prototype.getActiveClass = function (v) {
        if (this.activeView === v) {
            return 'active';
        }
        return;
    };
    ConfigComponent.prototype.isView = function (v) {
        return (this.activeView === v);
    };
    ConfigComponent.prototype.getDeviceName = function () {
        if (this.device != null) {
            return this.device.Name;
        }
    };
    ConfigComponent.prototype.backClick = function () {
        this.nav.Back();
    };
    ConfigComponent.prototype.sendCommand = function (cmd) {
        var _this = this;
        this.service.sendCommand(cmd)
            .subscribe(function () { }, function (error) { return function () {
            console.log('Something went wrong...');
            _this.toastr.error('Something went wrong...', 'Damn');
        }; }, function () {
            console.log('Success');
            _this.toastr.success('Command sent');
        });
    };
    ConfigComponent.prototype.refreshConfig = function () {
        var cmd = new __WEBPACK_IMPORTED_MODULE_6__model_command__["a" /* ICommand */](0, //id
        'LoadConfig', //commandType
        '', //params
        new Date, //issued
        null, //actioned
        this.deviceid, //deviceId
        new Date, //createdAt
        null //updatedAt
        );
        this.sendCommand(cmd);
    };
    return ConfigComponent;
}());
ConfigComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-config',
        template: __webpack_require__("../../../../../src/app/config/config.component.html"),
        styles: [__webpack_require__("../../../../../src/app/config/config.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__services_IrrigationController_service__["a" /* IrrigationControllerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_IrrigationController_service__["a" /* IrrigationControllerService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__["ToastsManager"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__nav_component_nav_component__["a" /* NavComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__nav_component_nav_component__["a" /* NavComponent */]) === "function" && _e || Object])
], ConfigComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=config.component.js.map

/***/ }),

/***/ "../../../../../src/app/config/solenoid/solenoid.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "div.left h5 { float:left;}\r\ndiv.left button {float:left;}\r\n\r\nh4 {float:left;margin-top:5px;}\r\nbutton {float:left;margin:5px;}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/config/solenoid/solenoid.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" *ngIf=\"loaded\">\n  <div class=\"col-2\"></div>\n  <div class=\"col-8\">\n    <div *ngIf=\"loaded\">\n        <div class=\"row left\">\n\n          <button (click)=\"back()\" class=\"btn btn-primary\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Back\">\n              <i class=\"fa fa-angle-left\"></i>\n          </button>\n          <h5>{{getTitle()}}</h5>\n        </div>\n        \n        <div class=\"form-group\">\n          <label for=\"name\">Name</label>\n          <input type=\"text\" class=\"form-control\" id=\"name\" [ngModel]=\"solenoid?.Name\" (ngModelChange)=\"solenoid.Name=$event\" required>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"description\">Description</label>\n          <input type=\"text\" class=\"form-control\" id=\"description\" [ngModel]=\"solenoid?.Description\" (ngModelChange)=\"solenoid.Description=$event\">\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"hardwareType\">Hardware Type</label>          \n          <select class=\"form-control\" id=\"hardwareType\" name=\"hardwareType\" [ngModel]=\"solenoid?.HardwareType\" (ngModelChange)=\"solenoid.HardwareType=$event\" required>\n            <option *ngFor=\"let ht of hardwareTypes\" value=\"{{ht}}\">{{ht}}</option>\n          </select>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"address\">Address</label>\n          <input type=\"text\" class=\"form-control\" id=\"address\" [ngModel]=\"solenoid?.Address\" (ngModelChange)=\"solenoid.Address=$event\" required>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"requiresPump\">Requires pump</label>\n          <input type=\"checkbox\" class=\"form-control\" id=\"address\" [ngModel]=\"solenoid?.RequiresPump\" (ngModelChange)=\"solenoid.RequiresPump=$event\">\n        </div>\n\n        <button class=\"btn btn-success btn-sm\" (click)=\"save()\">Save</button>\n        <button class=\"btn btn-warning btn-sm\" (click)=\"delete()\">Delete</button>\n        <button class=\"btn btn-secondary btn-sm\" (click)=\"cancel()\">Cancel</button>\n\n      </div>  \n  </div>\n  <div class=\"col-2\"></div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/config/solenoid/solenoid.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SolenoidComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_solenoid__ = __webpack_require__("../../../../../src/app/model/solenoid.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nav_component_nav_component__ = __webpack_require__("../../../../../src/app/nav.component/nav.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_IrrigationController_service__ = __webpack_require__("../../../../../src/app/services/IrrigationController.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_toastr_ng2_toastr__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SolenoidComponent = (function () {
    function SolenoidComponent(service, route, nav, vcr, toastr) {
        this.service = service;
        this.route = route;
        this.nav = nav;
        this.toastr = toastr;
        this.id = 0;
        this.deviceid = 0;
        this.loaded = false;
        this.hardwareTypes = ['GPIO', 'Distributed', 'SPI'];
        this.toastr.setRootViewContainerRef(vcr);
    }
    SolenoidComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            // parse device id
            _this.deviceid = params['deviceid'];
            console.log(params);
            if (Number.isNaN(_this.deviceid)) {
                alert('Missing Device ID');
            }
            // parse solenoid id
            var id = params['id'];
            if (id === 'new') {
                _this.solenoid = new __WEBPACK_IMPORTED_MODULE_2__model_solenoid__["a" /* ISolenoid */](-1, '', '', '', '', 0, false, _this.deviceid);
                _this.loaded = true;
            }
            else if (Number.isNaN(id)) {
                alert("Invalid Solenoid ID " + id);
            }
            else {
                _this.id = id;
                _this.getSolenoid(_this.id);
                //this.loaded = true;
            }
        });
    };
    SolenoidComponent.prototype.getSolenoid = function (id) {
        var _this = this;
        console.log('getSolenoid()');
        this.service
            .getSolenoid(id)
            .subscribe(function (d) {
            console.log(d);
            _this.solenoid = d;
            _this.loaded = true;
        }, function (error) { return function () {
            console.log('Something went wrong...');
        }; }, function () {
            console.log('Success');
        });
    };
    SolenoidComponent.prototype.getTitle = function () {
        if (this.solenoid == null) {
            return;
        }
        if (this.solenoid.id === -1) {
            return 'New solenoid';
        }
        return "Edit solenoid - " + this.solenoid.id;
    };
    SolenoidComponent.prototype.save = function () {
        var _this = this;
        console.log(this.solenoid);
        if (this.solenoid.id === -1) {
            this.service.createSolenoid(this.solenoid)
                .subscribe(function (s) {
                console.log(s);
                _this.solenoid = s;
            }, function (error) { return function () {
                console.log('Something went wrong...');
                _this.toastr.error('Something went wrong...', 'Damn');
            }; }, function () {
                console.log('Success');
                _this.toastr.success('Changes saved');
            });
            return;
        }
        this.service.saveSolenoid(this.solenoid)
            .subscribe(function () { }, function (error) { return function () {
            console.log('Something went wrong...');
            _this.toastr.error('Something went wrong...', 'Damn');
        }; }, function () {
            console.log('Success');
            _this.toastr.success('Changes saved');
        });
    };
    SolenoidComponent.prototype.back = function () {
        this.nav.NavTo("/device/" + this.deviceid + "/config");
    };
    SolenoidComponent.prototype.cancel = function () {
        this.nav.NavTo("/device/" + this.deviceid + "/config");
    };
    SolenoidComponent.prototype.delete = function () {
        var _this = this;
        console.log("Deleting solenoid " + this.solenoid.Name);
        this.service.deleteSolenoid(this.solenoid)
            .subscribe(function () { }, function (error) { return function () {
            console.log('Something went wrong...');
            _this.toastr.error('Something went wrong...', 'Damn');
        }; }, function () {
            console.log('Success');
            //this.toastr.success('Changes saved' );
        });
        this.nav.NavTo("/device/" + this.deviceid + "/config");
    };
    return SolenoidComponent;
}());
SolenoidComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-solenoid',
        template: __webpack_require__("../../../../../src/app/config/solenoid/solenoid.component.html"),
        styles: [__webpack_require__("../../../../../src/app/config/solenoid/solenoid.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__services_IrrigationController_service__["a" /* IrrigationControllerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_IrrigationController_service__["a" /* IrrigationControllerService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__nav_component_nav_component__["a" /* NavComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__nav_component_nav_component__["a" /* NavComponent */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5_ng2_toastr_ng2_toastr__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ng2_toastr_ng2_toastr__["ToastsManager"]) === "function" && _e || Object])
], SolenoidComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=solenoid.component.js.map

/***/ }),

/***/ "../../../../../src/app/config/spi/spi.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/config/spi/spi.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" *ngIf=\"loaded\">\n  <div class=\"col-2\"></div>\n  <div class=\"col-8\">\n    <div *ngIf=\"loaded\">\n        <div class=\"row left\">\n          <button (click)=\"back()\" class=\"btn btn-primary\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Back\">\n              <i class=\"fa fa-angle-left\"></i>\n          </button>\n          <h5>{{getTitle()}}</h5>\n        </div>\n        \n        <div class=\"form-group\">\n          <label for=\"name\">Name</label>\n          <input type=\"text\" class=\"form-control\" id=\"name\" [(ngModel)]=\"spi.Name\" required>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"description\">Clock</label>\n          <input type=\"text\" class=\"form-control\" id=\"clock\" [(ngModel)]=\"spi.Clock\" required>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"hardwareType\">Chip select</label>          \n          <input type=\"text\" class=\"form-control\" id=\"cs\" [(ngModel)]=\"spi.CS\" required>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"address\">MISO (Master In Slave Out)</label>\n          <input type=\"text\" class=\"form-control\" id=\"miso\" [(ngModel)]=\"spi.MISO\" required>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"address\">MOSI (Master Out Slave In)</label>\n          <input type=\"text\" class=\"form-control\" id=\"mosi\" [(ngModel)]=\"spi.MOSI\" required>\n        </div>\n\n        <button class=\"btn btn-success btn-sm\" (click)=\"save()\">Save</button>\n        <button class=\"btn btn-warning btn-sm\" (click)=\"delete()\">Delete</button>\n        <button class=\"btn btn-secondary btn-sm\" (click)=\"cancel()\">Cancel</button>\n\n      </div>  \n  </div>\n  <div class=\"col-2\"></div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/config/spi/spi.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpiComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_spi__ = __webpack_require__("../../../../../src/app/model/spi.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nav_component_nav_component__ = __webpack_require__("../../../../../src/app/nav.component/nav.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_IrrigationController_service__ = __webpack_require__("../../../../../src/app/services/IrrigationController.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_toastr_ng2_toastr__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SpiComponent = (function () {
    function SpiComponent(service, route, nav, vcr, toastr) {
        this.service = service;
        this.route = route;
        this.nav = nav;
        this.toastr = toastr;
        this.id = 0;
        this.deviceid = 0;
        this.loaded = false;
        this.hardwareTypes = ['GPIO', 'Distributed', 'SPI'];
        this.toastr.setRootViewContainerRef(vcr);
    }
    SpiComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            // parse device id
            _this.deviceid = params['deviceid'];
            console.log(params);
            if (Number.isNaN(_this.deviceid)) {
                alert('Missing Device ID');
            }
            // parse spi id
            var id = params['id'];
            if (id === 'new') {
                _this.spi = new __WEBPACK_IMPORTED_MODULE_2__model_spi__["a" /* ISpi */](-1, '', 0, 0, 0, 0, _this.deviceid);
                _this.loaded = true;
            }
            else if (Number.isNaN(id)) {
                alert("Invalid Analog ID " + id);
            }
            else {
                _this.id = id;
                _this.getSpi(_this.id);
            }
        });
    };
    SpiComponent.prototype.getSpi = function (id) {
        var _this = this;
        this.service
            .getSpi(id)
            .subscribe(function (a) {
            _this.spi = a;
            _this.loaded = true;
        }, function (error) { return function () {
            console.log('Something went wrong...');
        }; }, function () {
            console.log('Success');
        });
    };
    SpiComponent.prototype.getTitle = function () {
        if (this.spi == null) {
            return;
        }
        if (this.spi.id === -1) {
            return 'New spi';
        }
        return "Edit spi - " + this.spi.id;
    };
    SpiComponent.prototype.save = function () {
        var _this = this;
        console.log(this.spi);
        if (this.spi.id === -1) {
            this.service.createSpi(this.spi)
                .subscribe(function (s) {
                console.log(s);
                _this.spi = s;
            }, function (error) { return function () {
                console.log('Something went wrong...');
                _this.toastr.error('Something went wrong...', 'Damn');
            }; }, function () {
                console.log('Success');
                _this.toastr.success('Changes saved');
            });
            return;
        }
        this.service.saveSpi(this.spi)
            .subscribe(function () { }, function (error) { return function () {
            console.log('Something went wrong...');
            _this.toastr.error('Something went wrong...', 'Damn');
        }; }, function () {
            console.log('Success');
            _this.toastr.success('Changes saved');
        });
    };
    SpiComponent.prototype.back = function () {
        this.nav.NavTo("/device/" + this.deviceid + "/config");
    };
    SpiComponent.prototype.cancel = function () {
        this.nav.NavTo("/device/" + this.deviceid + "/config");
    };
    SpiComponent.prototype.delete = function () {
        var _this = this;
        console.log("Deleting spi " + this.spi.Name);
        this.service.deleteSpi(this.spi)
            .subscribe(function () { }, function (error) { return function () {
            console.log('Something went wrong...');
            _this.toastr.error('Something went wrong...', 'Damn');
        }; }, function () {
            console.log('Success');
            _this.toastr.success('Changes saved');
        });
    };
    return SpiComponent;
}());
SpiComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-spi',
        template: __webpack_require__("../../../../../src/app/config/spi/spi.component.html"),
        styles: [__webpack_require__("../../../../../src/app/config/spi/spi.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__services_IrrigationController_service__["a" /* IrrigationControllerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_IrrigationController_service__["a" /* IrrigationControllerService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__nav_component_nav_component__["a" /* NavComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__nav_component_nav_component__["a" /* NavComponent */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5_ng2_toastr_ng2_toastr__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ng2_toastr_ng2_toastr__["ToastsManager"]) === "function" && _e || Object])
], SpiComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=spi.component.js.map

/***/ }),

/***/ "../../../../../src/app/device-tools/device-tools.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "ul {\r\n    margin-left:-8px;\r\n}\r\n\r\nli {\r\n    list-style-type: none;\r\n    margin:8px;\r\n    float: left;\r\n    margin-bottom:1rem;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/device-tools/device-tools.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n  <ul class=\"list-unstyled\">\n      <li>\n          <button type=\"button\" class=\"btn\" \n                [ngClass]=\"getActiveClass('status')\"\n                data-toggle=\"tooltip\" data-placement=\"top\" \n                title=\"Device home\" (click)=\"status()\">\n            <i class=\"fa fa-tachometer-alt\"></i>\n            Status\n          </button>\n      </li>    \n      <li>\n        <button type=\"button\" class=\"btn\" \n                [ngClass]=\"getActiveClass('schedules')\"\n                data-toggle=\"tooltip\" \n                data-placement=\"top\" \n                title=\"Schedules\" (click)=\"schedules()\">\n          <i class=\"fa fa-clock\"></i>\n          Schedules\n        </button>\n      </li>\n      <li>\n        <button type=\"button\" class=\"btn\"\n                [ngClass]=\"getActiveClass('config')\" \n                data-toggle=\"tooltip\" \n                data-placement=\"top\" \n                title=\"Settings\" (click)=\"settings()\">\n          <i class=\"fa fa-cog\"></i>\n          Config\n        </button>\n      </li>\n      <li>\n        <button type=\"button\" class=\"btn\"\n                [ngClass]=\"getActiveClass('history')\" \n                data-toggle=\"tooltip\"\n                data-placement=\"top\"\n                title=\"History\"\n                (click)=\"history()\">\n          <i class=\"fab fa-elementor\"></i>    \n          History  \n        </button>\n      </li>\n  </ul>\n</div>"

/***/ }),

/***/ "../../../../../src/app/device-tools/device-tools.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeviceToolsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_IrrigationController_service__ = __webpack_require__("../../../../../src/app/services/IrrigationController.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_device__ = __webpack_require__("../../../../../src/app/model/device.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nav_component_nav_component__ = __webpack_require__("../../../../../src/app/nav.component/nav.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DeviceToolsComponent = (function () {
    function DeviceToolsComponent(service, route, nav) {
        this.service = service;
        this.route = route;
        this.nav = nav;
    }
    DeviceToolsComponent.prototype.ngOnInit = function () {
        this.url = this.route.snapshot.url.join('');
    };
    DeviceToolsComponent.prototype.settings = function () {
        this.nav.NavTo("/device/" + this.device.id + "/config");
    };
    DeviceToolsComponent.prototype.history = function () {
        this.nav.NavTo("/device/" + this.device.id + "/history");
    };
    DeviceToolsComponent.prototype.schedules = function () {
        this.nav.NavTo("/device/" + this.device.id + "/schedules");
    };
    DeviceToolsComponent.prototype.status = function () {
        this.nav.NavTo("/device/" + this.device.id + "/status");
    };
    DeviceToolsComponent.prototype.getActiveClass = function (view) {
        if (this.url.indexOf(view) > 0) {
            return 'btn-primary';
        }
        else {
            return 'btn-secondary';
        }
    };
    return DeviceToolsComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__model_device__["a" /* IDevice */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__model_device__["a" /* IDevice */]) === "function" && _a || Object)
], DeviceToolsComponent.prototype, "device", void 0);
DeviceToolsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-device-tools',
        template: __webpack_require__("../../../../../src/app/device-tools/device-tools.component.html"),
        styles: [__webpack_require__("../../../../../src/app/device-tools/device-tools.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_IrrigationController_service__["a" /* IrrigationControllerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_IrrigationController_service__["a" /* IrrigationControllerService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__nav_component_nav_component__["a" /* NavComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__nav_component_nav_component__["a" /* NavComponent */]) === "function" && _d || Object])
], DeviceToolsComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=device-tools.component.js.map

/***/ }),

/***/ "../../../../../src/app/history/history.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "h4 {float:left;margin-top:5px;}\r\nbutton {float:left;margin:5px;}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/history/history.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!loaded\"></div>\r\n<div class=\"row\" *ngIf=\"loaded\">\r\n    <div class=\"col-2\"></div>\r\n    <div class=\"col-8\">\r\n        <app-device-tools [device]=\"device\"></app-device-tools>\r\n    </div>\r\n    <div class=\"col-2\"></div>\r\n</div>\r\n<div class=\"row\" *ngIf=\"loaded\">\r\n    <div class=\"col-2\"></div>\r\n    <div class=\"col-8\">\r\n        \r\n        <table class=\"table table-striped\">\r\n            <tbody>\r\n            <!--tbody class=\"tr\"-->\r\n                <tr *ngFor=\"let event of events\" class=\"tr\">\r\n                    <td>{{timeFormat(event.createdAt)}} </td>\r\n                    <td>{{this.eventTypes[event.EventType-1]}} </td>\r\n                    <td>{{event.EventValue}} </td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n    <div class=\"col-2\"></div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/history/history.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nav_component_nav_component__ = __webpack_require__("../../../../../src/app/nav.component/nav.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_IrrigationController_service__ = __webpack_require__("../../../../../src/app/services/IrrigationController.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HistoryComponent = (function () {
    function HistoryComponent(dataService, toastr, nav, vcr, route) {
        this.dataService = dataService;
        this.toastr = toastr;
        this.nav = nav;
        this.route = route;
        this.deviceid = 0;
        this.events = [];
        this.loaded = false;
        this.eventTypes = [
            'Application', 'Fault', 'IO', 'Irrigation start', 'Irrigation stop'
        ];
        this.toastr.setRootViewContainerRef(vcr);
    }
    HistoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            _this.deviceid = params['deviceid'];
            if (Number.isNaN(_this.deviceid)) {
                alert('Missing Device ID');
            }
            _this.getDevice(_this.deviceid);
        });
    };
    HistoryComponent.prototype.getEvents = function (id) {
        var _this = this;
        console.log('getEvents()');
        this.dataService
            .getEvents(id)
            .subscribe(function (data) {
            console.log(data.length);
            if (data.length > 0) {
                _this.events = data;
                _this.loaded = true;
            }
        }, function (error) { return function () {
            console.log('Something went wrong...');
        }; }, function () {
            console.log('Success');
            //this._toasterService.pop('success', 'Complete', 'Getting all values complete');
            //this._slimLoadingBarService.complete();
        });
    };
    HistoryComponent.prototype.getDevice = function (id) {
        var _this = this;
        console.log('getDevice()');
        this.dataService
            .getDevice(id)
            .subscribe(function (d) {
            console.log(d);
            _this.device = d;
            _this.getEvents(_this.deviceid);
            _this.loaded = true;
        }, function (error) { return function () {
            console.log('Something went wrong...');
        }; }, function () {
            console.log('Success');
        });
    };
    HistoryComponent.prototype.timeFormat = function (date) {
        return __WEBPACK_IMPORTED_MODULE_2_moment__(date).format("h:mm:ss a");
    };
    HistoryComponent.prototype.getDeviceName = function () {
        if (this.device != null) {
            return this.device.Name;
        }
    };
    HistoryComponent.prototype.getEventType = function (et) {
    };
    HistoryComponent.prototype.backClick = function () {
        this.nav.Back();
    };
    return HistoryComponent;
}());
HistoryComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-history',
        template: __webpack_require__("../../../../../src/app/history/history.component.html"),
        styles: [__webpack_require__("../../../../../src/app/history/history.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__services_IrrigationController_service__["a" /* IrrigationControllerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_IrrigationController_service__["a" /* IrrigationControllerService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr__["ToastsManager"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__nav_component_nav_component__["a" /* NavComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__nav_component_nav_component__["a" /* NavComponent */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _e || Object])
], HistoryComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=history.component.js.map

/***/ }),

/***/ "../../../../../src/app/model/alarm.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IAlarm; });
var IAlarm = (function () {
    function IAlarm(id, Name, Description, HardwareType, Address, Value, DeviceId) {
        this.id = id;
        this.Name = Name;
        this.Description = Description;
        this.HardwareType = HardwareType;
        this.Address = Address;
        this.Value = Value;
        this.DeviceId = DeviceId;
    }
    return IAlarm;
}());

//# sourceMappingURL=alarm.js.map

/***/ }),

/***/ "../../../../../src/app/model/analog.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IAnalog; });
var IAnalog = (function () {
    function IAnalog(id, Name, Description, HardwareType, Address, Multiplier, RawValue, Units, Value, DeviceId) {
        this.id = id;
        this.Name = Name;
        this.Description = Description;
        this.HardwareType = HardwareType;
        this.Address = Address;
        this.Multiplier = Multiplier;
        this.RawValue = RawValue;
        this.Units = Units;
        this.Value = Value;
        this.DeviceId = DeviceId;
    }
    return IAnalog;
}());

//# sourceMappingURL=analog.js.map

/***/ }),

/***/ "../../../../../src/app/model/command.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ICommand; });
var ICommand = (function () {
    function ICommand(Id, CommandType, Params, Issued, Actioned, DeviceId, CreatedAt, UpdatedAt) {
        this.Id = Id;
        this.CommandType = CommandType;
        this.Params = Params;
        this.Issued = Issued;
        this.Actioned = Actioned;
        this.DeviceId = DeviceId;
        this.CreatedAt = CreatedAt;
        this.UpdatedAt = UpdatedAt;
    }
    return ICommand;
}());

//# sourceMappingURL=command.js.map

/***/ }),

/***/ "../../../../../src/app/model/device.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IDevice; });
var IDevice = (function () {
    function IDevice(id, Name, Description, State, Mode, Status, PumpSolenoidId, SoftwareVersion, DeviceMAC, createdAt, updatedAt) {
        this.id = id;
        this.Name = Name;
        this.Description = Description;
        this.State = State;
        this.Mode = Mode;
        this.Status = Status;
        this.PumpSolenoidId = PumpSolenoidId;
        this.SoftwareVersion = SoftwareVersion;
        this.DeviceMAC = DeviceMAC;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    return IDevice;
}());

//# sourceMappingURL=device.js.map

/***/ }),

/***/ "../../../../../src/app/model/solenoid.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ISolenoid; });
var ISolenoid = (function () {
    function ISolenoid(id, Name, Description, HardwareType, Address, Value, RequiresPump, DeviceId) {
        this.id = id;
        this.Name = Name;
        this.Description = Description;
        this.HardwareType = HardwareType;
        this.Address = Address;
        this.Value = Value;
        this.RequiresPump = RequiresPump;
        this.DeviceId = DeviceId;
    }
    return ISolenoid;
}());

//# sourceMappingURL=solenoid.js.map

/***/ }),

/***/ "../../../../../src/app/model/spi.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ISpi; });
var ISpi = (function () {
    function ISpi(id, Name, Clock, CS, MISO, MOSI, DeviceId) {
        this.id = id;
        this.Name = Name;
        this.Clock = Clock;
        this.CS = CS;
        this.MISO = MISO;
        this.MOSI = MOSI;
        this.DeviceId = DeviceId;
    }
    return ISpi;
}());

//# sourceMappingURL=spi.js.map

/***/ }),

/***/ "../../../../../src/app/nav.component/nav.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-md-3\"></div>\r\n    <div class=\"col-md-6\">\r\n        <ul class=\"nav nav-pills\">\r\n            <li role=\"presentation\" [ngClass]=\"getActive('status')\" (click)=\"navTo('status')\"><a>Status</a></li>\r\n            <li role=\"presentation\" [ngClass]=\"getActive('history')\" (click)=\"navTo('history')\"><a>History</a></li>\r\n            <li role=\"presentation\" [ngClass]=\"getActive('schedules')\" (click)=\"navTo('schedules')\"><a>Schedules</a></li>\r\n            <li role=\"presentation\" [ngClass]=\"getActive('diagnostic')\" (click)=\"navTo('diagnostic')\"><a>Diagnostic</a></li>\r\n        </ul>\r\n    </div>\r\n    <div class=\"col-md-3\"></div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/nav.component/nav.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NavComponent = (function () {
    function NavComponent(router, location) {
        this.router = router;
        this.location = location;
    }
    NavComponent.prototype.getActive = function (route) {
        if (this.router.url.indexOf(route) > 0) {
            return 'active';
        }
        return '';
    };
    NavComponent.prototype.NavTo = function (url) {
        this.router.navigate([url]);
    };
    NavComponent.prototype.Back = function () {
        this.location.back();
    };
    return NavComponent;
}());
NavComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'nav-component',
        template: __webpack_require__("../../../../../src/app/nav.component/nav.component.html"),
        styles: ['a:hover{cursor:pointer}']
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common__["Location"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common__["Location"]) === "function" && _b || Object])
], NavComponent);

var _a, _b;
//# sourceMappingURL=nav.component.js.map

/***/ }),

/***/ "../../../../../src/app/schedules/schedules.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/schedules/schedules.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!loaded\"></div>\n<div class=\"row\" *ngIf=\"loaded\">\n    <div class=\"col-2\"></div>\n\n    <div class=\"col-8\">\n        <app-device-tools [device]=\"device\"></app-device-tools>\n    </div>\n    <div class=\"col-2\"></div>\n</div>\n<div class=\"row\" *ngIf=\"loaded\">\n    <div class=\"col-2\"></div>\n    <div class=\"col-8\">\n        <table class=\"solenoids\">\n            <tbody>\n                <tr *ngFor=\"let schedule of schedules\" (click)=\"editSolenoid(solenoid)\">\n                    <td>{{schedule.Name}} </td>\n                    <td>{{schedule.StartDate}} </td>\n                    <td>{{schedule.StartHours}} </td>\n                    <td>{{schedule.StartMins}} </td>\n                    <td>{{schedule.Duration}} </td> \n                    <td>{{schedule.Days}} </td>                    \n                </tr>\n            </tbody>\n        </table>\n        <button type=\"button\" class=\"btn btn-success\" (click)=\"newSolenoid()\">\n            <i class=\"fa fa-plus\"></i>\n        </button>\n        <br>\n    </div>\n    <div class=\"col-2\"></div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/schedules/schedules.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SchedulesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nav_component_nav_component__ = __webpack_require__("../../../../../src/app/nav.component/nav.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_IrrigationController_service__ = __webpack_require__("../../../../../src/app/services/IrrigationController.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SchedulesComponent = (function () {
    function SchedulesComponent(service, route, nav) {
        this.service = service;
        this.route = route;
        this.nav = nav;
        this.loaded = true;
        this.deviceid = 0;
    }
    SchedulesComponent.prototype.ngOnInit = function () {
        var _this = this;
        // extract route params
        this.route.params.subscribe(function (params) {
            _this.deviceid = params['deviceid'];
            if (Number.isNaN(_this.deviceid)) {
                alert('Missing Device ID');
            }
            _this.getDevice(_this.deviceid);
        });
    };
    SchedulesComponent.prototype.getDevice = function (id) {
        var _this = this;
        console.log('getDevice()');
        this.service
            .getDevice(id)
            .subscribe(function (d) {
            console.log(d);
            _this.device = d;
            _this.getSchedules();
            _this.loaded = true;
        }, function (error) { return function () {
            console.log('Something went wrong...');
        }; }, function () {
            console.log('Success');
        });
    };
    SchedulesComponent.prototype.getSchedules = function () {
        var _this = this;
        if (this.device != null) {
            this.service.getSchedules(this.device.id)
                .subscribe(function (data) {
                _this.schedules = data;
                console.log(data);
            });
        }
    };
    return SchedulesComponent;
}());
SchedulesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-schedules',
        template: __webpack_require__("../../../../../src/app/schedules/schedules.component.html"),
        styles: [__webpack_require__("../../../../../src/app/schedules/schedules.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_IrrigationController_service__["a" /* IrrigationControllerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_IrrigationController_service__["a" /* IrrigationControllerService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__nav_component_nav_component__["a" /* NavComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__nav_component_nav_component__["a" /* NavComponent */]) === "function" && _c || Object])
], SchedulesComponent);

var _a, _b, _c;
//# sourceMappingURL=schedules.component.js.map

/***/ }),

/***/ "../../../../../src/app/services/IrrigationController.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IrrigationControllerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// Import RxJs required methods



var IrrigationControllerService = (function () {
    function IrrigationControllerService(http) {
        this.http = http;
        this.restUrl = 'http://delta:8000/api';
        this.eventTypes = [];
    }
    IrrigationControllerService.prototype.getStatus = function () {
        var url = this.restUrl + "/status";
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    IrrigationControllerService.prototype.getDevice = function (id) {
        var url = this.restUrl + "/devices/" + id;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    IrrigationControllerService.prototype.getDevices = function (username) {
        var url = this.restUrl + "/devices";
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    IrrigationControllerService.prototype.getSchedules = function (id) {
        var url = this.restUrl + "/devices/" + id + "/schedules";
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    IrrigationControllerService.prototype.getSolenoids = function (id) {
        var url = this.restUrl + "/devices/" + id + "/solenoids";
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    IrrigationControllerService.prototype.getAlarms = function (id) {
        var url = this.restUrl + "/devices/" + id + "/alarms";
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    IrrigationControllerService.prototype.getAnalogs = function (id) {
        var url = this.restUrl + "/devices/" + id + "/analogs";
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    IrrigationControllerService.prototype.getSpis = function (id) {
        var url = this.restUrl + "/devices/" + id + "/spis";
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    IrrigationControllerService.prototype.getSolenoid = function (id) {
        var url = this.restUrl + "/solenoids/" + id;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    IrrigationControllerService.prototype.getAlarm = function (id) {
        var url = this.restUrl + "/alarms/" + id;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    IrrigationControllerService.prototype.getAnalog = function (id) {
        var url = this.restUrl + "/analogs/" + id;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    IrrigationControllerService.prototype.getSpi = function (id) {
        var url = this.restUrl + "/spis/" + id;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    IrrigationControllerService.prototype.getIrrigationPrograms = function (id) {
        var url = this.restUrl + "/devices/" + id + "/irrigationprograms";
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    IrrigationControllerService.prototype.getActiveProgram = function (id) {
        var url = this.restUrl + "/devices/" + id + "/activeprogram";
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    IrrigationControllerService.prototype.getEvents = function (id) {
        var url = this.restUrl + "/devices/" + id + "/events";
        console.log('IrrigationControllerService.getEvents() ' + this.restUrl);
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    IrrigationControllerService.prototype.getEventTypes = function () {
        var url = this.restUrl + "/eventtypes";
        console.log('IrrigationControllerService.getEventTypes() ' + this.restUrl);
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    IrrigationControllerService.prototype.sendCommand = function (cmd) {
        var url = this.restUrl + "/commands";
        console.log(cmd);
        return this.http.post(url, cmd)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    IrrigationControllerService.prototype.createSolenoid = function (solenoid) {
        var url = this.restUrl + "/solenoids";
        return this.http.post(url, solenoid)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    IrrigationControllerService.prototype.createAlarm = function (alarm) {
        var url = this.restUrl + "/alarms";
        return this.http.post(url, alarm)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    IrrigationControllerService.prototype.createAnalog = function (analog) {
        var url = this.restUrl + "/analogs";
        return this.http.post(url, analog)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    IrrigationControllerService.prototype.createSpi = function (analog) {
        var url = this.restUrl + "/spis";
        return this.http.post(url, analog)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    IrrigationControllerService.prototype.saveSolenoid = function (solenoid) {
        var url = this.restUrl + "/solenoids/" + solenoid.id;
        return this.http.put(url, solenoid)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    IrrigationControllerService.prototype.saveAlarm = function (alarm) {
        console.log(alarm);
        var url = this.restUrl + "/alarms/" + alarm.id;
        return this.http.put(url, alarm)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    IrrigationControllerService.prototype.saveSpi = function (spi) {
        console.log(spi);
        var url = this.restUrl + "/spis/" + spi.id;
        return this.http.put(url, spi)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    IrrigationControllerService.prototype.saveAnalog = function (analog) {
        console.log(analog);
        var url = this.restUrl + "/analogs/" + analog.id;
        return this.http.put(url, analog)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    IrrigationControllerService.prototype.deleteSolenoid = function (solenoid) {
        var url = this.restUrl + "/solenoids/" + solenoid.id;
        return this.http.delete(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    IrrigationControllerService.prototype.deleteAlarm = function (alarm) {
        var url = this.restUrl + "/alarms/" + alarm.id;
        return this.http.delete(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    IrrigationControllerService.prototype.deleteAnalog = function (analog) {
        var url = this.restUrl + "/alarms/" + analog.id;
        return this.http.delete(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    IrrigationControllerService.prototype.deleteSpi = function (analog) {
        var url = this.restUrl + "/spis/" + analog.id;
        return this.http.delete(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    return IrrigationControllerService;
}());
IrrigationControllerService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === "function" && _a || Object])
], IrrigationControllerService);

var _a;
//# sourceMappingURL=IrrigationController.service.js.map

/***/ }),

/***/ "../../../../../src/app/status/status.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/status/status.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!loaded\">Loading...</div>\n<div class=\"row\" *ngIf=\"loaded\">\n    <div class=\"col-2\"></div>\n    <div class=\"col-8\">\n      <app-device-tools [device]=\"device\"></app-device-tools>\n    </div>\n    <div class=\"col-2\"></div>\n</div>\n\n<div class=\"row\" *ngIf=\"loaded\">\n    <div class=\"col-2\"></div>\n    <div class=\"col-8\">        \n        <div [ngClass]=\"getStatusClass()\">\n            <div class=\"panel-title\">\n                {{device.Status}}\n            </div>\n            <div class=\"panel-content\" *ngIf=\"getDuration() > 0\">\n                \n                <div class=\"progress\" style=\"margin-left:0px;margin-right:0px;\">\n                    <div class=\"progress-bar bg-success progress-bar-striped\" role=\"progressbar\" \n                        attr.aria-valuenow=\"percentComplete\" attr.aria-valuemin=\"0\" attr.aria-valuemax=\"100\" style=\"min-width:2em;\" [style.width]=\"percentComplete+'%'\" >\n                        {{percentComplete}}%\n                    </div>\n                </div>\n                    \n                <div class=\"row\">\n                    <div class=\"col-6\">\n                        Start: {{getStartTime()}}\n                    </div>\n                    <div class=\"col-6\">\n                        End: {{getEnd()}}\n                    </div>\n                </div>\n            </div>\n        </div>             \n    </div>\n    <div class=\"col-2\"></div>\n</div>\n<div class=\"row\">\n    <div class=\"col-2\"></div>\n    <div class=\"col-4\">\n        <div class=\"alert alert-primary\">\n            <div class=\"panel-heading\">\n                <div class=\"panel-title\">\n                    Pressure: {{getPressure()}}\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"col-4\">\n        <div class=\"alert alert-primary\">\n            <div class=\"panel-heading\">\n                <div class=\"panel-title\">\n                    {{getLastUpdated()}}                    \n                </div>\n            </div>\n        </div>\n    </div>                              \n    <div class=\"col-2\"></div>\n</div>\n<div class=\"row\">\n    <div class=\"col-2\"></div>\n    <div class=\"col-4\">    \n        <div class=\"input-group input-group-lg\">\n            <div class=\"input-group-prepend\">\n                <div class=\"input-group-text\">Station</div>\n            </div>            \n            <select id=\"selStation\" class=\"form-control\" [(ngModel)]=\"manualStation\" required>\n                <option *ngFor=\"let solenoid of solenoids\" [value]=\"solenoid.id\">\n                    {{solenoid.Name}}\n                </option>       \n            </select>          \n        </div> \n    </div>\n    <div class=\"col-4\">    \n        <div class=\"input-group input-group-lg\">       \n            <div class=\"input-group-prepend\">\n                <div class=\"input-group-text\" >Duration</div>\n            </div>\n            <select id=\"tbDuration\" class=\"form-control\" [(ngModel)]=\"manualDuration\" required>\n                <option value=\"5\">5 minutes</option>\n                <option value=\"30\">30 minutes</option>\n                <option value=\"45\">45 minutes</option>\n                <option value=\"60\">1 hour</option>\n                <option value=\"120\">2 hours</option>\n                <option value=\"150\">2.5 hours</option>\n                <option value=\"180\">3 hours</option>\n                <option value=\"210\">3.5 hours</option>               \n                <option value=\"240\">4 hours</option>\n                <option value=\"270\">4.5 hours</option>\n                <option value=\"300\">5 hours</option>\n                <option value=\"330\">5.5 hours</option>               \n                <option value=\"360\">6 hours</option>               \n            </select>\n\n            <!--input type=\"number\" class=\"form-control\" id=\"tbDuration\" aria-describedby=\"addon1\" placeholder=\"1 - 360\" ng-model=\"ManualDuration\" min=\"1\" max=\"360\" required> </input-->\n        </div>\n    </div>\n    <div class=\"col-2\"></div>              \n</div>\n<div class=\"row\">\n    <div class=\"col-2\"></div>\n    <div class=\"col-8\">          \n        <button type=\"button\" class=\"btn btn-success btn-lg\" (click)=\"manualStart()\">Start</button>\n        <button type=\"button\" class=\"btn btn-danger btn-lg\" (click)=\"manualStop()\">Stop</button>               \n        <p class=\"bg-danger\">{{errorMessage}}</p>    \n    </div>\n    <div class=\"col-2\"></div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/status/status.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatusComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_IrrigationController_service__ = __webpack_require__("../../../../../src/app/services/IrrigationController.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_command__ = __webpack_require__("../../../../../src/app/model/command.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var StatusComponent = (function () {
    function StatusComponent(dataService, toastr, vcr, route) {
        this.dataService = dataService;
        this.toastr = toastr;
        this.route = route;
        this.deviceid = 2;
        this.ticks = 0;
        this.manualStation = 1;
        this.manualDuration = 5;
        this.elapsed = 0;
        this.duration = 0;
        this.percentComplete = 0;
        this.loaded = false;
        this.irrigating = false;
        this.dateFormat = 'YYYY-MM-DD HH:mm:ss';
        this.toastr.setRootViewContainerRef(vcr);
    }
    StatusComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            _this.deviceid = 2; //params['deviceid'];
            if (Number.isNaN(_this.deviceid)) {
                alert('Missing Device ID');
            }
            _this.getSolenoids(_this.deviceid);
            var timer = __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].timer(0, 5000);
            timer.subscribe(function (t) {
                _this.onTick(t);
            });
        });
    };
    StatusComponent.prototype.onTick = function (t) {
        this.getData(this.deviceid);
        this.ticks = t;
    };
    StatusComponent.prototype.getData = function (id) {
        this.getDevice(id);
        this.getActiveProgram(id);
    };
    StatusComponent.prototype.getDevice = function (id) {
        var _this = this;
        console.log('getDevice()');
        this.dataService
            .getDevice(id)
            .subscribe(function (d) {
            console.log(d);
            _this.device = d;
            _this.loaded = true;
        }, function (error) { return function () {
            console.log('Something went wrong...');
        }; }, function () {
            console.log('Success');
            //this._toasterService.pop('success', 'Complete', 'Getting all values complete');
            //this._slimLoadingBarService.complete();
        });
    };
    StatusComponent.prototype.getSolenoids = function (id) {
        var _this = this;
        console.log('getSolenoids()');
        this.dataService
            .getSolenoids(id)
            .subscribe(function (s) {
            _this.solenoids = s;
            //this.loaded = true;
        }, function (error) { return function () {
            console.log('Something went wrong...');
            //this._toasterService.pop('error', 'Damn', 'Something went wrong...');
        }; }, function () {
            console.log('Success');
            // this._toasterService.pop('success', 'Complete', 'Getting all values complete');
            // this._slimLoadingBarService.complete();
        });
    };
    StatusComponent.prototype.getActiveProgram = function (id) {
        var _this = this;
        console.log('getActiveProgram()');
        this.dataService
            .getActiveProgram(id)
            .subscribe(function (p) {
            console.log(p);
            var finished = __WEBPACK_IMPORTED_MODULE_3_moment__["utc"](p.Finished);
            if (__WEBPACK_IMPORTED_MODULE_3_moment__["utc"]().isAfter(finished)) {
                // this program is finished
                _this.activeProgram = null;
                _this.irrigating = false;
                return;
            }
            var now = __WEBPACK_IMPORTED_MODULE_3_moment__["utc"]();
            var start = __WEBPACK_IMPORTED_MODULE_3_moment__["utc"](p.Start);
            var fin = __WEBPACK_IMPORTED_MODULE_3_moment__["utc"](p.Start);
            fin.add(p.Duration, 'minutes');
            _this.elapsed = now.diff(start);
            _this.duration = p.Duration * 60 * 1000;
            _this.percentComplete = Math.ceil(_this.elapsed / _this.duration * 100);
            if (__WEBPACK_IMPORTED_MODULE_3_moment__["utc"]().isBefore(fin)) {
                _this.activeProgram = p;
                _this.irrigating = true;
            }
        }, function (error) { return function () {
            console.log('Something went wrong...');
        }; }, function () {
            console.log('Success');
        });
    };
    StatusComponent.prototype.getStatus = function () {
        var _this = this;
        console.log('getStatus()');
        this.dataService
            .getStatus()
            .subscribe(function (data) {
            console.log(data.length);
            if (data.length > 0) {
                _this.status = data[0];
                _this.loaded = true;
            }
        }, function (error) { return function () {
            console.log('Something went wrong...');
        }; }, function () {
            console.log('Success');
        });
    };
    StatusComponent.prototype.isLoaded = function () {
        return this.loaded;
    };
    StatusComponent.prototype.getDuration = function () {
        if (this.activeProgram != null) {
            return this.activeProgram.Duration;
        }
        return 0;
    };
    StatusComponent.prototype.getStatusClass = function () {
        if (this.device == null) {
            return;
        }
        if (this.device.State.indexOf("Irrigating") > -1) {
            return "alert alert-success";
        }
        if (this.device.State.indexOf("Fault") > -1) {
            return "alert alert-danger";
        }
        return "alert alert-secondary";
    };
    StatusComponent.prototype.formatDateShort = function (date) {
        return __WEBPACK_IMPORTED_MODULE_3_moment__(date).format("dd/MM/yyyy");
    };
    StatusComponent.prototype.getState = function () {
        if (this.status != null) {
            return this.status.state;
        }
        return '';
    };
    StatusComponent.prototype.getStartTime = function () {
        if (this.activeProgram != null) {
            return __WEBPACK_IMPORTED_MODULE_3_moment__(this.activeProgram.Start).format("DD MMM YYYY HH:mm");
        }
        return '';
    };
    StatusComponent.prototype.getEnd = function () {
        if (this.activeProgram != null) {
            return __WEBPACK_IMPORTED_MODULE_3_moment__(this.activeProgram.Start).add(this.activeProgram.Duration, 'minutes').format("DD MMM YYYY HH:mm");
        }
        return '';
    };
    StatusComponent.prototype.getDeviceTitle = function () {
        if (this.device != null) {
            return this.device.Name;
        }
    };
    StatusComponent.prototype.getPressure = function () {
        if (this.device != null) {
            return '?? kPa';
            //return `${this.device.Pressure} kPa`;
        }
        return '';
    };
    StatusComponent.prototype.getLastUpdated = function () {
        if (this.device != null) {
            return __WEBPACK_IMPORTED_MODULE_3_moment__(this.device.updatedAt).format("DD MMM YYYY HH:mm");
        }
        return '';
    };
    StatusComponent.prototype.manualStop = function () {
        var cmd = new __WEBPACK_IMPORTED_MODULE_6__model_command__["a" /* ICommand */](0, //id
        'Stop', //commandtype
        '', //params
        new Date, //issued
        null, //actioned
        this.deviceid, //deviceId
        new Date, //createdAt
        null //updatedAt
        );
        this.sendCommand(cmd);
    };
    StatusComponent.prototype.manualStart = function () {
        if (this.manualStation != null && this.manualDuration != null) {
            var cmd = new __WEBPACK_IMPORTED_MODULE_6__model_command__["a" /* ICommand */](0, //id
            'Manual', //commandType
            this.manualStation + ", " + this.manualDuration, new Date, //issued
            null, //actioned
            this.deviceid, //deviceId
            new Date, //createdAt
            null //updatedAt
            );
            this.sendCommand(cmd);
        }
    };
    StatusComponent.prototype.sendCommand = function (cmd) {
        var _this = this;
        this.dataService.sendCommand(cmd)
            .subscribe(function () { }, function (error) { return function () {
            console.log('Something went wrong...');
            _this.toastr.error('Something went wrong...', 'Damn');
        }; }, function () {
            console.log('Success');
            _this.toastr.success('Command sent');
        });
    };
    return StatusComponent;
}());
StatusComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-status',
        template: __webpack_require__("../../../../../src/app/status/status.component.html"),
        styles: [__webpack_require__("../../../../../src/app/status/status.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__services_IrrigationController_service__["a" /* IrrigationControllerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_IrrigationController_service__["a" /* IrrigationControllerService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__["ToastsManager"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _d || Object])
], StatusComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=status.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../../../moment/locale/af.js",
	"./af.js": "../../../../moment/locale/af.js",
	"./ar": "../../../../moment/locale/ar.js",
	"./ar-dz": "../../../../moment/locale/ar-dz.js",
	"./ar-dz.js": "../../../../moment/locale/ar-dz.js",
	"./ar-kw": "../../../../moment/locale/ar-kw.js",
	"./ar-kw.js": "../../../../moment/locale/ar-kw.js",
	"./ar-ly": "../../../../moment/locale/ar-ly.js",
	"./ar-ly.js": "../../../../moment/locale/ar-ly.js",
	"./ar-ma": "../../../../moment/locale/ar-ma.js",
	"./ar-ma.js": "../../../../moment/locale/ar-ma.js",
	"./ar-sa": "../../../../moment/locale/ar-sa.js",
	"./ar-sa.js": "../../../../moment/locale/ar-sa.js",
	"./ar-tn": "../../../../moment/locale/ar-tn.js",
	"./ar-tn.js": "../../../../moment/locale/ar-tn.js",
	"./ar.js": "../../../../moment/locale/ar.js",
	"./az": "../../../../moment/locale/az.js",
	"./az.js": "../../../../moment/locale/az.js",
	"./be": "../../../../moment/locale/be.js",
	"./be.js": "../../../../moment/locale/be.js",
	"./bg": "../../../../moment/locale/bg.js",
	"./bg.js": "../../../../moment/locale/bg.js",
	"./bm": "../../../../moment/locale/bm.js",
	"./bm.js": "../../../../moment/locale/bm.js",
	"./bn": "../../../../moment/locale/bn.js",
	"./bn.js": "../../../../moment/locale/bn.js",
	"./bo": "../../../../moment/locale/bo.js",
	"./bo.js": "../../../../moment/locale/bo.js",
	"./br": "../../../../moment/locale/br.js",
	"./br.js": "../../../../moment/locale/br.js",
	"./bs": "../../../../moment/locale/bs.js",
	"./bs.js": "../../../../moment/locale/bs.js",
	"./ca": "../../../../moment/locale/ca.js",
	"./ca.js": "../../../../moment/locale/ca.js",
	"./cs": "../../../../moment/locale/cs.js",
	"./cs.js": "../../../../moment/locale/cs.js",
	"./cv": "../../../../moment/locale/cv.js",
	"./cv.js": "../../../../moment/locale/cv.js",
	"./cy": "../../../../moment/locale/cy.js",
	"./cy.js": "../../../../moment/locale/cy.js",
	"./da": "../../../../moment/locale/da.js",
	"./da.js": "../../../../moment/locale/da.js",
	"./de": "../../../../moment/locale/de.js",
	"./de-at": "../../../../moment/locale/de-at.js",
	"./de-at.js": "../../../../moment/locale/de-at.js",
	"./de-ch": "../../../../moment/locale/de-ch.js",
	"./de-ch.js": "../../../../moment/locale/de-ch.js",
	"./de.js": "../../../../moment/locale/de.js",
	"./dv": "../../../../moment/locale/dv.js",
	"./dv.js": "../../../../moment/locale/dv.js",
	"./el": "../../../../moment/locale/el.js",
	"./el.js": "../../../../moment/locale/el.js",
	"./en-au": "../../../../moment/locale/en-au.js",
	"./en-au.js": "../../../../moment/locale/en-au.js",
	"./en-ca": "../../../../moment/locale/en-ca.js",
	"./en-ca.js": "../../../../moment/locale/en-ca.js",
	"./en-gb": "../../../../moment/locale/en-gb.js",
	"./en-gb.js": "../../../../moment/locale/en-gb.js",
	"./en-ie": "../../../../moment/locale/en-ie.js",
	"./en-ie.js": "../../../../moment/locale/en-ie.js",
	"./en-nz": "../../../../moment/locale/en-nz.js",
	"./en-nz.js": "../../../../moment/locale/en-nz.js",
	"./eo": "../../../../moment/locale/eo.js",
	"./eo.js": "../../../../moment/locale/eo.js",
	"./es": "../../../../moment/locale/es.js",
	"./es-do": "../../../../moment/locale/es-do.js",
	"./es-do.js": "../../../../moment/locale/es-do.js",
	"./es-us": "../../../../moment/locale/es-us.js",
	"./es-us.js": "../../../../moment/locale/es-us.js",
	"./es.js": "../../../../moment/locale/es.js",
	"./et": "../../../../moment/locale/et.js",
	"./et.js": "../../../../moment/locale/et.js",
	"./eu": "../../../../moment/locale/eu.js",
	"./eu.js": "../../../../moment/locale/eu.js",
	"./fa": "../../../../moment/locale/fa.js",
	"./fa.js": "../../../../moment/locale/fa.js",
	"./fi": "../../../../moment/locale/fi.js",
	"./fi.js": "../../../../moment/locale/fi.js",
	"./fo": "../../../../moment/locale/fo.js",
	"./fo.js": "../../../../moment/locale/fo.js",
	"./fr": "../../../../moment/locale/fr.js",
	"./fr-ca": "../../../../moment/locale/fr-ca.js",
	"./fr-ca.js": "../../../../moment/locale/fr-ca.js",
	"./fr-ch": "../../../../moment/locale/fr-ch.js",
	"./fr-ch.js": "../../../../moment/locale/fr-ch.js",
	"./fr.js": "../../../../moment/locale/fr.js",
	"./fy": "../../../../moment/locale/fy.js",
	"./fy.js": "../../../../moment/locale/fy.js",
	"./gd": "../../../../moment/locale/gd.js",
	"./gd.js": "../../../../moment/locale/gd.js",
	"./gl": "../../../../moment/locale/gl.js",
	"./gl.js": "../../../../moment/locale/gl.js",
	"./gom-latn": "../../../../moment/locale/gom-latn.js",
	"./gom-latn.js": "../../../../moment/locale/gom-latn.js",
	"./gu": "../../../../moment/locale/gu.js",
	"./gu.js": "../../../../moment/locale/gu.js",
	"./he": "../../../../moment/locale/he.js",
	"./he.js": "../../../../moment/locale/he.js",
	"./hi": "../../../../moment/locale/hi.js",
	"./hi.js": "../../../../moment/locale/hi.js",
	"./hr": "../../../../moment/locale/hr.js",
	"./hr.js": "../../../../moment/locale/hr.js",
	"./hu": "../../../../moment/locale/hu.js",
	"./hu.js": "../../../../moment/locale/hu.js",
	"./hy-am": "../../../../moment/locale/hy-am.js",
	"./hy-am.js": "../../../../moment/locale/hy-am.js",
	"./id": "../../../../moment/locale/id.js",
	"./id.js": "../../../../moment/locale/id.js",
	"./is": "../../../../moment/locale/is.js",
	"./is.js": "../../../../moment/locale/is.js",
	"./it": "../../../../moment/locale/it.js",
	"./it.js": "../../../../moment/locale/it.js",
	"./ja": "../../../../moment/locale/ja.js",
	"./ja.js": "../../../../moment/locale/ja.js",
	"./jv": "../../../../moment/locale/jv.js",
	"./jv.js": "../../../../moment/locale/jv.js",
	"./ka": "../../../../moment/locale/ka.js",
	"./ka.js": "../../../../moment/locale/ka.js",
	"./kk": "../../../../moment/locale/kk.js",
	"./kk.js": "../../../../moment/locale/kk.js",
	"./km": "../../../../moment/locale/km.js",
	"./km.js": "../../../../moment/locale/km.js",
	"./kn": "../../../../moment/locale/kn.js",
	"./kn.js": "../../../../moment/locale/kn.js",
	"./ko": "../../../../moment/locale/ko.js",
	"./ko.js": "../../../../moment/locale/ko.js",
	"./ky": "../../../../moment/locale/ky.js",
	"./ky.js": "../../../../moment/locale/ky.js",
	"./lb": "../../../../moment/locale/lb.js",
	"./lb.js": "../../../../moment/locale/lb.js",
	"./lo": "../../../../moment/locale/lo.js",
	"./lo.js": "../../../../moment/locale/lo.js",
	"./lt": "../../../../moment/locale/lt.js",
	"./lt.js": "../../../../moment/locale/lt.js",
	"./lv": "../../../../moment/locale/lv.js",
	"./lv.js": "../../../../moment/locale/lv.js",
	"./me": "../../../../moment/locale/me.js",
	"./me.js": "../../../../moment/locale/me.js",
	"./mi": "../../../../moment/locale/mi.js",
	"./mi.js": "../../../../moment/locale/mi.js",
	"./mk": "../../../../moment/locale/mk.js",
	"./mk.js": "../../../../moment/locale/mk.js",
	"./ml": "../../../../moment/locale/ml.js",
	"./ml.js": "../../../../moment/locale/ml.js",
	"./mr": "../../../../moment/locale/mr.js",
	"./mr.js": "../../../../moment/locale/mr.js",
	"./ms": "../../../../moment/locale/ms.js",
	"./ms-my": "../../../../moment/locale/ms-my.js",
	"./ms-my.js": "../../../../moment/locale/ms-my.js",
	"./ms.js": "../../../../moment/locale/ms.js",
	"./my": "../../../../moment/locale/my.js",
	"./my.js": "../../../../moment/locale/my.js",
	"./nb": "../../../../moment/locale/nb.js",
	"./nb.js": "../../../../moment/locale/nb.js",
	"./ne": "../../../../moment/locale/ne.js",
	"./ne.js": "../../../../moment/locale/ne.js",
	"./nl": "../../../../moment/locale/nl.js",
	"./nl-be": "../../../../moment/locale/nl-be.js",
	"./nl-be.js": "../../../../moment/locale/nl-be.js",
	"./nl.js": "../../../../moment/locale/nl.js",
	"./nn": "../../../../moment/locale/nn.js",
	"./nn.js": "../../../../moment/locale/nn.js",
	"./pa-in": "../../../../moment/locale/pa-in.js",
	"./pa-in.js": "../../../../moment/locale/pa-in.js",
	"./pl": "../../../../moment/locale/pl.js",
	"./pl.js": "../../../../moment/locale/pl.js",
	"./pt": "../../../../moment/locale/pt.js",
	"./pt-br": "../../../../moment/locale/pt-br.js",
	"./pt-br.js": "../../../../moment/locale/pt-br.js",
	"./pt.js": "../../../../moment/locale/pt.js",
	"./ro": "../../../../moment/locale/ro.js",
	"./ro.js": "../../../../moment/locale/ro.js",
	"./ru": "../../../../moment/locale/ru.js",
	"./ru.js": "../../../../moment/locale/ru.js",
	"./sd": "../../../../moment/locale/sd.js",
	"./sd.js": "../../../../moment/locale/sd.js",
	"./se": "../../../../moment/locale/se.js",
	"./se.js": "../../../../moment/locale/se.js",
	"./si": "../../../../moment/locale/si.js",
	"./si.js": "../../../../moment/locale/si.js",
	"./sk": "../../../../moment/locale/sk.js",
	"./sk.js": "../../../../moment/locale/sk.js",
	"./sl": "../../../../moment/locale/sl.js",
	"./sl.js": "../../../../moment/locale/sl.js",
	"./sq": "../../../../moment/locale/sq.js",
	"./sq.js": "../../../../moment/locale/sq.js",
	"./sr": "../../../../moment/locale/sr.js",
	"./sr-cyrl": "../../../../moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../../../moment/locale/sr-cyrl.js",
	"./sr.js": "../../../../moment/locale/sr.js",
	"./ss": "../../../../moment/locale/ss.js",
	"./ss.js": "../../../../moment/locale/ss.js",
	"./sv": "../../../../moment/locale/sv.js",
	"./sv.js": "../../../../moment/locale/sv.js",
	"./sw": "../../../../moment/locale/sw.js",
	"./sw.js": "../../../../moment/locale/sw.js",
	"./ta": "../../../../moment/locale/ta.js",
	"./ta.js": "../../../../moment/locale/ta.js",
	"./te": "../../../../moment/locale/te.js",
	"./te.js": "../../../../moment/locale/te.js",
	"./tet": "../../../../moment/locale/tet.js",
	"./tet.js": "../../../../moment/locale/tet.js",
	"./th": "../../../../moment/locale/th.js",
	"./th.js": "../../../../moment/locale/th.js",
	"./tl-ph": "../../../../moment/locale/tl-ph.js",
	"./tl-ph.js": "../../../../moment/locale/tl-ph.js",
	"./tlh": "../../../../moment/locale/tlh.js",
	"./tlh.js": "../../../../moment/locale/tlh.js",
	"./tr": "../../../../moment/locale/tr.js",
	"./tr.js": "../../../../moment/locale/tr.js",
	"./tzl": "../../../../moment/locale/tzl.js",
	"./tzl.js": "../../../../moment/locale/tzl.js",
	"./tzm": "../../../../moment/locale/tzm.js",
	"./tzm-latn": "../../../../moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../../../moment/locale/tzm-latn.js",
	"./tzm.js": "../../../../moment/locale/tzm.js",
	"./uk": "../../../../moment/locale/uk.js",
	"./uk.js": "../../../../moment/locale/uk.js",
	"./ur": "../../../../moment/locale/ur.js",
	"./ur.js": "../../../../moment/locale/ur.js",
	"./uz": "../../../../moment/locale/uz.js",
	"./uz-latn": "../../../../moment/locale/uz-latn.js",
	"./uz-latn.js": "../../../../moment/locale/uz-latn.js",
	"./uz.js": "../../../../moment/locale/uz.js",
	"./vi": "../../../../moment/locale/vi.js",
	"./vi.js": "../../../../moment/locale/vi.js",
	"./x-pseudo": "../../../../moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../../../moment/locale/x-pseudo.js",
	"./yo": "../../../../moment/locale/yo.js",
	"./yo.js": "../../../../moment/locale/yo.js",
	"./zh-cn": "../../../../moment/locale/zh-cn.js",
	"./zh-cn.js": "../../../../moment/locale/zh-cn.js",
	"./zh-hk": "../../../../moment/locale/zh-hk.js",
	"./zh-hk.js": "../../../../moment/locale/zh-hk.js",
	"./zh-tw": "../../../../moment/locale/zh-tw.js",
	"./zh-tw.js": "../../../../moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map