import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, LoadingController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { AdMobFree } from '@ionic-native/admob-free';

import { Api } from '../../providers/api';

import { StatsDataModel } from '../../models/models';

import { Meses } from '../meses/meses';

/**
 * Generated class for the Estadisticas page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-estadisticas',
  templateUrl: 'estadisticas.html',
})
export class Estadisticas {
  public estadisticasMes: StatsDataModel = new StatsDataModel();
  public estadisticasDia: StatsDataModel[] = [];
  public vacio = 1;
  public fecha;
  public btnDisabled = true;

  constructor(public navCtrl: NavController, 
              public api: Api,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              private toast: Toast,
              private admobFree: AdMobFree) {
    this.fecha = "actual";
    this.obtenerEstadisticas(this.fecha);

    // InAppPurchase.getProducts(['pruebasuscripcion1']).then((products) => {
    //   console.log(products);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });

    // AdMob.createBanner({
    //   adId: 'ca-app-pub-1057257651261369/8330356336',
    //   isTesting: false,
    //   autoShow: true,
    //   position: 'TOP_CENTER'
    // });
    this.admobFree.banner.show();
  }

  obtenerEstadisticas(fecha) {
    let loading = this.loadingCtrl.create({
      content: 'Cargando Estadisticas'
    });
    loading.present();

    this.api.getStats(true, fecha).then((data) => {
      this.estadisticasMes = data.data[0];
    });

    this.api.getStats(false, fecha).then((data) => {
      this.estadisticasDia = data.data;
      for(var i in this.estadisticasDia) {
        if (this.estadisticasDia[i].totalMes > 0 || this.estadisticasDia[i].totalVentas > 0 || this.estadisticasDia[i].totalInvertido > 0) {
          this.vacio = 0;
          //this.btnDisabled = false;
        }
      }
      loading.dismiss();
    });
  }

  regresar() {
    this.navCtrl.pop();
  }

  seleccionarMes() {
    let modal = this.modalCtrl.create(Meses, {fecha:this.estadisticasMes.fechaVal});
    modal.onDidDismiss(data => {
      this.fecha = data;
      this.obtenerEstadisticas(this.fecha);
    });
    
    modal.present();
  }

  enviarInforme() {
    this.api.enviarInforme(this.fecha).then((data) => {
      if (data.success == 1) {
        this.toast.show("Se envió el informe a tu correo", '5000', 'bottom').subscribe();
      }
      else {
        this.toast.show("Ocurrió un error, intentalo nuevamente", '5000', 'bottom').subscribe();
      }
    });
  }

  proximamente() {
    this.toast.show("Poximamente", '3000', 'bottom').subscribe();
  }

}
