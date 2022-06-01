import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  data = null;
  datosUsuario;

  constructor( private http: HttpClient) { }

  login<T>( usu, password){

  }

}
