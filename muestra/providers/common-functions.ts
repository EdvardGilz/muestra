import { Injectable } from '@angular/core';
import { AlertController, Platform, LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

import { Global } from './global';

/*
  Generated class for the CommonFunctions provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CommonFunctions {
  public conectado = 1;
  public plataforma = 0;

  constructor(public platform: Platform,
              public alertController: AlertController,
              public global: Global,
              private network: Network,
              public loadingCtrl: LoadingController) {}

  checkNetwork() {
    var loading;
    if (!this.platform.is('core')) {
      this.plataforma = 1;
      this.global.setPlataforma(this.plataforma);

      let disconnect = this.network.onchange().subscribe((data) => {
        if (data.type == "offline") {
          loading = this.loadingCtrl.create({
            content: 'Sin conexión, Intentando conectar...'
          });
          loading.present();
        }
        else {
          loading.dismiss();
        }
      });
    }
  }
  
  entrar(userData, tipoUser, from) {
    var valida = 0;
    
    if (from == 0) { // VIENE DE LOGIN
      if (userData.success == 0) {
        this.despliegaAlerta("Usuario no encontrado", "Revisa tus credenciales");
      }
      else {
        valida = 1;
      }
    }
    else if (from == 1) { // VIENE DE REGISTRO
      if (userData.success == 0) {
        if (userData.id == 0) {
          this.despliegaAlerta("Error", "Ocurrió un error, intentalo nuevamente");
        }
        else if (userData.id == -1) {
          this.despliegaAlerta("Error", "Ese nombre de usuario ya existe");
        }
        else if (userData.id == -2) {
          this.despliegaAlerta("Error", "Ese correo ya existe");
        }
      }
      else {
        valida = 1;
      }
    }
    
    if (valida == 1) {
      this.global.setUser(userData.id);
      this.global.setTipoUser(tipoUser);
    }
		
    return valida;
	}
  
  despliegaAlerta(titulo: string, subtitulo: string) {
    let alert = this.alertController.create({
      title: titulo,
      subTitle: subtitulo,
      buttons: ['OK']
    });
    alert.present();
  }
}
