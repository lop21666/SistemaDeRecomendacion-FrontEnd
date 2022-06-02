import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PeliculaDetalle, RespuestaCredits, RespuestaMDB } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';


const url = environment.url;
const apiKey = environment.apiKey;
const URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;

  constructor(private http: HttpClient) { }

  getPopulary(){
    this.popularesPage ++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  getFeature(){
    const query = '/discover/movie?primary_release_date.gte=2019-09-15&primary_release_date.lte=2020-08-22';
    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  getDetallesPelicula(id: string){
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }

  getDetallesCredits(id: string){
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);
  }

  search(clave: string){
    return this.ejecutarQuery<RespuestaCredits>(`/search/movie?&query=${clave}&page=1`);
  }

  searchPelícula(clave: string){
    return this.ejecutarQuery<RespuestaCredits>(`/search/movie?&query=${clave}&page=1`);
  }

  getGenres(){
    return this.http.get(URL + '/getGenres');
  }

  getMovies(){
    return this.http.get(URL + '/getMovies');
  }


  inLikeGenre(params){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(params);
    console.log(body);

    return this.http.post(URL + '/inLikeGenre', body,{headers});
  }

  disLikeGenre(params){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(params);
    console.log(body);

    return this.http.post(URL + '/disLikeGenre', body,{headers});
  }

  inLikeMovie(params){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(params);
    console.log(body);

    return this.http.post(URL + '/inLikeMovie', body,{headers});
  }

  disLikeMovie(params){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(params);
    console.log(body);

    return this.http.post(URL + '/disLikeMovie', body,{headers});
  }

  createMovie(params){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(params);
    console.log(body);

    return this.http.post(URL + '/createMovie', body,{headers});
  }

  private ejecutarQuery<T>(query: string){
    query = url + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;
    console.log(query);
    return this.http.get<T>(query);
  }


}
