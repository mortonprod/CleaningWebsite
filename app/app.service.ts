import { Injectable,OnInit } from '@angular/core';
import { HmrState } from 'angular2-hmr';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired } from 'angular2-jwt';
///TODO:Must use conEmu to git command is available
import { Auth0Lock } from 'auth0-lock';
import 'rxjs/add/operator/catch';
@Injectable()
export class facebookService implements OnInit {
    constructor() {
        //window.fbAsyncInit = function () {
        //    FB.init({
        //        appId: '708591339292640',
        //        xfbml: true,
        //        version: 'v2.7'
        //    });
        //};

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        } (document, 'script', 'facebook-jssdk'));
    }
    ngOnInit() { }
}

export class job {
    constructor(public name: string, public date: string, public timeStart: string, public timeEnd: string) { }
}

@Injectable()
export class jobsService {
    constructor(private http: Http) { }
    ///TODO:IMPORTANT THAT THE JSON FILE FOLLOWS THE CORRECT FORMAT
    private jobsUrl = '../assets/mock-data/jobs.json'; 
    getJobs(): Observable<job[]> {
        return this.http.get(this.jobsUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    ///TODO: This function will change from json form to javascript object?
    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}

//declare var Auth0Lock: any;
@Injectable()
export class authService {
    // Configure Auth0
    lock = new Auth0Lock('CxGeOInKAPUJpvxuKsfEyGAlNNeXGSgh', 'mortonprod.eu.auth0.com', {});

    constructor() {
        // Add callback for lock `authenticated` event
        this.lock.on("authenticated", (authResult) => {
            localStorage.setItem('id_token', authResult.idToken);
        });
    }

    public login() {
        // Call the show method to display the widget.
        this.lock.show();
    };

    public authenticated() {
        // Check if there's an unexpired JWT
        // This searches for an item in localStorage with key == 'id_token'
        return tokenNotExpired();
    };

    public logout() {
        // Remove token from localStorage
        localStorage.removeItem('id_token');
    };
}


@Injectable()
export class AppState {
    // @HmrState() is used by HMR to track the state of any object during HMR (hot module replacement)
    @HmrState() _state = {};

    constructor() {

    }

    // already return a clone of the current state
    get state() {
        return this._state = this._clone(this._state);
    }
    // never allow mutation
    set state(value) {
        throw new Error('do not mutate the `.state` directly');
    }


    get(prop?: any) {
        // use our state getter for the clone
        const state = this.state;
        return state.hasOwnProperty(prop) ? state[prop] : state;
    }

    set(prop: string, value: any) {
        // internally mutate our state
        return this._state[prop] = value;
    }


    _clone(object) {
        // simple object clone
        return JSON.parse(JSON.stringify(object));
    }
}
