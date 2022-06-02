import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/services/user.service';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  datosUsuario =  null;
  datosPerfil;
  allowEdit = false;
  edad;
  genero;
  pass;

  constructor(private userService: UserService, private storage: Storage, private navCtrl: NavController) { }

  async ngOnInit() {
    this.datosUsuario = await this.storage.get('datos');
    const email = await this.datosUsuario.mail;
    const params = await {
      mail: email
    };
    await this.userService.getPerfil(params).subscribe((resp: any)=>{
      this.datosPerfil = resp;
    });
    this.edad = await this.datosPerfil.age.low;
    this.genero = await this.datosPerfil.gender;
    this.pass = await this.datosPerfil.password;
  }

  edit(){
    this.allowEdit = true;
  }

  back(){
    this.navCtrl.back({animated: true});
  }

  select(ev){
    this.genero = ev.detail.value;
    console.log(ev.detail.value);
  }

  async aceptar(){
    const email = await this.datosUsuario.mail;
    const params = await {
      mail: email,
      password: this.pass,
      age: this.edad,
      gender: this.genero,
      currentMail: email
    };

    this.allowEdit = false;

    this.userService.updateUser(params).subscribe((resp: any)=>{
      console.log(resp);
    });

  }

}
