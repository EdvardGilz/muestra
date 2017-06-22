import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgregarProductos } from './agregar-productos';

@NgModule({
  declarations: [
    AgregarProductos,
  ],
  imports: [
    IonicPageModule.forChild(AgregarProductos),
  ],
  exports: [
    AgregarProductos
  ]
})
export class AgregarProductosModule {}
