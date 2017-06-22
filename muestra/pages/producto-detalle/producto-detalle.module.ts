import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductoDetalle } from './producto-detalle';

@NgModule({
  declarations: [
    ProductoDetalle,
  ],
  imports: [
    IonicPageModule.forChild(ProductoDetalle),
  ],
  exports: [
    ProductoDetalle
  ]
})
export class ProductoDetalleModule {}
