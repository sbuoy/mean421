import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
//import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  registerUser(user){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
        .pipe(map(res => res.json()));//map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
      .pipe(map(res => res.json()));
  }

  getProfile(){
    this.loadToken();
    let headers = new Headers();//{
    //   'Authorization': this.authToken,
    //   'Content-Type': 'application/json'
    // });
    // return this.http.get('http://localhost:3000/users/profile', {headers: headers})
    //   .pipe(map(res => res.json()));
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
      .pipe(map(res => res.json()));
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired('id_token');
    // if(localStorage.id_token == undefined) {
    //   console.log('Hello');
    //   return true;
    // } else {
    //   console.log('Goodbye');
    //   const helper = new JwtHelperService();
    //   console.log(helper.isTokenExpired('id_token'));//tokenNotExpired('id_token'));//localStorage.id_token));
    //   return !helper.isTokenExpired('id_token'));//tokenNotExpired('id_token'));//localStorage.id_token);
    // }
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
