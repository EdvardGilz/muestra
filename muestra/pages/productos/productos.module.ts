import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Productos } from './productos';

@NgModule({
  declarations: [
    Productos,
  ],
  imports: [
    IonicPageModule.forChild(Productos),
  ],
  exports: [
    Productos
  ]
})
export class ProductosModule {}
