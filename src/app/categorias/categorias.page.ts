import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MoviesService } from '../services/services/movies.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  generos;

  constructor(private navCtrl: NavController, private moviesService: MoviesService) { }

  ngOnInit() {
    this.moviesService.getGenres().subscribe((resp: any)=>{
      this.generos = resp;
    });
  }

  back(){
    this.navCtrl.back({animated: true});
  }

  selectGenre(ev){
    console.log(ev.detail.value);
  }

  aceptar(){
    this.navCtrl.navigateRoot('/home');
  }

}
