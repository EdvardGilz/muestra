<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {
	header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
	header('Access-Control-Allow-Credentials: true');
	header('Access-Control-Max-Age: 86400');
}
      
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
	// header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
	header("Access-Control-Allow-Methods: GET, POST");
	  
	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
	header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
}

require_once 'conexion.php';

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));

$respuesta = array();

switch ($request[0]) {
	case 'guardarC':
		$respuesta = guardarC($request);
		break;
	case 'buscarC':
		$respuesta = buscarC($request);
		break;
	case 'loginC':
		$respuesta = loginC($request);
		break;
	case 'altaAdmin':
		$respuesta = altaAdmin($request);
		break;
	case 'buscaAdmin':
		$respuesta = buscaAdmin($request);
		break;
	case 'buscaUsuarios':
		$respuesta = buscaUsuarios($request);
		break;
	case 'guardarUser':
		$respuesta = guardarUser($request);
		break;
	case 'loginUsuario':
		$respuesta = loginUsuario($request);
		break;
	case 'pagar':
		$respuesta = pagar($request);
		break;
	case 'buscarIngresos':
		$respuesta = buscarIngresos($request);
		break;
	default:
		break;
}

function guardarC($request) {
	$success = 0;
	$valInt = 0;
	
	if (count($request) == 3) {
		$nombre = $request[1];
		$pass = $request[2];
		
		$conexion = new Conexion(); // INSTANCIA
		
		$val = $conexion->guardarC($nombre, $pass);
		$valInt = (int)$val; // PARSEO
		
		if ($valInt >= 1) {
			$success = 1;
		}
	}
	
	$res = ["success"=>$success, "id"=>$valInt];
	
	return $res;
}

function buscarC($request) {
	$success = 0;
	$valInt = 0;
	
	if (count($request) == 2) {
		$nombre = $request[1];
		
		$conexion = new Conexion(); // INSTANCIA
		
		$val = $conexion->buscarC($nombre);
		$valInt = (int)$val; // PARSEO
		
		if ($valInt >= 1) {
			$success = 1;
		}
	}
	
	$res = ["success"=>$success, "id"=>$valInt];
	
	return $res;
}

function loginC($request) {
	$success = 0;
	$valInt = 0;
	
	if (count($request) == 3) {
		$id = $request[1];
		$pass = $request[2];
		
		$conexion = new Conexion(); // INSTANCIA
		
		$val = $conexion->loginC($id, $pass);
		$valInt = (int)$val; // PARSEO
		
		if ($valInt == 1) {
			$success = 1;
		}
	}
	
	$res = ["success"=>$success, "id"=>$valInt];
	
	return $res;
}

function altaAdmin($request) {
	$success = 0;
	$valInt = 0;
	
	if (count($request) == 2) {
		$id = $request[1];
		
		$conexion = new Conexion(); // INSTANCIA
		
		$val = $conexion->altaAdmin($id);
		$valInt = (int)$val; // PARSEO
		
		if ($valInt >= 1) {
			$success = 1;
		}
	}
	
	$res = ["success"=>$success, "id"=>$valInt];
	
	return $res;
}

function buscaAdmin($request) {
	$success = 0;
	$valInt = 0;
	
	if (count($request) == 2) {
		$id = $request[1];
		
		$conexion = new Conexion(); // INSTANCIA
		
		$val = $conexion->buscaAdmin($id);
		$valInt = (int)$val; // PARSEO
		
		if ($valInt >= 1) {
			$success = 1;
		}
	}
	
	$res = ["success"=>$success, "id"=>$valInt];
	
	return $res;
}

function buscaUsuarios($request) {
	$success = 0;

	if (count($request) == 2) {
		$id = $request[1];
		
		$conexion = new Conexion(); // INSTANCIA

		$val = $conexion->buscaUsuarios($id);

		if (count($val) != 0) {
			$success = 1;
		}
	}

	$res = ["success"=>$success, "data"=>$val];

	return $res;
}

function guardarUser($request) {
	$success = 0;
	$valInt = 0;
	
	if (count($request) == 4) {
		$id = $request[1];
		$pass = $request[2];
		$dpto = $request[3];
		
		$conexion = new Conexion(); // INSTANCIA
		
		$val = $conexion->guardarUser($id, $pass, $dpto);
		$valInt = (int)$val; // PARSEO
		
		if ($valInt == 1) {
			$success = 1;
		}
	}
	
	$res = ["success"=>$success, "id"=>$valInt];
	
	return $res;
}

function loginUsuario($request) {
	$success = 0;
	$valInt = 0;
	
	if (count($request) == 4) {
		$id = $request[1];
		$user = $request[2];
		$pass = $request[3];
		
		$conexion = new Conexion(); // INSTANCIA
		
		$val = $conexion->loginUsuario($id, $user, $pass);
		$valInt = (int)$val; // PARSEO
		
		if ($valInt == 1) {
			$success = 1;
		}
	}

	$res = ["success"=>$success, "id"=>$valInt];
	
	return $res;
}

function pagar($request) {
	$success = 0;
	$valInt = 0;
	
	$data = file_get_contents("php://input");
	$obj = json_decode($data, true);
	
	if (count($request) == 1) {
		
		$conexion = new Conexion(); // INSTANCIA
		
		$val = $conexion->pagar($obj);
		$valInt = (int)$val; // PARSEO
		
		if ($valInt >= 1) {
			$success = 1;
		}
	}

	$res = ["success"=>$success, "id"=>$valInt];
	
	return $res;
}

function buscarIngresos($request) {
	$success = 0;

	if (count($request) == 2) {
		$id = $request[1];
		
		$conexion = new Conexion(); // INSTANCIA

		$val = $conexion->buscarIngresos($id);

		if (count($val) != 0) {
			$success = 1;
		}
	}

	$res = ["success"=>$success, "data"=>$val];

	return $res;
}

print_r(json_encode($respuesta));
