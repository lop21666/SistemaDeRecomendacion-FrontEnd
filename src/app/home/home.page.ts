import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, NavController } from '@ionic/angular';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/services/movies.service';
import { PeliculaPage } from '../pelicula/pelicula.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  slideOpts = {
    slidesPerView: 1.2,
    freeMode: true
  };
  slideOpts2 = {
    slidesPerView: 2.5,
    freeMode: true
  };
  peliculasRecientes: Pelicula[] = [];
  pelicularPopulares: Pelicula[] = [];

  constructor(private moviesService: MoviesService, private modalController: ModalController,
              private loadingController: LoadingController, private storage:Storage, private navController:NavController) {}

  ngOnInit() {
    setTimeout(() => {
      this.loadingController.dismiss();
    }, 1000);

    this.moviesService.getFeature()
      .subscribe( resp => {
        console.log(resp);
        this.peliculasRecientes = resp.results;
      });

    this.getPopulares();
  }

  getPopulares() {
    this.moviesService.getPopulary()
    .subscribe( resp => {
      console.log(resp);
      const arrTemp = [ ...this.pelicularPopulares, ...resp.results ];
      this.pelicularPopulares = arrTemp;
    });
  }

  cargarMas() {
    this.getPopulares();
  }

  logout(){
    this.storage.clear();
    this.navController.navigateRoot('/login');
  }

  async presentModalPelicula(pelicula){
    const modal = await this.modalController.create({
      component: PeliculaPage,
      backdropDismiss: false,
      componentProps: { pelicula }
    });
    await modal.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }

}
