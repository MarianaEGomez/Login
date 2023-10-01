<?php
require '../registro_.php/conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->id)) {
        $idPersona = $data->id;

        $queryUsuarios = "DELETE FROM usuarios WHERE id = ?";
        $stmtUsuarios = mysqli_prepare($conexion, $queryUsuarios);

        if ($stmtUsuarios) {
            mysqli_stmt_bind_param($stmtUsuarios, "i", $idPersona);
            $resultUsuarios = mysqli_stmt_execute($stmtUsuarios);
            mysqli_stmt_close($stmtUsuarios);
        }

        $queryPersonas = "DELETE FROM personas WHERE id = ?";
        $stmtPersonas = mysqli_prepare($conexion, $queryPersonas);

        if ($stmtPersonas) {
            mysqli_stmt_bind_param($stmtPersonas, "i", $idPersona);
            $resultPersonas = mysqli_stmt_execute($stmtPersonas);
            mysqli_stmt_close($stmtPersonas);
        }

        if ($resultUsuarios && $resultPersonas) {
            $response = array("success" => true);
        } else {
            $response = array("success" => false, "error" => mysqli_error($conexion));
        }
    } else {
        $response = array("success" => false);
    }

    header("Content-Type: application/json");
    echo json_encode($response);
} else {
    header("HTTP/1.1 400 Bad Request");
}
?>
