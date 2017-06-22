import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Empleados } from './empleados';

@NgModule({
  declarations: [
    Empleados,
  ],
  imports: [
    IonicPageModule.forChild(Empleados),
  ],
  exports: [
    Empleados
  ]
})
export class EmpleadosModule {}
