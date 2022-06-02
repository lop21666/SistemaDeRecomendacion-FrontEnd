import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://192.168.1.20:3000';
  data = null;
  datosUsuario;

  constructor( private http: HttpClient) { }

  login<T>(params){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(params);
    console.log(body);

    return this.http.post(this.url + '/login', body,{headers});
  }

  register<T>(params){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(params);
    console.log(body);

    return this.http.post(this.url + '/createUser', body,{headers});
  }

  getPerfil<T>(params){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(params);
    console.log(body);

    return this.http.post(this.url + '/profile', body,{headers});
  }

  updateUser<T>(params){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(params);
    console.log(body);

    return this.http.post(this.url + '/updateUser', body,{headers});
  }

}
