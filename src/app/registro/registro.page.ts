import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { UserService } from '../services/services/user.service';
import { AlertService } from '../services/services/alert.service';

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
              private alertService: AlertService) {
  }

  ngOnInit() {}


  async presentLoading() {
  const loading = await this.loadingController.create({
  message: 'Cargando...'
  });
  await loading.present();
  }

  async register(){
  await this.presentLoading();
  console.log(this.mail, this.pass);
  const params = {
    mail: this.mail,
    password: this.pass,
    name: this.user,
    lastname: this.last,
    gender: this.gender,
    age: this.edad
  };

  this.userService.register(params).subscribe((res: any)=>{
    if(res.message === undefined){
      this.navCtrl.navigateRoot('/categorias');
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
  }

}
