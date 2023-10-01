<?php
require '../registro_.php/conexion.php';

$formData = $_POST; 

$id = $formData["id"];
$usuario = $formData["usuario"];
$rol = $formData["rol"];
$persona = $formData["persona"];

$query = "UPDATE usuarios SET usuario = ?, id_rol = ?, id_persona = ? WHERE id = ?";
$stmt = mysqli_prepare($conexion, $query);

if ($stmt) {
    mysqli_stmt_bind_param($stmt, "ssii", $usuario, $rol, $persona, $id);
    $result = mysqli_stmt_execute($stmt);

    if ($result) {
        $response = array("success" => true);
    } else {
        $response = array("success" => false);
    }

    mysqli_stmt_close($stmt);
} else {
    $response = array("success" => false);
}

header("Content-Type: application/json");
echo json_encode($response);
?>
