<?php
require_once 'conexion.php';

$nombre_completo = $_POST['full_name'];
$email = $_POST['email'];
$contrasenia = $_POST['password'];
$confirmar_contrasenia = $_POST['confirm_pass'];

// echo $nombre_completo;
// echo $email;
// echo $contrasenia;
// echo $confirmar_contrasenia;
$query_user = "INSERT INTO personas (nombre, id_datos_personas)
              VALUES ('$nombre_completo', 1)";

if (!mysqli_query($conexion, $query_user)) {
    die("Error al guardar en la tabla documentaciones: " . mysqli_error($conexion));
}

$id_people = mysqli_insert_id($conexion);

mysqli_close($conexion);

header("Location: Bienvenido.html");

ini_set('display_errors', 1);
error_reporting(E_ALL);

?>
