<?php
require '../registro_.php/conexion.php'; 

$query = "SELECT id, nombre, dni, sexo FROM personas";
$result = mysqli_query($conexion, $query);

if (!$result) {
    die("Error en la consulta: " . mysqli_error($conexion));
}

$queryUsuarios = "SELECT id, usuario, email, id_rol, id_persona FROM usuarios";
$resultUsuarios = mysqli_query($conexion, $queryUsuarios);

if (!$resultUsuarios) {
    die("Error en la consulta de usuarios: " . mysqli_error($conexion));
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="../style_dashboard.css">
</head>
<body>
    <div class="sidebar">
        <h1>Panel de control</h1>
        <ul>
            <li><a href="#people">Personas</a></li>
            <li><a href="#user">Usuarios</a></li>
        </ul>
    </div>
    
    <div class="content">
        <header>
            <h2>Módulo de Personas</h2>
        </header>
        <div>
            <button id="agregar-btn">Agregar</button>
        </div>
        <main>
            <table id="people">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Dni</th>
                        <th>Sexo</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    while ($row = mysqli_fetch_assoc($result)) {
                        echo "<tr>";
                        echo "<td>" . $row['id'] . "</td>";
                        echo "<td><span class='editable'>" . $row['nombre'] . "</span></td>";
                        echo "<td><span class='editable'>" . $row['dni'] . "</span></td>";
                        echo "<td><span class='editable'>" . $row['sexo'] . "</span></td>";
                        echo "<td>";
                        echo "<button class='editar-btn' onclick='editarFila(this)'>Editar</button>";
                        echo "<button class='guardar-btn' onclick='guardarFila(this)' style='display:none'>Guardar</button>";
                        echo "<button class='descartar-btn' onclick='descartarFila(this)' style='display:none'>Descartar</button>";
                        echo "</td>";
                        echo "<td>";
                        echo "<button class='eliminar-btn' onclick='eliminarFila(this, " . $row['id'] . ")' style='display:inline-block'>Eliminar</button>";     
                        echo "</td>";
                        echo "</tr>";
                    }
                    ?>
                </tbody>
            </table>
        </main>
        <header>
            <h2>Módulo de Usuarios</h2>
        </header>
        <div>
            <button id="agregar-usuario-btn">Agregar</button>
        </div>
        <main>
            <table id="usuarios">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Usuario</th>
                        <!-- <th>Email</th> -->
                        <th>Rol</th>
                        <th>Persona asignada</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    while ($row = mysqli_fetch_assoc($resultUsuarios)) {
                        echo "<tr>";
                        echo "<td>" . $row['id'] . "</td>";
                        echo "<td><span class='editable'>" . $row['usuario'] . "</span></td>";
                        // echo "<td><span class='editable'>" . $row['email'] . "</span></td>";
                        echo "<td><span class='editable'>" . $row['id_rol'] . "</span></td>";
                        echo "<td><span class='editable'>" . $row['id_persona'] . "</span></td>";
                        echo "<td>";
                        echo "<button class='editar-btn' onclick='editarFilaUsuario(this)'>Editar</button>";
                        echo "<button class='guardar-btn' onclick='guardarFilaUsuario(this)' style='display:none'>Guardar</button>";
                        echo "<button class='descartar-btn' onclick='descartarFilaUsuario(this)' style='display:none'>Descartar</button>";
                        echo "</td>";
                        echo "<td>";
                        echo "<button class='eliminar-btn' onclick='eliminarFilaUsuario(this, " . $row['id'] . ")' style='display:inline-block'>Eliminar</button>";     
                        echo "</td>";
                        echo "</tr>";
                    }
                    ?>
                </tbody>
            </table>
        </main>
    </div>
    <script src="../script_validations.js"></script>
    <script src="../script_validations_user.js"></script>
</body>
</html>
