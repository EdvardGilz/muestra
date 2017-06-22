import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Api } from '../../providers/api';
import { CommonFunctions } from '../../providers/common-functions';
import { Global } from '../../providers/global';

import { SuccessModel, UserDataModel } from '../../models/models';

import { Login } from '../login/login';
import { TiendaForm } from '../tienda-form/tienda-form';

/**
 * Generated class for the Registro page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class Registro {
  public user;
  public pass;
  public pass2;
  public mail;
  public differentPass = false;
  public buttonDisabled = true;

  public userData: UserDataModel = new UserDataModel();
  public userDataRes: SuccessModel;

  constructor(public navCtrl: NavController,
              public api: Api,
              public commonFunctions: CommonFunctions,
              public global: Global,
              public storage: Storage,
              public loadingCtrl: LoadingController) {
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
  
  registro() {
    let loading = this.loadingCtrl.create({
      content: 'Guardando...'
    });
    loading.present();

    this.userData.username = this.user;
    this.userData.password = this.pass;
    this.userData.mail = this.mail;
    
    this.api.registroD(this.userData).then((res) => {
      this.userDataRes = res;
    })
    .then(() => {
      let validacion = this.commonFunctions.entrar(this.userDataRes, false, 1);
      if (validacion != 0) {
        this.storage.set('credenciales', {user:this.user, pass:this.pass, tipo:false});
        this.global.setUsername(this.user);
        this.global.setNuevaTienda(0);
        this.navCtrl.setRoot(TiendaForm);
        
      }
      loading.dismiss();
    });
  }
  
  login() {
    this.navCtrl.setRoot(Login);
  }
}
