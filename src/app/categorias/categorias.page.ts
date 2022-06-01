import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { MoviesService } from '../services/services/movies.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  generos;
  datosUsuario = null;

  constructor(private navCtrl: NavController, private moviesService: MoviesService, public loadingController: LoadingController,
              private storage: Storage) { }

  async ngOnInit() {
    this.datosUsuario = await this.storage.get('datos');
    setTimeout(() => {
      this.loadingController.dismiss();
    }, 1000);

    this.moviesService.getGenres().subscribe((resp: any)=>{
      this.generos = resp;
    });
  }

  back(){
    this.navCtrl.back({animated: true});
  }

  selectGenre(ev){
    const email = this.datosUsuario.mail;
    const params = {
      mail: email,
      genreName: ev
    };

    this.moviesService.inLikeGenre(params);
  }

  aceptar(){
    this.navCtrl.navigateRoot('/home');
  }

}
