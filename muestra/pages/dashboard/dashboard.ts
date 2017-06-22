import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';
import { AdMobFree } from '@ionic-native/admob-free';

import { Api } from '../../providers/api';
import { CommonFunctions } from '../../providers/common-functions';
import { Global } from '../../providers/global';

import { TiendaDataModel, TiendaModel } from '../../models/models';

import { Login } from '../login/login';
import { TiendaForm } from '../tienda-form/tienda-form';
import { Empleados } from '../empleados/empleados';
import { Perfil } from '../perfil/perfil';
import { Productos } from '../productos/productos';
import { Cuenta } from '../cuenta/cuenta';
import { Estadisticas } from '../estadisticas/estadisticas';

/**
 * Generated class for the Dashboard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class Dashboard {
  public tiendasData;
  public tiendas: TiendaDataModel[] = [];
  public tienda: TiendaModel;
  public userTipo;
  public username;
  public userId;

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public api: Api,
              public commonFunctions: CommonFunctions,
              public global: Global,
              public loadingCtrl: LoadingController,
              private toast: Toast,
              private admobFree: AdMobFree) {
    this.userTipo = this.global.getTipoUser();
    this.username = this.global.getUsername();
    this.userId = this.global.getUser();
  }

  ionViewWillEnter() {
    // this.commonFunctions.checkNetwork();
    // AdMob.prepareInterstitial({
    //   adId: 'ca-app-pub-1057257651261369/7551627133',
    //   isTesting: false,
    //   autoShow: false
    // });

    // AdMob.createBanner({
    //   adId: 'ca-app-pub-1057257651261369/8330356336',
    //   isTesting: false,
    //   autoShow: true,
    //   position: 'TOP_CENTER'
    // });

    if (this.global.getPlataforma() == 1) {
      this.admobFree.interstitial.config({
        id: 'ca-app-pub-1057257651261369/7551627133',
        isTesting: false,
        autoShow: false
      });
      this.admobFree.interstitial.prepare();

      this.admobFree.banner.config({
        id: 'ca-app-pub-1057257651261369/8330356336',
        isTesting: false,
        autoShow: false,
        bannerAtTop: true
      });
      this.admobFree.banner.prepare();
    }

    let loading = this.loadingCtrl.create({
      content: 'Cargando tiendas'
    });
    loading.present();

    this.api.verificaTienda().then((data) => {
      this.tienda = data;
    })
    .then(() => {
      if (this.tienda.success == 1) {
        this.global.setTiendasData(this.tienda);
        
      }
      else {
        this.global.setNuevaTienda(0);
        this.navCtrl.setRoot(TiendaForm);
      }
    })
    .then(()=> {
      this.tiendasData = this.global.getTiendasData();
      if (this.tiendasData != undefined) {
        this.tiendas = this.tiendasData.data;
      }
      loading.dismiss();
    });
  }

  nuevaTienda() {
    this.global.setNuevaTienda(1);
    this.navCtrl.push(TiendaForm);
  }

  salir() {
    this.storage.clear();
    this.navCtrl.setRoot(Login);
  }

  editar(data) {
    let loading = this.loadingCtrl.create({
      content: 'Accediendo'
    });
    loading.present();

    this.global.setNuevaTienda(2);
    this.global.setTiendaId(data.id);

    this.api.verificaTienda2(data.id).then((data) => {
      let tienda = data.data[0];
      this.global.setTiendaData1(tienda.nombre, tienda.hora_a, tienda.hora_c, tienda.dias);
      this.global.setTiendaData2(tienda.calle, tienda.num_ext, tienda.num_int, tienda.cp, tienda.colonia, tienda.municipio, tienda.pais, tienda.estado);
    })
    .then(() => {
      // AdMob.showInterstitial();
      this.admobFree.interstitial.show();
      this.navCtrl.push(TiendaForm);
      loading.dismiss();
    });
  }

  agregarEmpleado(data) {
    // AdMob.showInterstitial();
    this.admobFree.interstitial.show();
    this.global.setTiendaId(data.id);
    this.navCtrl.push(Empleados);
  }

  perfil() {
    // AdMob.showInterstitial();
    this.admobFree.interstitial.show();
    this.navCtrl.push(Perfil);
  }

  productos(data) {
    this.global.setTiendaId(data.id);
    this.navCtrl.push(Productos);
  }

  cuenta(data) {
    this.global.setTiendaId(data.id);
    if (data.sumaStock > 0) {
      this.navCtrl.push(Cuenta);
    }
    else {
      this.commonFunctions.despliegaAlerta("No hay stock", "Agrega stock para usar el contador");
    }
  }

  estadisticas(data) {
    // AdMob.showInterstitial();
    this.admobFree.interstitial.show();
    this.global.setTiendaId(data.id);
    this.navCtrl.push(Estadisticas);
  }

  proximamente() {
    this.toast.show("Poximamente", '3000', 'bottom').subscribe();
  };
}
