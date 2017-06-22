import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TiendaForm3 } from './tienda-form3';

@NgModule({
  declarations: [
    TiendaForm3,
  ],
  imports: [
    IonicPageModule.forChild(TiendaForm3),
  ],
  exports: [
    TiendaForm3
  ]
})
export class TiendaForm3Module {}
