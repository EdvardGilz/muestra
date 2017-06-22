import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AdMobFree } from '@ionic-native/admob-free';

import { Api } from '../../providers/api';
import { Global } from '../../providers/global';
import { CommonFunctions } from '../../providers/common-functions';

import { ProductosDataModel } from '../../models/models';

/**
 * Generated class for the Cuenta page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cuenta',
  templateUrl: 'cuenta.html',
})
export class Cuenta {
  public barcode: string;
  public userId: number;
  public cheked: boolean;
  public productos: ProductosDataModel[] = [];
  public buttonDisabled = true;
  public sumatoria: number = 0;
  public pesos = ["100", "250", "500", "otro"];
  public percentPrev;

  constructor(public navCtrl: NavController,
              public global: Global,
              public alertCtrl: AlertController,
              public api: Api,
              public commonFunctions: CommonFunctions,
              public loadingCtrl: LoadingController,
              private barcodeScanner: BarcodeScanner,
              private admobFree: AdMobFree) {
    this.userId = global.getUser();
    this.admobFree.banner.show();
  }

  scanner(tipo) {
    if (tipo == 2) {
      let prompt = this.alertCtrl.create({
        title: 'Buscar',
        message: "Busca por código o por nombre de producto",
        inputs: [
          {
            name: 'codigo',
            placeholder: 'Código/Producto'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Buscar',
            handler: data => {
              this.barcode = data.codigo;
              this.buscarCodigo();
            }
          }
        ]
      });
      prompt.present();
    }
    else if (tipo == 1) {
      this.barcodeScanner.scan().then((barcodeData) => {
        this.barcode = barcodeData.text;

        if (barcodeData.format == "UPC_A") {
          if (barcodeData.text.length > 12) {
            this.barcode = this.barcode.substring(1);
          }
        }
        this.buscarCodigo();
      }, (err) => {
        this.commonFunctions.despliegaAlerta("Error", "Error al leer el codigo, intentalo nuevamente");
        this.barcode = "error";
      })
    }
  }

  buscarCodigo() {
    let loading = this.loadingCtrl.create({
      content: 'Buscando...'
    });
    loading.present();

    this.api.buscarCodigo(this.barcode).then((data) => {
      
      if (data.success == 1) {
        if (data.data.length > 1) {
          let alert = this.alertCtrl.create();
          
          alert.setTitle('Productos');
          
          for (var i=0; i < data.data.length; i++) {
            
            if (i == 0) {
              this.cheked = true;
            }
            else {
              this.cheked = false;
            }
            
            alert.addInput({
              type: 'radio',
              label: data.data[i].nombre + ", " + data.data[i].presentacion + ", " + data.data[i].marca,
              value: String(i),
              checked: this.cheked
            });
          }
          
          alert.addButton({
            text: 'Ok',
            handler: dataRes => {
              data.data[dataRes].cantidad = 1;
              if (data.data[dataRes].tipo == 1) {
                this.selectPeso(data.data[dataRes], 0);
              }
              else {
                this.sumar(data.data[dataRes]);
              }
            }
          });
          
          alert.present();
        }
        else {
          data.data[0].cantidad = 1;
          if (data.data[0].tipo == 1) {
            this.selectPeso(data.data[0], 0);
          }
          else {
            this.sumar(data.data[0]);
          }
        }
      }
      else {
        this.commonFunctions.despliegaAlerta("Error", "Producto no encontrado");
      }

      loading.dismiss();
    });
  }

  sumar(data) {
    if (data.stock >= data.cantidad) {
      data.total = data.precio * data.cantidad;
      this.productos.push(data);
      this.buttonDisabled = false;
      this.sumatoria += data.total;
    }
    else {
      this.commonFunctions.despliegaAlerta("Falta de Stock", "Ya no hay stock");
    }
  }
  
  restar(item) {
    this.sumatoria -= this.productos[item].total;
    this.productos.splice(item, 1);
    if (this.productos.length < 1) {
      this.buttonDisabled = true;
    }
  }
  
  selectPeso(dataVal, tipo) {
    var data;

    if (tipo == 0) {
      data = dataVal;
    }
    else {
      data = this.productos[dataVal];
    }
    
    var extra;
    var precioPrev = 0;

    if (data.total) {
      precioPrev = data.total;
    }
    
    let alert = this.alertCtrl.create();
    alert.setTitle('Peso');
    
    for (var i=0; i < this.pesos.length; i++) {
              
      if (i == 0) {
        this.cheked = true;
      }
      else {
        this.cheked = false;
      }
      if (i == this.pesos.length-1) {
        extra = "";
      }
      else {
        extra = " gr";
      }
      
      alert.addInput({
        type: 'radio',
        label: String(this.pesos[i]) + extra,
        value: String(i),
        checked: this.cheked
      });
    }
    
    alert.addButton({
      text: 'Ok',
      handler: dataRes => {
        if (dataRes == this.pesos.length-1) {
          this.selectPeso2(data, tipo, precioPrev);
        }
        else {
          data.cantidad = parseInt(this.pesos[dataRes]);
          data.total = data.precio * data.cantidad / 1000;
                  
          if (data.peso >= data.cantidad) {
            if (tipo == 1) {
              this.sumatoria -= precioPrev;
            }
            this.sumatoria += data.total;
            if (tipo == 0) {
              this.productos.push(data);
              this.buttonDisabled = false;
            }
          }
          else {
            this.sumatoria -= precioPrev;
            data.cantidad = 0;
            data.total = 0;
            if (this.sumatoria <= 0) {
              this.buttonDisabled = true;
            }
            this.commonFunctions.despliegaAlerta("Falta de Stock", "Ya no hay stock");
          }
        }
      }
    });
    alert.present();
  }
  
  selectPeso2(data, tipo, precioPrev) {
    let prompt = this.alertCtrl.create({
      title: 'Peso o precio',
      inputs: [
        {
          name: 'peso',
          placeholder: 'Peso en gramos',
          type: 'tel'
        },
        {
          name: 'precio',
          placeholder: 'Precio',
          type: 'tel'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: dataRes => {
            if (dataRes.peso != "" || dataRes.precio != "") {
              if (dataRes.peso != "") {
                data.cantidad = parseInt(dataRes.peso);
                data.total = data.precio * data.cantidad / 1000;
              }
              else if (dataRes.precio != "") {
                data.total = parseInt(dataRes.precio);
                data.cantidad = dataRes.precio * 1000 / data.precio;
              }
              
              if (data.peso >= data.cantidad) {
                if (tipo == 1) {
                  this.sumatoria -= precioPrev;
                }
                this.sumatoria += data.total;
                
                if (tipo == 0) {
                  this.productos.push(data);
                  this.buttonDisabled = false;
                }
              }
              else {
                this.sumatoria -= precioPrev;
                data.cantidad = 0;
                data.total = 0;
                if (this.sumatoria <= 0) {
                  this.buttonDisabled = true;
                }
                this.commonFunctions.despliegaAlerta("Falta de Stock", "Ya no hay stock");
              }
            }
          }
        }
      ]
    });
    prompt.present();
  }
  
  addCantidad(index) {
    if (this.productos[index].stock > this.productos[index].cantidad) {
      this.productos[index].cantidad += 1;
      this.productos[index].total = this.productos[index].precio * this.productos[index].cantidad;
      this.sumatoria += this.productos[index].precio;
    }
  }
  
  removeCantidad(index) {
    if (this.productos[index].cantidad > 1) {
      this.productos[index].cantidad -= 1;
      this.productos[index].total = this.productos[index].precio * this.productos[index].cantidad;
      this.sumatoria -= this.productos[index].precio;
    }
  }
  
  save() {
    if (this.productos.length > 0) {
      let loading = this.loadingCtrl.create({
        content: 'Procesando compra...'
      });
      loading.present();

      this.global.setProductList(this.productos);

      this.api.addSells().then((data) => {
        loading.dismiss();
        if (data.success == 1) {
          this.commonFunctions.despliegaAlerta("Procesada", "Compra procesada con exito<br>Total vendido: $" + this.sumatoria.toFixed(2));
          this.navCtrl.pop();
        }
        else {
          this.commonFunctions.despliegaAlerta("Error", "Intentalo de nuevo");
        }
      });
    }
  }

  regresar() {
    this.navCtrl.pop();
  }

}
