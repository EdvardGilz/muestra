import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AdMobFree } from '@ionic-native/admob-free';

import { Api } from '../../providers/api';
import { CommonFunctions } from '../../providers/common-functions';

import { ProductosDataModel } from '../../models/models';

import { ProductoDetalle } from '../producto-detalle/producto-detalle';
import { AgregarProductos } from '../agregar-productos/agregar-productos';

/**
 * Generated class for the Productos page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-productos',
  templateUrl: 'productos.html',
})
export class Productos {
  public barcode;
  public productosAll: ProductosDataModel[] = [];
  public productosAllBK: ProductosDataModel[] = [];
  public txtSearchBar;
  public color;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public api: Api,
              public commonFunctions: CommonFunctions,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private barcodeScanner: BarcodeScanner,
              private admobFree: AdMobFree) {
    // AdMob.createBanner({
    //   adId: 'ca-app-pub-1057257651261369/8330356336',
    //   isTesting: false,
    //   autoShow: true,
    //   position: 'TOP_CENTER'
    // });
    this.admobFree.banner.show();
  }

  ionViewWillEnter() {
    this.limpiarSearchbar();
  }

  getAllProducts() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando datos'
    });
    loading.present();

    this.api.productosTodos().then((data) => {
      for (var i in data.data) {
        if (data.data[i].tipo == 0) {
          if (data.data[i].stock < 5) {
            data.data[i].color = "danger";
          }
          else {
            data.data[i].color = "secondary";
          }
        }
        else {
          if (data.data[i].stock < 250) {
            data.data[i].color = "danger";
          }
          else {
            data.data[i].color = "secondary";
          }
        }
      }
      this.productosAll = data.data;
      this.productosAllBK = data.data;
      loading.dismiss();
    });
  }

  scanner() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.barcode = barcodeData.text;

      if (barcodeData.format == "UPC_A") {
        if (barcodeData.text.length > 12) {
          this.barcode = this.barcode.substring(1);
        }
      }
      this.searchProduct(this.barcode, 1);
    }, (err) => {
      this.commonFunctions.despliegaAlerta("Error", "Error al leer el codigo, intentalo nuevamente");
    })
  }

  searchProduct(ev, tipo) {
    if (tipo == 0) {
      var val = ev.target.value;
      this.productosAll = this.productosAllBK;
      if (val && val.trim() != '') {
        this.productosAll = this.productosAll.filter((item) => {
          console.log(item.nombre);
          return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.marca.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }
    else if (tipo == 1) {
      this.productosAll = this.productosAllBK;
      var val = ev;
      if (val && val.trim() != '') {
        this.productosAll = this.productosAll.filter((item) => {
          return (item.codigo.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }
    
    if (this.productosAll.length <= 0) {
      let alert = this.alertCtrl.create({
        title: "Producto no encontrado",
        subTitle: "Quieres agregar el producto??",
        buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: data => {
                this.limpiarSearchbar();
              }
            },
            {
              text: 'Aceptar',
              handler: data => {
                let modal = this.modalCtrl.create(AgregarProductos, {txt: this.txtSearchBar, codebar: this.barcode});
                modal.onDidDismiss(() => {
                  this.limpiarSearchbar();
                });
                modal.present();
              }
            }
          ]
      });
      alert.present();
    }
    
  }

  limpiarSearchbar() {
    this.getAllProducts();
    this.txtSearchBar = "";
  }

  verificarStock(data) {
    let modal = this.modalCtrl.create(ProductoDetalle, {data: data});
    modal.onDidDismiss(() => {
      this.limpiarSearchbar();
    });
    modal.present();
  }

  regresar() {
    this.navCtrl.pop();
  }

}
