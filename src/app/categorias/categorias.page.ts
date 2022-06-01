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

  constructor(private navCtrl: NavController, private moviesService: MoviesService, public loadingController: LoadingController) { }

  ngOnInit() {
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
    console.log(ev);
  }

  aceptar(){
    this.navCtrl.navigateRoot('/home');
  }

}
