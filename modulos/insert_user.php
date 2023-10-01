<?php
require '../registro_.php/conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = $_POST['usuario'];
    $rol = $_POST['rol'];
    $persona = $_POST['persona'];

    $sql = "INSERT INTO usuarios (usuario, id_rol, id_persona) VALUES (?, ?, ?)";
    $stmt = $conexion->prepare($sql);

    $stmt->bind_param("sii", $usuario, $rol, $persona);

    if ($stmt->execute()) {
        $response = array(
            "success" => true,
            "id" => $conexion->insert_id,
        );
        echo json_encode($response);
    } else {
        $response = array("success" => false);
        echo json_encode($response);
    }

    $stmt->close();
    $conexion->close();
} else {
    $response = array("success" => false);
    echo json_encode($response);
}
?>
