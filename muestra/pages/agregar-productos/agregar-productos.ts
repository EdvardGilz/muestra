import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

import { Api } from '../../providers/api';
import { CommonFunctions } from '../../providers/common-functions';

import { CategoriaDataModel, ProductosDataModel } from '../../models/models';

/**
 * Generated class for the AgregarProductos page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-agregar-productos',
  templateUrl: 'agregar-productos.html',
})
export class AgregarProductos {
  public txtTipo;
  public tipo = false;
  public codigo_B;
  public nombre;
  public marca;
  public presentacion;
  public categoriasData: CategoriaDataModel[] = [];
  public categoria;
  public buttonDisabled = true;
  public producto: ProductosDataModel = new ProductosDataModel();

  constructor(public viewCtrl: ViewController, 
              public navParams: NavParams,
              public api: Api,
              public commonFunctions: CommonFunctions) {
    if (navParams.get('txt') != undefined) {
      this.nombre = navParams.get('txt');
    }
    if (navParams.get('codebar') != undefined) {
      this.codigo_B = parseInt(navParams.get('codebar'));
    }

    this.txtTipo = "Por pieza";
    api.getCategorias().then((data) => {
      if (data.success == 1) {
        this.categoriasData = data.data;
      }
      else {
        commonFunctions.despliegaAlerta("Error", "Error al cargar las categorias, Intentalo nuevamente");
      }
    });
  }

  tipoToggle() {
    if (this.tipo == false) {
      this.txtTipo = "Por pieza";
    }
    else if (this.tipo == true) {
      this.txtTipo = "A granel";
    }
  }

  verificaLlenado() {
    if (this.nombre && this.marca && this.presentacion && this.categoria && this.nombre != "" && this.marca != "" && this.presentacion != "" && this.categoria != "") {
      this.buttonDisabled = false;
    }
    else {
      this.buttonDisabled = true;
    }
  }

  guardar() {
    var tipo;
    if (this.tipo == false) {
      tipo = 0;
    }
    else {
      tipo = 1;
    }
    if (this.codigo_B == undefined || this.codigo_B == "") {
      this.codigo_B = "0";
    }

    this.producto.codigo = this.codigo_B;
    this.producto.nombre = this.nombre;
    this.producto.marca = this.marca;
    this.producto.presentacion = this.presentacion;
    this.producto.tipo = tipo;
    this.producto.categoria = this.categoria;

    this.api.addProducto(this.producto).then((data) => {
      if (data.success == 1) {
        this.commonFunctions.despliegaAlerta("Correcto", "El producto se ha agregado correctamente a la base de datos");
      }
      else {
        if (data.id == -1) {
          this.commonFunctions.despliegaAlerta("Error", "Ese codigo de barras ya está registrado");
        }
        else {
          this.commonFunctions.despliegaAlerta("Error", "Ocurrio un error, intentalo nuevamente");
        }
      }
      this.viewCtrl.dismiss();
    });
  }

  regresar() {
    this.viewCtrl.dismiss();
  }

}
