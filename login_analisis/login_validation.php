<?php
require_once '../registro_.php/conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = $_POST['usuario'];
    $contrasena = $_POST['contrasena'];

    $sql = "SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("ss", $usuario, $contrasena);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {

        echo "Login exitoso";
    } else {
        echo "Usuario o contraseña incorrectos";
    }
}
?>
