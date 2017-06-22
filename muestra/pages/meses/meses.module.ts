import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Meses } from './meses';

@NgModule({
  declarations: [
    Meses,
  ],
  imports: [
    IonicPageModule.forChild(Meses),
  ],
  exports: [
    Meses
  ]
})
export class MesesModule {}
