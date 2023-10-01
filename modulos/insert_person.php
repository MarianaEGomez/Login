<?php
require '../registro_.php/conexion.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'];
    $dni = $_POST['dni'];
    $sexo = $_POST['sexo'];

    $sql = "INSERT INTO personas (nombre, dni, sexo) VALUES (?, ?, ?)";
    $stmt = $conexion->prepare($sql);

    $stmt->bind_param("sss", $nombre, $dni, $sexo);

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
