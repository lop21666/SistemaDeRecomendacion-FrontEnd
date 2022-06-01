import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NavController, LoadingController} from '@ionic/angular';
import { AlertService } from '../services/services/alert.service';
import { UserService } from '../services/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mail = '';
  pass = '';


  constructor(private navCtrl: NavController, private userService: UserService, public loadingController: LoadingController, private alertService:AlertService) {
              }

  ngOnInit() {}


  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }

  async login(){
    await this.presentLoading();
    console.log(this.mail, this.pass);
    const params = {
      mail: this.mail,
      password: this.pass
    };

    this.userService.login(params).subscribe((res:any)=>{
      if(res.message==undefined){
        this.navCtrl.navigateRoot('/home');
      }else{
        setTimeout(() => {
          this.loadingController.dismiss();
        }, 500);
        this.alertService.presentToast(res.message,"danger",3000);
      }
    });
  }

}

