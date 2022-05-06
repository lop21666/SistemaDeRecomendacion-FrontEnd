import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PeliculaPageRoutingModule } from './pelicula-routing.module';

import { PeliculaPage } from './pelicula.page';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PeliculaPageRoutingModule,
    PipesModule
  ],
  declarations: [PeliculaPage]
})
export class PeliculaPageModule {}
