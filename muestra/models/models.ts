export class SuccessModel {
	success: number;
	id: number;
}

export class TiendaModel {
	success: number;
	data: Array<TiendaDataModel>;
}

export class TiendaDataModel {
	id: number;
	nombre: string;
	calle: string;
	num_ext: string;
	num_int: string;
	cp: number;
	colonia: string;
	municipio: string;
	estado: string;
	pais: string;
	hora_a: string;
	hora_c: string;
	dias: string;
	promedio: number;
	sumaStock: number;
	sumaVentas: number;
	empleados: number;
}

export class ProductosModel {
	success: number;
	data: Array<ProductosDataModel>;
}

export class ProductosDataModel {
	id_pv: number;
	codigo: string;
	precio: number;
	nombre: string;
	tipo: number;
	stock: number;
	cantidad: number;
	total: number;
	activo: boolean;
	peso: number;
	marca: string;
	presentacion: string;
	categoria: number;
	color: string;
}

export class UserModel {
	success: number;
	data: Array<UserDataModel>;
}

export class UserDataModel {
	username: string;
	password: string;
	passwordPrev: string;
	mail: string;
	idTienda: number;
	nombre: string;
	ap_p: string;
	ap_m: string;
	tel: string;
	idEmpleado: number;
}

export class CategoriaModel {
	success: number;
	data: Array<CategoriaDataModel>;
}

export class CategoriaDataModel {
	id: number;
	descripcion: string;
}

export class StatsModel {
	success: number;
	data: Array<StatsDataModel>;
}

export class StatsDataModel {
	totalMes: number;
	totalInvertido: number;
	totalVentas: number;
	totalStock: number;
	totalVendidos: number;
	masVendido: string;
	fecha: string;
	fechaVal: string;
	checked: boolean;
}