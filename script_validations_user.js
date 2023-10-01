function editarFilaUsuario(btn) {
    const fila = btn.closest("tr");
    const elementosEditables = fila.querySelectorAll(".editable");

    const valoresOriginales = [];
    elementosEditables.forEach((elemento) => {
        const valor = elemento.textContent;
        const input = document.createElement("input");
        input.type = "text";
        input.value = valor;
        elemento.textContent = "";
        elemento.appendChild(input);
        valoresOriginales.push(valor);
    });
    
    const editarBtn = fila.querySelector(".editar-btn");
    const guardarBtn = fila.querySelector(".guardar-btn");
    const descartarBtn = fila.querySelector(".descartar-btn");
    const eliminarBtn = fila.querySelector(".eliminar-btn");

    editarBtn.style.display = "none";
    guardarBtn.style.display = "inline-block";
    descartarBtn.style.display = "inline-block";
    eliminarBtn.style.display = "none";

    fila.dataset.valoresOriginales = JSON.stringify(valoresOriginales);
}

function descartarFilaUsuario(btn) {
    const fila = btn.closest("tr");
    const elementosEditables = fila.querySelectorAll(".editable");
    const valoresOriginales = JSON.parse(fila.dataset.valoresOriginales);

    elementosEditables.forEach((elemento, index) => {
        elemento.textContent = valoresOriginales[index];
    });

    const editarBtn = fila.querySelector(".editar-btn");
    const guardarBtn = fila.querySelector(".guardar-btn");
    const descartarBtn = fila.querySelector(".descartar-btn");
    const eliminarBtn = fila.querySelector(".eliminar-btn");

    editarBtn.style.display = "inline-block";
    guardarBtn.style.display = "none";
    descartarBtn.style.display = "none";
    eliminarBtn.style.display = "inline-block";
}

function eliminarFilaUsuario(btn, idUsuario) {
    const fila = btn.closest("tr");

    const data = { id: idUsuario };
    fetch("delete_user.php", {
        method: "POST",
        body: JSON.stringify(data), 
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            fila.remove();
            alert("Usuario eliminado correctamente");
        } else {
            alert("Error al eliminar el usuario");
        }
    })
    .catch(error => {
        console.error("Error en la solicitud AJAX: " + error);
    });
}

function guardarFilaUsuario(btn) {
    console.log("FOrmulario user btn", btn);
    const fila = btn.closest("tr");
    console.log("FOrmulario user fila", fila);
    const idUsuario = fila.querySelector("td:first-child").textContent;
    const usuarioInput = fila.querySelector("td:nth-child(2) input");
    // const emailInput = fila.querySelector("td:nth-child(3) input");
    const rolInput = fila.querySelector("td:nth-child(3) input");
    const personaInput = fila.querySelector("td:nth-child(4) input");

    const nuevoUsuario = usuarioInput.value;
    // const nuevoEmail = emailInput.value;
    const nuevoRol = rolInput.value;
    const nuevaPersona = personaInput.value;
    console.log("Id usuario", idUsuario);
    console.log("usuario input", nuevoUsuario);
    console.log("role", nuevoRol);
    console.log("persona id", nuevaPersona);
    const formData = new FormData();
    formData.append("id", idUsuario);
    formData.append("usuario", nuevoUsuario);
    // formData.append("email", nuevoEmail);
    formData.append("rol", nuevoRol);
    formData.append("persona", nuevaPersona);
    console.log("FOrmulario user", formData);
    fetch("dashboard_edit_usuario.php", {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            usuarioInput.style.display = "none";
            // emailInput.style.display = "none";
            rolInput.style.display = "none";
            personaInput.style.display = "none";
            fila.querySelector("td:nth-child(2) .editable").textContent = nuevoUsuario;
            fila.querySelector("td:nth-child(3) .editable").textContent = nuevoRol;
            fila.querySelector("td:nth-child(4) .editable").textContent = nuevaPersona;

            const editarBtn = fila.querySelector(".editar-btn");
            const guardarBtn = fila.querySelector(".guardar-btn");
            const descartarBtn = fila.querySelector(".descartar-btn");
            const eliminarBtn = fila.querySelector(".eliminar-btn");

            editarBtn.style.display = "inline-block";
            guardarBtn.style.display = "none";
            descartarBtn.style.display = "none";
            eliminarBtn.style.display = "inline-block";

            alert("Cambios guardados correctamente");
        } else {
            alert("Error al guardar los cambios");
        }
    })
    .catch(error => {
        console.error("Error en la solicitud AJAX: " + error);
    });
}

function agregarFilaUsuario() {
    const tabla = document.querySelector("#usuarios tbody");
    const nuevaFila = document.createElement("tr");
    nuevaFila.innerHTML = `
        <td></td>
        <td><input type="text" class="nuevo-usuario" placeholder="Usuario"></td>
        <!-- Agrega campos adicionales para el nuevo usuario -->
        <td><input type="text" class="nuevo-rol" placeholder="Rol"></td>
        <td><input type="text" class="nueva-persona" placeholder="Persona asignada"></td>
        <td>
            <button class='guardar-nuevo-btn' onclick='guardarNuevaFilaUsuario(this)'>Guardar</button>
            <button class='descartar-nuevo-btn' onclick='descartarNuevaFilaUsuario(this)'>Descartar</button>
        </td>
    `;
    tabla.appendChild(nuevaFila);
}


function guardarNuevaFilaUsuario(btn) {
    const fila = btn.closest("tr");
    const usuarioInput = fila.querySelector(".nuevo-usuario");
    const rolInput = fila.querySelector(".nuevo-rol");
    const personaInput = fila.querySelector(".nueva-persona");

    const nuevoUsuario = usuarioInput.value;
    const nuevoRol = rolInput.value;
    const nuevaPersona = personaInput.value;

    const formData = new FormData();
    formData.append("usuario", nuevoUsuario);
    formData.append("rol", nuevoRol);
    formData.append("persona", nuevaPersona);

    fetch("insert_user.php", {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const tabla = document.querySelector("#usuarios tbody");
            const nuevaFila = document.createElement("tr");
            nuevaFila.innerHTML = `
                <td>${data.id}</td>
                <td><span class='editable'>${nuevoUsuario}</span></td>
                <td><span class='editable'>${nuevoRol}</span></td>
                <td><span class='editable'>${nuevaPersona}</span></td>
                <td>
                    <button class='editar-btn' onclick='editarFilaUsuario(this)'>Editar</button>
                    <button class='guardar-btn' onclick='guardarFilaUsuario(this)' style='display:none'>Guardar</button>
                    <button class='descartar-btn' onclick='descartarFilaUsuario(this)' style='display:none'>Descartar</button>
                </td>
                <td>
                    <button class='eliminar-btn' onclick='eliminarFilaUsuario(this, ${data.id})' style='display:inline-block'>Eliminar</button>
                </td>
            `;
            tabla.appendChild(nuevaFila);
            fila.style.display = "none";
            usuarioInput.style.display = "none";
            rolInput.style.display = "none";
            personaInput.style.display = "none";

            const guardarBtn = fila.querySelector(".guardar-nuevo-btn");
            const descartarBtn = fila.querySelector(".descartar-nuevo-btn");
            guardarBtn.style.display = "none";
            descartarBtn.style.display = "none";

            alert("Nuevo usuario agregado correctamente");
        } else {
            alert("Error al agregar el nuevo usuario");
        }
    })
    .catch(error => {
        console.error("Error en la solicitud AJAX: " + error);
    });
}


function descartarNuevaFilaUsuario(btn) {
    const fila = btn.closest("tr");
    fila.remove();
}

const agregarUsuarioBtn = document.querySelector("#agregar-usuario-btn");
agregarUsuarioBtn.addEventListener("click", agregarFilaUsuario);

