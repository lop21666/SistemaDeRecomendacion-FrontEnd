import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:3000';
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

    return this.http.post(this.url + '/register', body,{headers});
  }

}
