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
  allowEdit = true;
  edad;
  genero;
  pass;
  email = null;
  viewEntered = false;

  constructor(private userService: UserService, private storage: Storage, private navCtrl: NavController) { }

  async ionViewWillEnter(){
    await this.storage.create();
    this.datosUsuario = await this.storage.get('datos');
    this.email = await this.datosUsuario.mail;
    console.log(this.datosUsuario);
  }

  async ngOnInit() {
    setTimeout(async () => {
      const params = await {
        mail: this.email
      };
      await this.userService.getPerfil(params).subscribe(async (resp: any)=>{
        this.datosPerfil = await resp;
        this.edad = await this.datosPerfil.age.low;
        this.genero = await this.datosPerfil.gender;
        this.pass = await this.datosPerfil.password;
      });
    }, 1000);

    setTimeout(() => {
      this.viewEntered = true;
    }, 2000);
  }


  edit(){
    this.allowEdit = false;
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

    this.allowEdit = true;

    this.userService.updateUser(params).subscribe((resp: any)=>{
      console.log(resp);
    });

  }

}
