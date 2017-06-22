import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AdMobFree } from '@ionic-native/admob-free';

import { Global } from '../../providers/global';

import { TiendaDataModel } from '../../models/models';

import { TiendaForm2 } from '../tienda-form2/tienda-form2';

/**
 * Generated class for the TiendaForm page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tienda-form',
  templateUrl: 'tienda-form.html',
})
export class TiendaForm {
  public nombre;
  public lun = true;
  public mar = true;
  public mie = true;
  public jue = true;
  public vie = true;
  public sab = true;
  public dom = true;
  public hora_a;
  public hora_c;
  public misHoras;
  public horasDisabled = true;

  public tienda: TiendaDataModel;

  public buttonDisabled = true;
  public nuevo;

  constructor(public navCtrl: NavController,
              public global: Global,
              private admobFree: AdMobFree) {
    // AdMob.removeBanner();

    this.tienda = global.getTiendaData1();
    this.nuevo = global.getNuevaTienda();

    if (this.tienda.nombre != undefined) {
      var dias = this.tienda.dias.split(",");

      this.lun = false;
      this.mar = false;
      this.mie = false;
      this.jue = false;
      this.vie = false;
      this.sab = false;
      this.dom = false;

      for (var i=0; i<dias.length; i++) {
        switch (dias[i]) {
          case "1": this.lun = true;
                    break;
          case "2": this.mar = true;
                    break;
          case "3": this.mie = true;
                    break;
          case "4": this.jue = true;
                    break;
          case "5": this.vie = true;
                    break;
          case "6": this.sab = true;
                    break;
          case "7": this.dom = true;
                    break;
        }
      }
      this.nombre = this.tienda.nombre;
      this.hora_a = this.tienda.hora_a;
      this.hora_c = this.tienda.hora_c;
    }
  }

  verificaLlenado() {
    this.misHoras = "";

    if (this.hora_a && this.hora_a != "") {
      this.horasDisabled = false;
      var horaSelect = this.hora_a;
      var num = parseInt(horaSelect.substring(0,2));

      for (var i=num +1; i<24; i++) {
        this.misHoras += i + ",";
      }
    }
    else {
      this.horasDisabled = true;
    }
    if ((this.nombre && this.hora_a && this.hora_c && this.nombre != "" && this.hora_a != "" && this.hora_c != "") && (this.lun == true || this.mar == true || this.mie == true || this.jue == true || this.vie == true || this.sab == true || this.dom == true)) {
      this.buttonDisabled = false;
    }
    else {
      this.buttonDisabled = true;
    }
  }
  
  siguiente() {
    var dias = "";
    
    if (this.lun == true) {
      dias += "1";
    }
    if (this.mar == true) {
      if (dias.length == 0) {
        dias += "2";
      }
      else {
        dias += ",2";
      }
    }
    if (this.mie == true) {
      if (dias.length == 0) {
        dias += "3";
      }
      else {
        dias += ",3";
      }
    }
    if (this.jue == true) {
      if (dias.length == 0) {
        dias += "4";
      }
      else {
        dias += ",4";
      }
    }
    if (this.vie == true) {
      if (dias.length == 0) {
        dias += "5";
      }
      else {
        dias += ",5";
      }
    }
    if (this.sab == true) {
      if (dias.length == 0) {
        dias += "6";
      }
      else {
        dias += ",6";
      }
    }
    if (this.dom == true) {
      if (dias.length == 0) {
        dias += "7";
      }
      else {
        dias += ",7";
      }
    }
    
    var hora1 = this.hora_a;
    var hora2 = this.hora_c;
    
    this.global.setTiendaData1(this.nombre, hora1, hora2, dias);
    this.navCtrl.push(TiendaForm2);
  }

  cancelar() {
    this.global.clearTiendaData();
    this.navCtrl.pop();
  }

}
