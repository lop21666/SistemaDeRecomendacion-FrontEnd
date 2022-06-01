import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { UserService } from '../services/services/user.service';

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


  constructor(private navCtrl: NavController, private userService: UserService, public loadingController: LoadingController) {
  }

  ngOnInit() {}


  async presentLoading() {
  const loading = await this.loadingController.create({
  message: 'Cargando...'
  });
  await loading.present();
  }

  async register(){
  this.presentLoading();
  console.log(this.user, this.pass);
  this.navCtrl.navigateRoot('/home');

}

}
