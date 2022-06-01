import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { UserService } from '../services/services/user.service';
import { AlertService } from '../services/services/alert.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  user = '';
  pass = '';
  mail = '';
  last = '';
  edad = '';
  gender = '';


  constructor(private navCtrl: NavController, private userService: UserService, public loadingController: LoadingController,
              private alertService: AlertService, private storage: Storage) {
  }

  ngOnInit() {}

  async datosLocalStorage(){
    await this.storage.create();
    await this.storage.clear();
    const data = await {
      mail: this.mail
    };
    await this.storage.set('datos', data);
  }

  async presentLoading() {
  const loading = await this.loadingController.create({
  message: 'Cargando...'
  });
  await loading.present();
  }

  async register(){
  await this.presentLoading();
  console.log(this.mail, this.pass);
  const tags = this.user.split(' ');
  const params = {
    tag: tags[0],
    name: this.user,
    lastname: this.last,
    age: this.edad,
    gender: this.gender,
    mail: this.mail,
    password: this.pass
  };

  this.userService.register(params).subscribe(async (res: any)=>{
    if(res.message === 'Usuario agregado con exito a la DB.'){
      await this.datosLocalStorage();
      await this.alertService.presentToast(res.message,'success',3000);
      await this.navCtrl.navigateRoot('/categorias');
    }else{
      setTimeout(() => {
        this.loadingController.dismiss();
      }, 500);
      this.alertService.presentToast(res.message,'danger',3000);
    }
  });
}

  select(ev){
    this.gender = ev.detail.value;
    console.log(ev.detail.value);
  }

  goLogin(){
    this.navCtrl.navigateForward('/login');
  }

}
