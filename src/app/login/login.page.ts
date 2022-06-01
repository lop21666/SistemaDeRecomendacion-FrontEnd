import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NavController, LoadingController} from '@ionic/angular';
import { UserService } from '../services/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = '';
  pass = '';


  constructor(private navCtrl: NavController, private userService: UserService, public loadingController: LoadingController) {
              }

  ngOnInit() {}


  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }

  async login(){
    this.presentLoading();
    console.log(this.user, this.pass);
    this.navCtrl.navigateRoot('/home');
  }

}

