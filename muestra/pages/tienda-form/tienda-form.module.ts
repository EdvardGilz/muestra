import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TiendaForm } from './tienda-form';

@NgModule({
  declarations: [
    TiendaForm,
  ],
  imports: [
    IonicPageModule.forChild(TiendaForm),
  ],
  exports: [
    TiendaForm
  ]
})
export class TiendaFormModule {}
