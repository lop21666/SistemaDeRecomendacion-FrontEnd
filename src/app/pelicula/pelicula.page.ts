import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MoviesService } from '../services/services/movies.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.page.html',
  styleUrls: ['./pelicula.page.scss'],
})
export class PeliculaPage implements OnInit {

  @Input() pelicula;
  viewEntered = false;

  liked = false;
  movies;
  exist = false;
  datosUsuario = null;

  constructor(private modalController: ModalController, private moviesService: MoviesService, private storage: Storage) { }

  async ngOnInit() {
    this.datosUsuario = await this.storage.get('datos');
    console.log(this.pelicula);
    this.moviesService.getMovies().subscribe(resp =>{
      this.movies = resp;
      console.log(resp);
    });
  }

  async ionViewDidEnter() {
    this.viewEntered = true;
  }

  ionViewWillLeave(){
    this.viewEntered = false;
  }

  async back(){
    this.modalController.dismiss();
  }

  async onClick(pelicula){

    const email = this.datosUsuario.mail;
    const params = {
      mail: email,
      movieName: pelicula.original_title
    };

    if(this.liked){
      this.liked = false;
      this.moviesService.disLikeMovie(params).subscribe((res: any)=>{
        console.log(res);
      });
    }else{
      this.liked = true;
      await this.movies.forEach(async element => {
        if(element.name === pelicula.original_title){
          this.exist = await true;
        }
      });
  
      if(this.exist){
        this.moviesService.inLikeMovie(params).subscribe((res: any)=>{
          console.log(res);
        });
      }else{
  
        const tags = pelicula.original_title.split(' ');
        const param = {
          tag: tags[0],
          name: pelicula.original_title,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          api_id: pelicula.id
        };
  
        this.moviesService.createMovie(param).subscribe((res: any)=>{
          if(res){
            console.log(res);
            this.moviesService.inLikeMovie(params).subscribe((resp: any)=>{
              console.log(resp);
              this.moviesService.getMovies().subscribe(resp =>{
                this.movies = resp;
              });
            });
          }
        });
  
      }
    }

  }

}
