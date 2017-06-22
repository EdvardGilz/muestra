import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';
import { AdMobFree } from '@ionic-native/admob-free';

import { Api } from '../../providers/api';
import { CommonFunctions } from '../../providers/common-functions';

import { UserDataModel } from '../../models/models';

/**
 * Generated class for the Perfil page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class Perfil {
  public nombre;
  public ap_p;
  public ap_m;
  public tel;
  public mail;
  public user;
  public pass;
  public pass2;

  public differentPass = false;
  public buttonDisabled = true;
  public userData: UserDataModel = new UserDataModel();

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public api: Api,
              public commonFunctions: CommonFunctions,
              private admobFree: AdMobFree) {
    api.verificaUserData().then((data) => {
      var datos = data.data[0];

      this.nombre = datos.nombre;
      this.ap_p = datos.ap_p;
      this.ap_m = datos.ap_m
      this.tel = datos.tel;
      this.mail = datos.mail;
      this.user = datos.username;
    });

    // AdMob.createBanner({
    //   adId: 'ca-app-pub-1057257651261369/8330356336',
    //   isTesting: false,
    //   autoShow: true,
    //   position: 'TOP_CENTER'
    // });
    this.admobFree.banner.show();
  }

  activarBtn() {
    if (this.pass == this.pass2) {
      this.differentPass = false;
    }
    else {
      this.differentPass = true;
    }

    if (this.pass == this.pass2 && this.nombre != "" && this.ap_p != "" && this.ap_m != "" && this.tel != "" && this.mail != "") {
      this.buttonDisabled = false;
    }
    else {
      this.buttonDisabled = true;
    }
  }

  guardar() {
    this.userData.nombre = this.nombre;
    this.userData.ap_p = this.ap_p;
    this.userData.ap_m = this.ap_m;
    this.userData.tel = this.tel;
    this.userData.mail = this.mail;
    this.userData.username = this.user;
    this.userData.password = this.pass;
    this.userData.passwordPrev = null;

    if (this.userData.password != undefined && this.userData.password != "") {
      let prompt = this.alertCtrl.create({
        title: 'Confirmar acción',
        message: 'Ingresa tu contraseña anterior',
        inputs: [
          {
            name: 'pass',
            type: 'password',
            placeholder: 'Contraseña anterior'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Aceptar',
            handler: data => {
              this.userData.passwordPrev = data.pass;
              this.guardando();
            }
          }
        ]
      });
      prompt.present();
    }
    else {
      this.guardando();
    }
    
  }

  guardando() {
    let loading = this.loadingCtrl.create({
      content: 'Guardando'
    });
    loading.present();

    this.api.editarUserData(this.userData).then((data) => {
      if (data.id == -1) {
        this.commonFunctions.despliegaAlerta("Error", "Contraseña incorrecta");
      }
      else {
        this.commonFunctions.despliegaAlerta("Correcto", "Datos guardados correctamente");
      }

      this.pass = null;
      this.pass2 = null;
      this.buttonDisabled = true;

      loading.dismiss();
    });
  }

  regresar() {
    this.navCtrl.pop();
  }

}
