<?php
require '../registro_.php/conexion.php';

$formData = $_POST; 

$id = $formData["id"];
$nombre = $formData["nombre"];
$dni = $formData["dni"];
$sexo = $formData["sexo"];

$query = "UPDATE personas SET nombre = ?, dni = ?, sexo = ? WHERE id = ?";
$stmt = mysqli_prepare($conexion, $query);

if ($stmt) {
    mysqli_stmt_bind_param($stmt, "sssi", $nombre, $dni, $sexo, $id);
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
