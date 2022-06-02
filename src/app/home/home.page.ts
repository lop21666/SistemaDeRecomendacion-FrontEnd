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
  peliculasRecomendadasGenero = [];
  datosUsuario = null;
  pelicula;
  email = null;
  viewEntered = false;

  constructor(private moviesService: MoviesService, private modalController: ModalController,
              private loadingController: LoadingController, private storage: Storage, private navController: NavController) {}
  

  async ionViewWillEnter(){
    await this.storage.create();
    this.datosUsuario = await this.storage.get('datos');
    this.email = await this.datosUsuario.mail;
  }

  async ngOnInit() {
    setTimeout(async () => {
      console.log(this.datosUsuario);
      this.loadingController.dismiss();
      const params = await {
        mail: this.email
      };
      await this.moviesService.genreRecommendation(params).subscribe(async (resp: any)=>{
        this.pelicula = await resp;
        await this.pelicula.forEach(async element => {
          let pelicula=null;
          await this.moviesService.getDetallesPelicula(element.api_id.low).subscribe(async (res)=>{
            pelicula = await res;
            console.log(pelicula);
            await this.peliculasRecomendadasGenero.push(pelicula);
          });
        });
      });
    }, 1000);

    setTimeout(() => {
      console.log(this.peliculasRecomendadasGenero);
      this.viewEntered = true;
    }, 2500);

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
