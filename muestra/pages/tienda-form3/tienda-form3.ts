import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';

import { Api } from '../../providers/api';
import { CommonFunctions } from '../../providers/common-functions';
import { Global } from '../../providers/global';

import { UserDataModel } from '../../models/models';

import { Dashboard } from '../dashboard/dashboard';
import { TiendaForm } from '../tienda-form/tienda-form';

/**
 * Generated class for the TiendaForm3 page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tienda-form3',
  templateUrl: 'tienda-form3.html',
})
export class TiendaForm3 {
  public nombre;
  public app_p;
  public app_m;
  public tel;
  public username;
  public userData: UserDataModel = new UserDataModel();
  
  public buttonDisabled = true;

  constructor(public navCtrl: NavController,
              public api: Api,
              public commonFunctions: CommonFunctions,
              public global: Global,
              public loadingCtrl: LoadingController) {
    this.username = global.getUsername();
  }

  verificaLlenado() {
    if (this.nombre && this.app_p && this.app_m && this.tel && this.nombre != "" && this.app_p != "" && this.app_m != "" && this.tel)  {
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
    
    this.userData.nombre = this.nombre;
    this.userData.ap_p = this.app_p;
    this.userData.ap_m = this.app_m;
    this.userData.tel = this.tel;
    
    this.api
      .registroT(this.global.getTiendaData(), this.userData)
      .then((data) => {
        this.global.clearTiendaData();
        if (data.success == 1) {
          this.navCtrl.setRoot(Dashboard);
        }
        else {
          if (data.id == 0) {
            this.commonFunctions.despliegaAlerta("Error", "Error al agregar la tienda");
          }
          else if (data.id == -1) {
            this.commonFunctions.despliegaAlerta("Error", "Error al actualizar los datos de usuario");
          }
          
          this.navCtrl.setRoot(TiendaForm);
        }
        loading.dismiss();
      });
  }

  volver() {
    this.navCtrl.pop();
  }

}
