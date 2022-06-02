import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ModalController } from '@ionic/angular';
import { MoviesService } from '../services/services/movies.service';
import { PeliculaPage } from '../pelicula/pelicula.page';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  pelicula = '';
  peliculas;

  constructor(private navController: NavController, private movieService: MoviesService,  public loadingController: LoadingController,
              private modalController: ModalController) { }

  ngOnInit() {

  }

  back(){
    this.navController.navigateBack('/');
  }

  async search(){
    await this.presentLoading();
    this.movieService.search(this.pelicula).subscribe(async (resp: any) => {
      this.peliculas = await resp.results;
      await this.loadingController.dismiss();
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }

  async presentModalPelicula(pelicula){
    const modal = await this.modalController.create({
      component: PeliculaPage,
      backdropDismiss: false,
      componentProps: { pelicula }
    });
    await modal.present();
  }

}
