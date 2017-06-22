import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';

import { Api } from '../../providers/api';
import { CommonFunctions } from '../../providers/common-functions';
import { Global } from '../../providers/global';

import { UserDataModel } from '../../models/models';

/**
 * Generated class for the Empleados page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-empleados',
  templateUrl: 'empleados.html',
})
export class Empleados {
  public user;
  public pass;
  public pass2;
  public mail;
  public differentPass = false;
  public buttonDisabled = true;

  public empleados;
  public empleadosData: UserDataModel[] = [];
  public empleadoNuevo: UserDataModel = new UserDataModel();

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public api: Api,
              public commonFunctions: CommonFunctions,
              public global: Global,
              public loadingCtrl: LoadingController) {
    this.verificaEmpleados();
  }

  verificaEmpleados() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando datos'
    });
    loading.present();

    this.api.verificaEmpleados().then((data) => {
      this.empleadosData = data.data;
      this.empleados = data.success;
      loading.dismiss();
    });
  }

  verificaLlenado() {
    if (this.pass == this.pass2) {
      this.differentPass = false;
    }
    else {
      this.differentPass = true;
    }
    
    if (this.user && this.pass && this.pass2 && this.mail && this.user != "" && this.pass != "" && this.pass2 != "" && this.mail != "" && this.pass == this.pass2) {
      this.buttonDisabled = false;
    }
    else {
      this.buttonDisabled = true;
    }
  }

  guardar() {
    let loading = this.loadingCtrl.create({
      content: 'Guardando...'
    });
    loading.present();

    this.empleadoNuevo.mail = this.mail;
    this.empleadoNuevo.username = this.user;
    this.empleadoNuevo.password = this.pass;

    this.api.nuevoEmpleado(this.empleadoNuevo).then((data) => {
      if (data.success == 0) {
        if (data.id == 0) {
          this.commonFunctions.despliegaAlerta("Error", "Error al incertar el usuario, intentalo nuevamente");
        }
        else if (data.id == -1) {
          this.commonFunctions.despliegaAlerta("Error", "Ese nombre de usuario ya existe");
        }
      }
      else {
        this.mail = "";
        this.user = "";
        this.pass = "";
        this.pass2 = "";

        this.verificaLlenado();
        this.verificaEmpleados();
      }
      loading.dismiss();
    });
  }

  eliminarEmpleado(data) {
    let confirm = this.alertCtrl.create({
      title: 'Estas a punto de eliminar al usuario',
      message: '¿Estas seguro que quieres eliminarlo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Si, borrar',
          handler: () => {
            this.borrar(data);
          }
        }
      ]
    });
    confirm.present();
  }

  borrar(data) {
    this.api.eliminarEmpleado(data.idEmpleado).then((data) => {
      if (data.success == 1) {
        this.verificaEmpleados();
      }
      else {
        this.commonFunctions.despliegaAlerta("Error", "Error al eliminar el usuario, intentalo nuevamente");
      }
    });
  }

  regresar() {
    this.navCtrl.pop();
  }

}
