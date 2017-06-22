import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Api } from '../../providers/api';
import { CommonFunctions } from '../../providers/common-functions';
import { Global } from '../../providers/global';

import { SuccessModel } from '../../models/models';

import { Registro } from '../registro/registro';
import { Dashboard } from '../dashboard/dashboard';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  public user;
  public pass;
  public plataforma: number;
  public tipoUser = false;
  public txtTipoUser = "Propietario";

  public buttonDisabled = true;
  
  public userData: SuccessModel;

  constructor(private storage: Storage,
              public navCtrl: NavController,
              public api: Api,
              public commonFunctions: CommonFunctions,
              public global: Global,
              public loadingCtrl: LoadingController) {
    this.commonFunctions.checkNetwork();
    storage.get('credenciales').then((data) => {
      if (data != null) {
        this.user = data.user;
        this.pass = data.pass;
        this.tipoUser = data.tipo;

        this.login();
      }
    });
  }

  login() {
    let loading = this.loadingCtrl.create({
      content: 'Accediendo'
    });
    loading.present();

    this.api.loginApi(this.user, this.pass, this.tipoUser)
    .then((res) => {
      this.userData = res;
    })
    .then(() => {
      let validacion = this.commonFunctions.entrar(this.userData, this.tipoUser, 0);
      if (validacion != 0) {
        this.storage.set('credenciales', {user:this.user, pass:this.pass, tipo:this.tipoUser});
        this.global.setUsername(this.user);
        this.navCtrl.setRoot(Dashboard);
      }
      loading.dismiss();
    });
  }
  
  verificaLlenado() {
    if (this.user && this.pass && this.user != "" && this.pass != "") {
      this.buttonDisabled = false;
    }
    else {
      this.buttonDisabled = true;
    }
  }
  
  tipoUserToggle() {
    if (this.tipoUser == false) {
      this.txtTipoUser = "Propietario";
    }
    else if (this.tipoUser == true) {
      this.txtTipoUser = "Colaborador";
    }
  }
  
  registro() {
    this.navCtrl.setRoot(Registro);
  }
}
