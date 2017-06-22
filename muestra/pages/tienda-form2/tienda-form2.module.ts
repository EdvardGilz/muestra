import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TiendaForm2 } from './tienda-form2';

@NgModule({
  declarations: [
    TiendaForm2,
  ],
  imports: [
    IonicPageModule.forChild(TiendaForm2),
  ],
  exports: [
    TiendaForm2
  ]
})
export class TiendaForm2Module {}
