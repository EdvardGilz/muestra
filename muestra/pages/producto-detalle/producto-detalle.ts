import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';

import { Api } from '../../providers/api';
import { CommonFunctions } from '../../providers/common-functions';

/**
 * Generated class for the ProductoDetalle page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-producto-detalle',
  templateUrl: 'producto-detalle.html',
})
export class ProductoDetalle {
  public codigo;
  public nombre;
  public precio;
  public stock;
  public id_pv = 0;
  public txtPrecio;
  public txtStock;
  public productoTipo;

  public cantidad = 0;
  public precioCompra = 0;

  public buttonDisabled = true;
  public prodData;

  constructor(public navParams: NavParams,
              public viewCtrl: ViewController,
              public api: Api,
              public commonFunctions: CommonFunctions,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {
    this.prodData = navParams.get('data');
    
    this.verificarStock();
  }

  verificarStock() {
    let loading = this.loadingCtrl.create({
      content: 'Buscando...'
    });
    loading.present();

    this.api.verificarStock(this.prodData.codigo).then((data) => {
      this.productoTipo = this.prodData.tipo;

      if (this.productoTipo == 0) {
        this.txtPrecio = "Precio de venta por unidad";
        this.txtStock = "Unidades";
      }
      else if (this.productoTipo == 1) {
        this.txtPrecio = "Precio de venta por kilo";
        this.txtStock = "Peso en gramos";
      }

      this.codigo = this.prodData.codigo;
      this.nombre = this.prodData.nombre;

      if (data.data.length > 0) {
        this.precio = data.data[0].precio;
        this.id_pv = data.data[0].id_pv;
        if (data.data[0].tipo == 1) {
          this.stock = data.data[0].peso;
        }
        else {
          this.stock = data.data[0].stock;
        }
      }
      else {
        this.stock = 0;
      }

      loading.dismiss();
    });
  }

  verificaLlenado() {
    if (this.precio && this.precio != "") {
      this.buttonDisabled = false;
    }
    else {
      this.buttonDisabled = true;
    }
  }

  guardar() {
    if (this.precio == undefined) {
      this.precio = 0;
    }
    let loading = this.loadingCtrl.create({
      content: 'Actualizando stock...'
    });
    loading.present();

    this.api.guardarStock(this.precio, this.stock, this.codigo, this.id_pv, this.productoTipo, this.cantidad, this.precioCompra)
    .then((data) => {
      if (data.success == 1) {
        this.commonFunctions.despliegaAlerta("Correcto!!", "Producto actualizado");
        this.buttonDisabled = true;
      }
      else {
        if (data.id == -1) {
          this.commonFunctions.despliegaAlerta("Error", "Producto no actualizado, vuelve a intentarlo");
          this.buttonDisabled = true;
        }
        else if (data.id == -2) {
          this.commonFunctions.despliegaAlerta("Error", "Ocurrió un error al actualizar el producto, vuelve a intentrlo");
          this.buttonDisabled = true;
        }
        else {
          this.commonFunctions.despliegaAlerta("Error", "Ocurrió un error al actualizar el producto, vuelve a intentrlo");
          this.buttonDisabled = true;
        }
      }
      loading.dismiss();
      this.cantidad = 0;
      this.precioCompra = 0;

      this.verificarStock();
    });
  }

  regresar() {
    this.viewCtrl.dismiss();
  }

  agregarStock() {
    let prompt = this.alertCtrl.create({
      title: 'Abastecer Stock',
      inputs: [
        {
          name: 'cantidad',
          placeholder: this.txtStock,
          type: 'number'
        },
        {
          name: 'precio',
          placeholder: 'Precio de compra',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: data => {
            if (data.cantidad != "" && data.precio != "") {
              this.cantidad = parseFloat(data.cantidad);
              this.precioCompra = parseFloat(data.precio);

              this.guardar();
            }
          }
        }
      ]
    });
    prompt.present();
  }

}
