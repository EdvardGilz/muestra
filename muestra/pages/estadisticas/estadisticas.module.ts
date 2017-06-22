import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Estadisticas } from './estadisticas';

@NgModule({
  declarations: [
    Estadisticas,
  ],
  imports: [
    IonicPageModule.forChild(Estadisticas),
  ],
  exports: [
    Estadisticas
  ]
})
export class EstadisticasModule {}
