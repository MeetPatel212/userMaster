import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';
import {environment} from '../../environments/environment';
@Injectable()
export class UserService {
    serviceUrl=environment.url;
    constructor(private http: HttpClient,private https:HttpClient) {
    }

    register(user: User) {
        //debugger;
        console.log('UserData:-...............',user);
        return this.http.post(this.serviceUrl+'/user/register', user);
    }

    login(email: string, password: string) {
        return this.https.post(this.serviceUrl+'/user/signin', { email: email, password: password })
    }

    updateUser(user: User){ 
        debugger;
        return this.http.post(this.serviceUrl+'/user/updateUser', user)
    }

}