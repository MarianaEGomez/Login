function editarFila(btn) {
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

function descartarFila(btn) {
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

function eliminarFila(btn, idPersona) {
    const fila = btn.closest("tr");
    console.log("ID DELETE: ", idPersona);

    const data = { id: idPersona };
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
            alert("Registro eliminado correctamente");
        } else {
            alert("Error al eliminar el registro");
        }
    })
    .catch(error => {
        console.error("Error en la solicitud AJAX: " + error);
    });
}



function guardarFila(btn) {
    console.log("DATOS 1", btn);
    const fila = btn.closest("tr");
    console.log("DATOS 2", fila);
    const id_btn = fila.querySelector("td:first-child").textContent;
    const nombreInput = fila.querySelector("td:nth-child(2) input");
    const dniInput = fila.querySelector("td:nth-child(3) input");
    const sexoInput = fila.querySelector("td:nth-child(4) input");
    const nombre_btn = nombreInput.value;
    const dni_btn = dniInput.value;
    const sexo_btn = sexoInput.value;
    console.log("DATOS 3", nombre_btn);
    console.log("DATOS 4", dni_btn);
    console.log("DATOS 5", sexo_btn);

    const formData = new FormData();
    formData.append("id", id_btn);
    formData.append("nombre", nombre_btn);
    formData.append("dni", dni_btn);
    formData.append("sexo", sexo_btn);
    console.log("DATOS 6", formData);
    fetch("dashboard_edit.php", {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
        
            nombreInput.style.display = "none";
            dniInput.style.display = "none";
            sexoInput.style.display = "none";
            fila.querySelector("td:nth-child(2) .editable").textContent = nombre_btn;
            fila.querySelector("td:nth-child(3) .editable").textContent = dni_btn;
            fila.querySelector("td:nth-child(4) .editable").textContent = sexo_btn;

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

// Agregar una nueva fila a la tabla
function agregarFila() {
    console.log("HACE CASO")
    const tabla = document.querySelector("table tbody");
    const nuevaFila = document.createElement("tr");
    nuevaFila.innerHTML = `
        <td></td>
        <td><input type="text" class="nuevo-nombre" placeholder="Nombre"></td>
        <td><input type="text" class="nuevo-dni" placeholder="Dni"></td>
        <td><input type="text" class="nuevo-sexo" placeholder="Sexo"></td>
        <td>
            <button class='guardar-nuevo-btn' onclick='guardarNuevaFila(this)'>Guardar</button>
            <button class='descartar-nuevo-btn' onclick='descartarNuevaFila(this)'>Descartar</button>
        </td>
    `;
    tabla.appendChild(nuevaFila);
}

function guardarNuevaFila(btn) {
    const fila = btn.closest("tr");
    const nombreInput = fila.querySelector(".nuevo-nombre");
    const dniInput = fila.querySelector(".nuevo-dni");
    const sexoInput = fila.querySelector(".nuevo-sexo");

    const nombre = nombreInput.value;
    const dni = dniInput.value;
    const sexo = sexoInput.value;

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("dni", dni);
    formData.append("sexo", sexo);

    fetch("insert_person.php", {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Agregar la nueva fila con los datos ingresados
            const tabla = document.querySelector("table tbody");
            const nuevaFila = document.createElement("tr");
            nuevaFila.innerHTML = `
                <td>${data.id}</td>
                <td><span class='editable'>${nombre}</span></td>
                <td><span class='editable'>${dni}</span></td>
                <td><span class='editable'>${sexo}</span></td>
                <td>
                    <button class='editar-btn' onclick='editarFila(this)'>Editar</button>
                    <button class='guardar-btn' onclick='guardarFila(this)' style='display:none'>Guardar</button>
                    <button class='descartar-btn' onclick='descartarFila(this)' style='display:none'>Descartar</button>
                </td>
                <td>
                    <button class='eliminar-btn' onclick='eliminarFila(this, ${data.id})' style='display:inline-block'>Eliminar</button>
                </td>
            `;
            tabla.appendChild(nuevaFila);
            fila.style.display = "none";
            // Ocultar los campos de texto y mostrar los datos en la nueva fila
            nombreInput.style.display = "none";
            dniInput.style.display = "none";
            sexoInput.style.display = "none";
            nuevaFila.querySelector("td:nth-child(2) .editable").textContent = nombre;
            nuevaFila.querySelector("td:nth-child(3) .editable").textContent = dni;
            nuevaFila.querySelector("td:nth-child(4) .editable").textContent = sexo;
    
            // Limpiar campos de entrada y ocultar botones de guardar y descartar
            nombreInput.value = "";
            dniInput.value = "";
            sexoInput.value = "";
    
            const guardarBtn = fila.querySelector(".guardar-nuevo-btn");
            const descartarBtn = fila.querySelector(".descartar-nuevo-btn");
            guardarBtn.style.display = "none";
            descartarBtn.style.display = "none";
    
            alert("Nueva persona agregada correctamente");
        } else {
            alert("Error al agregar la nueva persona");
        }
    })
    .catch(error => {
        console.error("Error en la solicitud AJAX: " + error);
    });
}

function descartarNuevaFila(btn) {
    const fila = btn.closest("tr");
    fila.remove();
}

const agregarBtn = document.querySelector("#agregar-btn");
agregarBtn.addEventListener("click", agregarFila);