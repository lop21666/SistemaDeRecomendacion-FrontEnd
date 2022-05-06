import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/services/movies.service';
import { PeliculaPage } from '../pelicula/pelicula.page';

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

  constructor(private moviesService: MoviesService, private modalController: ModalController) {}

  ngOnInit() {
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

  async presentModalPelicula(pelicula){
    const modal = await this.modalController.create({
      component: PeliculaPage,
      backdropDismiss: false,
      componentProps: { pelicula }
    });
    await modal.present();
  }

}
