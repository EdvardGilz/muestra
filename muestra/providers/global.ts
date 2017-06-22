import { Injectable } from '@angular/core';

import { ProductosDataModel, TiendaDataModel, TiendaModel } from '../models/models';

/*
  Generated class for the Global provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Global {
  public idUsuario: number;
  public tipoUser: boolean;
  public plataforma: number; // 0 = NAVEGADOR, 1 = MOVIL
  public productos: ProductosDataModel[] = [];
  public producto: ProductosDataModel;
  public tienda: TiendaDataModel = new TiendaDataModel();
  public tiendaData: TiendaModel;
  public tiendaId;
  public username: string;
  public nuevo: number;

  constructor() {}

  setUser(user) {
    this.idUsuario = user;
  }
  
  getUser() {
    return this.idUsuario;
  }
  
  setTipoUser(tipoUser) {
    this.tipoUser = tipoUser;
  }
  
  getTipoUser() {
    return this.tipoUser;
  }
  
  setPlataforma(plataforma) {
    this.plataforma = plataforma;
  }
  
  getPlataforma() {
    return this.plataforma;
  }
  
  setProductList(productList) {
    this.productos = productList;
  }
  
  getProductList() {
    return this.productos;
  }
  
  setProducto(data) {
    this.producto = data;
  }
  
  getProducto() {
    return this.producto;
  }
  
  setUsername(username) {
    this.username = username;
  }
  
  getUsername() {
    return this.username;
  }
  
  setTiendaData1(nombre, hora_a, hora_c, dias) {
    this.tienda.nombre = nombre;
    this.tienda.hora_a = hora_a;
    this.tienda.hora_c = hora_c;
    this.tienda.dias = dias;
  }

  getTiendaData1() {
    return this.tienda;
  }
  
  setTiendaData2(calle, num_e, num_i, cp, colonia, municipio, pais, estado) {
    this.tienda.calle = calle;
    this.tienda.num_ext = num_e;
    this.tienda.num_int = num_i;
    this.tienda.cp = cp;
    this.tienda.colonia = colonia;
    this.tienda.municipio = municipio;
    this.tienda.pais = pais;
    this.tienda.estado = estado;
  }

  getTiendaData2() {
    return this.tienda;
  }
  
  getTiendaData() {
    return this.tienda;
  }

  clearTiendaData() {
    this.tienda.nombre = null;
    this.tienda.hora_a = null;
    this.tienda.hora_c = null;
    this.tienda.dias = null;
    this.tienda.calle = null;
    this.tienda.num_ext = null;
    this.tienda.num_int = null;
    this.tienda.cp = null;
    this.tienda.colonia = null;
    this.tienda.municipio = null;
    this.tienda.pais = null;
    this.tienda.estado = null;
  }

  setTiendasData(data) {
    this.tiendaData = data;
  }

  getTiendasData() {
    return this.tiendaData;
  }

  setNuevaTienda(data) {
    this.nuevo = data;
  }

  getNuevaTienda() {
    return this.nuevo;
  }

  setTiendaId(id) {
    this.tiendaId = id;
  }

  getTiendaId() {
    return this.tiendaId;
  }
}
