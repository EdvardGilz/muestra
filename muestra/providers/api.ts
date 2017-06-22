import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { SuccessModel, ProductosModel, ProductosDataModel, UserModel, 
         UserDataModel, TiendaModel, TiendaDataModel, CategoriaModel, StatsModel } from '../models/models';

import { Global } from './global';

/*
  Generated class for the Api provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Api {
  public productos: ProductosDataModel[] = [];

  constructor(public http: Http,
              public global: Global) {}
  
  loginApi(user: string, pass: string, tipo: boolean) {
    return new Promise<SuccessModel>(resolve => {
      this.http.get(`http://pointown.com/tech/api/api.php/login/${user}/${pass}/${tipo}`)
        .map(res => <SuccessModel>(res.json()))
        .subscribe(data => {
          resolve(data);
        });
    });
  }
  
  registroD(userData: UserDataModel) {
    var data = JSON.stringify(userData);
    return new Promise<SuccessModel>(resolve => {
      this.http.post(`http://pointown.com/tech/api/api.php/registroD/`, data)
        .map(res => <SuccessModel>(res.json()))
        .subscribe(data => {
          resolve(data);
        });
    });
  }
  
  registroT(tiendaData: TiendaDataModel, userData: UserDataModel) {
    var data = JSON.stringify({"tienda":tiendaData, "user":userData});
    var userId = this.global.getUser();
    
    return new Promise<SuccessModel>(resolve => {
      this.http.post(`http://pointown.com/tech/api/api.php/registroT/${userId}`, data)
        .map(res => <SuccessModel>(res.json()))
        .subscribe(data => {
          resolve(data);
        });
    });
  }
  
  verificaTienda() {
    var userId = this.global.getUser();
    var userTipo = this.global.getTipoUser();
    
    return new Promise<TiendaModel>(resolve => {
      this.http.get(`http://pointown.com/tech/api/api.php/verificaTienda/${userId}/${userTipo}`)
        .map(res => <TiendaModel>(res.json()))
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  updateTienda(tiendaData: TiendaDataModel) {
    var data = JSON.stringify(tiendaData);
    var tiendaId = this.global.getTiendaId();

    return new Promise<SuccessModel>(resolve => {
      this.http.post(`http://pointown.com/tech/api/api.php/updateTienda/${tiendaId}`, data)
        .map(res => <SuccessModel>(res.json()))
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  verificaTienda2(tiendaId) {
    return new Promise<TiendaModel>(resolve => {
      this.http.get(`http://pointown.com/tech/api/api.php/verificaTienda2/${tiendaId}`)
        .map(res => <TiendaModel>(res.json()))
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  verificaEmpleados() {
    var tiendaId = this.global.getTiendaId();

    return new Promise<UserModel>(resolve => {
      this.http.get(`http://pointown.com/tech/api/api.php/verificaEmpleados/${tiendaId}`)
        .map(res => <UserModel>(res.json()))
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  nuevoEmpleado(user: UserDataModel) {
    var tiendaId = this.global.getTiendaId();
    var username = this.global.getUsername();
    var data = JSON.stringify(user);

    return new Promise<SuccessModel>(resolve => {
      this.http.post(`http://pointown.com/tech/api/api.php/nuevoEmpleado/${tiendaId}/${username}`, data)
        .map(res => <SuccessModel>(res.json()))
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  eliminarEmpleado(empleadoId) {
    return new Promise<SuccessModel>(resolve => {
      this.http.get(`http://pointown.com/tech/api/api.php/eliminarEmpleado/${empleadoId}`)
        .map(res => <SuccessModel>(res.json()))
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  verificaUserData() {
    var userId = this.global.getUser();
    var userTipo = this.global.getTipoUser();

    return new Promise<UserModel>(resolve => {
      this.http.get(`http://pointown.com/tech/api/api.php/verificaUserData/${userId}/${userTipo}`)
        .map(res => <UserModel>(res.json()))
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  editarUserData(user: UserDataModel) {
    var userId = this.global.getUser();
    var userTipo = this.global.getTipoUser();
    var data = JSON.stringify(user);

    return new Promise<SuccessModel>(resolve => {
      this.http.post(`http://pointown.com/tech/api/api.php/editarUserData/${userId}/${userTipo}`, data)
        .map(res => <SuccessModel>(res.json()))
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  productosTodos() {
    var tiendaId = this.global.getTiendaId();

    return new Promise<ProductosModel>(resolve => {
      this.http.get(`http://pointown.com/tech/api/api.php/productosTodos/${tiendaId}`)
        .map(res => <ProductosModel>(res.json()))
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  verificarStock(codigo) {
    var tiendaId = this.global.getTiendaId();
    
    return new Promise<ProductosModel>(resolve => {
      this.http.get(`http://pointown.com/tech/api/api.php/verificarStock/${tiendaId}/${codigo}`)
        .map(res => <ProductosModel>(res.json()))
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  guardarStock(precio, stock, codigo, id_pv, productoTipo, cantidad, precioCompra) {
    var tiendaId = this.global.getTiendaId();
    
    return new Promise<SuccessModel>(resolve => {
      this.http.get(`http://pointown.com/tech/api/api.php/guardarStock/${tiendaId}/${precio}/${stock}/${codigo}/${id_pv}/${productoTipo}/${cantidad}/${precioCompra}`)
        .map(res => <SuccessModel>(res.json()))
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  buscarCodigo(codigo) {
    var tiendaId = this.global.getTiendaId();
    
    return new Promise<ProductosModel>(resolve => {
      this.http.get(`http://pointown.com/tech/api/api.php/buscarCodigo/${tiendaId}/${codigo}`)
        .map(res => <ProductosModel>(res.json()))
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  addSells() {
    this.productos = this.global.getProductList();
    var data = JSON.stringify(this.productos);
    
    return new Promise<SuccessModel>(resolve => {
      this.http.post(`http://pointown.com/tech/api/api.php/addSells/`, data)
        .map(res => <SuccessModel>(res.json()))
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getCategorias() {
    return new Promise<CategoriaModel>(resolve => {
      this.http.get(`http://pointown.com/tech/api/api.php/getCategorias/`)
        .map(res => <CategoriaModel>(res.json()))
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  addProducto(producto: ProductosDataModel) {
    var data = JSON.stringify(producto);
    
    return new Promise<SuccessModel>(resolve => {
      this.http.post(`http://pointown.com/tech/api/api.php/addProducto/`, data)
        .map(res => <SuccessModel>(res.json()))
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getStats(bandera, fecha) {
    var tiendaId = this.global.getTiendaId();

    return new Promise<StatsModel>(resolve => {
      this.http.get(`http://pointown.com/tech/api/api.php/getStats/${tiendaId}/${bandera}/${fecha}`)
        .map(res => <StatsModel>(res.json()))
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  verificaMeses() {
    var tiendaId = this.global.getTiendaId();
    var userId = this.global.getUser();

    return new Promise<StatsModel>(resolve => {
      this.http.get(`http://pointown.com/tech/api/api.php/verificaMeses/${tiendaId}/${userId}`)
        .map(res => <StatsModel>(res.json()))
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  enviarInforme(fecha) {
    var tiendaId = this.global.getTiendaId();

    return new Promise<StatsModel>(resolve => {
      this.http.get(`http://pointown.com/tech/api/api.php/enviarInforme/${tiendaId}/${fecha}`)
        .map(res => <StatsModel>(res.json()))
        .subscribe(data => {
          resolve(data);
        });
    });
  }
}
