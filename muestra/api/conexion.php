<?php
class Conexion {
	private $mysqli;
	private $firstday;
	private $lastday;
	private $mes;
	
	public function __construct() {
		
		define("host", "localhost");
		define("user", "root");
		define("pas", "root");
		define("db", "admCondominios");
		
		$this->mysqli = new mysqli(host, user, pas, db);
		
		if ($this->mysqli->connect_error) {
			die('Error de Conexión');
		}
		
		$this->mysqli->set_charset("utf8");
		date_default_timezone_set('America/Mexico_City');
		
		// $query_date = date('Y-m-d');
		// $date = new DateTime($query_date);
// 		
		// //First day of month
		// $date->modify('first day of this month');
		// $this->firstday = $date->format('Y-m-d')." 00:00:00";
		// //Last day of month
		// $date->modify('last day of this month');
		// $this->lastday = $date->format('Y-m-d')." 23:59:59";
// 		
		// $this->mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
	}
	
	public function guardarC($nombre, $pass) {
		$res = 1;
		$passHash;
		
		$resultado = $this->mysqli->query("SELECT * FROM condominio WHERE nombre LIKE '".$nombre."' ");
		
		if ($resultado->num_rows > 0) {
			$res = -1; // YA EXISTE ESE NOMBRE DE CONDOMINIO
		}
		
		if ($res == 1) {
			$passHash = password_hash($pass, PASSWORD_DEFAULT);
			if ($this->mysqli->query("INSERT INTO `condominio`(`id_condominio`, `nombre`, `pass`) VALUES (NULL, '".$nombre."', '".$passHash."')") === TRUE) {
				$res = $this->mysqli->insert_id;
			}
			else {
				$res = 0; // ERROR AL INSERTAR
			}
		}
		
		return $res;
	}
	
	public function buscarC($nombre) {
		$res = 0;
		
		$resultado = $this->mysqli->query("SELECT * FROM condominio WHERE nombre LIKE '".$nombre."' ");
		
		if ($resultado->num_rows > 0) {
			while ($row = $resultado->fetch_array(MYSQLI_ASSOC)) {
				$res = $row['id_condominio'];
			}
		}
	
		return $res;
	}
	
	public function loginC($id, $pass) {
		$res = 0;
		
		$resultado = $this->mysqli->query("SELECT * FROM condominio WHERE id_condominio = ".$id." ");
		
		if ($resultado->num_rows > 0) {
			while ($row = $resultado->fetch_array(MYSQLI_ASSOC)) {
				if (password_verify($pass, $row['pass'])) {
					$res = 1;
				}
			}
		}
	
		return $res;
	}
	
	public function altaAdmin($id) {
		$res = 0;
		
		if ($this->mysqli->query("INSERT INTO `usuarios`(`id_usuario`, `id_condominio`, `admin`, `numero`, `pass`) VALUES (NULL, ".$id.", 1, 'N/A', 'N/A')") === TRUE) {
			$res = $this->mysqli->insert_id;
		}
		
		return $res;
	}
	
	public function buscaAdmin($id) {
		$res = 0;
		
		$resultado = $this->mysqli->query("SELECT * FROM usuarios WHERE id_condominio = ".$id." AND admin = 1 ");
		
		if ($resultado->num_rows > 0) {
			while ($row = $resultado->fetch_array(MYSQLI_ASSOC)) {
				$res = $row['id_usuario'];
			}
		}
	
		return $res;
	}
	
	public function buscaUsuarios($id) {
		$data = array();
	
		$resultado = $this->mysqli->query("SELECT * FROM usuarios WHERE id_condominio = ".$id." AND admin = 0 ");
		
		if ($resultado->num_rows > 0) {
			while ($row = $resultado->fetch_array(MYSQLI_ASSOC)) {
				array_push($data, ["id"=>$row['id_usuario'], "dpto"=>$row['numero'] ]);
			}
		}
	
		return $data;
	}
	
	public function guardarUser($id, $pass, $dpto) {
		$res = 0;
		$passHash = password_hash($pass, PASSWORD_DEFAULT);
		
		$resultado = $this->mysqli->query("SELECT * FROM usuarios WHERE id_condominio = ".$id." AND numero = '".$dpto."' ");
		
		if ($resultado->num_rows > 0) {
			$res = 1;
		}
		
		if ($res == 0) {
			if ($this->mysqli->query("INSERT INTO `usuarios`(`id_usuario`, `id_condominio`, `admin`, `numero`, `pass`) VALUES (NULL, ".$id.", 0, '".$dpto."', '".$passHash."')") === TRUE) {
				$res = 1;
			}
		}
		else {
			$res = -1; // YA EXISTE
		}
		
		
		return $res;
	}
	
	public function loginUsuario($id, $user, $pass) {
		$res = 0;
	
		$resultado = $this->mysqli->query("SELECT * FROM usuarios WHERE id_condominio = ".$id." AND numero = '".$user."' ");
		
		if ($resultado->num_rows > 0) {
			while ($row = $resultado->fetch_array(MYSQLI_ASSOC)) {
				if (password_verify($pass, $row['pass'])) {
					$res = 1;
				}
				else {
					$res = -1; // CONTRASEÑA INCORRECTA
				}
			}
		}
		else {
			$res = -2; // USUARIO NO ENCONTRADO
		}
	
		return $res;
	}
	
	public function pagar($data) {
		$res = 0;
		
		if ($this->mysqli->query("INSERT INTO `ingresos`(`id_pagos`, `id_condominio`, `id_usuario`, `cantidad`, `fecha`, `notas`) VALUES (NULL, ".$data['data']['idCondominio'].", ".$data['data']['idUser'].", ".$data['data']['cantidad'].", '".date("Y-m-d")."', '".$data['data']['nota']."')") === TRUE) {
			$res = $this->mysqli->insert_id;
		}
		
		return $res;
	}
	
	public function buscarIngresos($id) {
		$data = array();
	
		$resultado = $this->mysqli->query("SELECT cantidad, fecha, notas, numero FROM ingresos INNER JOIN usuarios ON ingresos.id_usuario = usuarios.id_usuario WHERE ingresos.id_condominio = ".$id." ");
		
		if ($resultado->num_rows > 0) {
			while ($row = $resultado->fetch_array(MYSQLI_ASSOC)) {
				array_push($data, ["cantidad"=>$row['cantidad'], "fecha"=>$row['fecha'], "nota"=>$row['notas'], "dpto"=>$row['numero'] ]);
			}
		}
	
		return $data;
	}
	
	public function __destruct() {
		$this->mysqli->close();
	}
}
?>