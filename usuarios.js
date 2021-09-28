const getHtmlUsuarios = (usuarios) => {
    let arrayDelete = [];
    let html = "";

    if (usuarios.error) {

        Swal.fire("Atencion", usuarios.error, "error");

    }

    if (usuarios.length > 0) {

        html = `<table class="table table-bordered table-hover dt-responsive tablas">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Apellido</th>
        <th scope="col">Usuario</th>
        <th scope="col">Email</th>
        <th scope="col">Telefono</th>
        <th scope="col">Domicilio</th>`
        if (localStorage.getItem("Admin") == true) { html += `<th scope="col">Acciones</th>` }
        html += `</tr>
    </thead>
    <tbody>
  `;

        

        usuarios.forEach(usuario => {            
            html += `<tr>
         <th><input type="checkbox" id="${usuario.id}" onclick="showid(id)" ></th>
         <th scope="row">${usuario.id}</th>
         <td>${usuario.nombre}</td>
         <td>${usuario.apellido}</td>
         <td>${usuario.usuario}</td>
         <td>${usuario.email}</td>
         <td>${usuario.telefono}</td>
         <td>${usuario.domicilio}</td>`
            if (localStorage.getItem("Admin") == true) {
                html += `
         <td>
        <button type="button" class="btn btn-outline-warning btn-sm " idUsuario="${usuario.id}" onClick="vistaEditarUsuario(event)">Editar</button>
         <button type="button" class="btn btn-outline-danger btn-sm btnEliminarUsuario" nombreUsuario="${usuario.nombre + " " + usuario.apellido}" idUsuario="${usuario.id}" onClick="eliminarUsuario(event)" >Eliminar</button>
         </td>`}
            html += `</tr>`

        });

        html += `  
   
     </tbody>
   </table>`;

    }

    return html;

}


btnUsuarios.addEventListener('click', async (e) => {
    e.preventDefault();
    const divBusqueda = document.createElement("div");
    divBusqueda.classList.add("divBusqueda");

    html = `
     <div class="d-flex justify-content-center"><button type="button" class="btn btn-success" id="crearUsuario" data-toggle="modal" data-target="#nuevoUsuario">Crear Usuario</button></div>
    <form>
      <div class="input-group busquedaUsuario d-flex justify-content-around">
      <input type="text" class="form-control col-4" id="nombreBusquedaUsuario" placeholder="Nombre" >
      <input type="text" class="form-control col-4" id="apellidoBusquedaUsuario" placeholder="Apellido">
      <input type="text" class="form-control col-4" id="emailBusquedaUsuario" placeholder="Email">
      <input type="text" class="form-control col-4" id="usuarioBusquedaUsuario" placeholder="Usuario">
      <button type="submit" class="btn btn-primary" id="buscarContacto" onClick="buscarUsuario(event)" >Buscar</button>
      <button type="reset" class="btn btn-danger" id="btn_borrar" onClick="borrarSeleccion(event)" >Eliminar Seleccionados</button>
      </div>
    </form> `

    divBusqueda.innerHTML = html;

    contenidoMostrar.innerHTML = '<div class="alert alert-success" role="alert">Listado de Usuarios</div>';
    contenidoMostrar.appendChild(divBusqueda);

    const divTabla = document.createElement("div");
    divTabla.classList.add("divTabla")
    contenidoMostrar.appendChild(divTabla);

});

async function buscarUsuario(e) {
    const divTabla = document.querySelector(".divTabla");

    e.preventDefault();

    try {

        divTabla.innerHTML = "";
        const nombre = document.querySelector('#nombreBusquedaUsuario').value;
        const apellido = document.querySelector('#apellidoBusquedaUsuario').value;
        const email = document.querySelector('#emailBusquedaUsuario').value;
        const usuario = document.querySelector('#usuarioBusquedaUsuario').value;

        const ext = '/v1/usuariosFiltro/';
        const cuerpo = {
            "nombre": nombre,
            "apellido": apellido,
            "email": email,
            "usuario": usuario
        };

        const metodo = 'POST';

        let usuarios = await access(url, ext, cuerpo, metodo);

        if (usuarios.error) { Swal.fire("Atencion", usuarios.error, "error"); }
        if (usuarios) {

            const tabla = getHtmlUsuarios(usuarios);
            divTabla.innerHTML = tabla;


        } else if (usuarios.error) { Swal.fire("Atencion", usuarios.error, "error"); }
        else { Swal.fire("Atencion", usuarios.error, "error"); }

    } catch (err) {
        Swal.fire("Atencion", error, "error");
    }


};

btnCrearUsuario.addEventListener('click', async (e) => {

    e.preventDefault();

    const nombre = document.querySelector('.nuevoNombreUsuario').value;
    const apellido = document.querySelector('.nuevoApellidoUsuario').value;
    const usuario = document.querySelector('.nuevoUsuarioCrear').value;
    const contrasena = document.querySelector('.nuevaContrasenaUsuario').value;
    const email = document.querySelector('.nuevoEmailUsuario').value;
    const telefono = document.querySelector('.nuevoTelefonoUsuario').value;
    const domicilio = document.querySelector('.nuevoDomicilioUsuario').value;

    try {

        const ext = '/v1/usuarios/';
        const cuerpo = {
            "nombre": nombre,
            "apellido": apellido,
            "usuario": usuario,
            "contrasena": contrasena,
            "email": email,
            "telefono": telefono,
            "domicilio": domicilio
        };

        const metodo = 'POST';

        let crearUsuario = await access(url, ext, cuerpo, metodo);

        if (crearUsuario.mensaje) {

            $('#nuevoUsuario').modal('hide');

            $('#nuevoUsuario').on('hidden.bs.modal', function (e) {
                $(this)
                    .find("input,select")
                    .val('')
                    .end();
            })

            Swal.fire("Creado!", "Usuario Creado Correctamente.", "success");
            document.querySelector(".divTabla").innerHTML = "";

        } else if (crearUsuario.error) { Swal.fire("Atencion", crearUsuario.error, "error"); }

    } catch (err) {
        Swal.fire("Atencion", error, "error");
    }


});


async function vistaEditarUsuario(e) {

    e.preventDefault();

    const idUsuario = await e.target.attributes.idUsuario.value;

    $('#editarUsuario').modal('show');
    $('#editarUsuario').on('hidden.bs.modal', function (e) {
        $(this)
            .find("input,select")
            .val('')
            .end();
    })

    try {

        const ext = '/v1/usuariosFiltro/';
        const cuerpo = {
            "id": idUsuario
        };

        const metodo = 'POST';

        const traerUsuario = await access(url, ext, cuerpo, metodo);

        if (traerUsuario) {

            document.querySelector('.editarIdUsuario').value = traerUsuario[0].id;
            document.querySelector('.editarNombreUsuario').value = traerUsuario[0].nombre;
            document.querySelector('.editarApellidoUsuario').value = traerUsuario[0].apellido;
            document.querySelector('.editarUsuarioModificar').value = traerUsuario[0].usuario;
            document.querySelector('.editarEmailUsuario').value = traerUsuario[0].email;
            document.querySelector('.editarTelefonoUsuario').value = traerUsuario[0].telefono;
            document.querySelector('.editarDomicilioUsuario').value = traerUsuario[0].domicilio;
            document.querySelector('.editarContrasenaUsuario').value = traerUsuario[0].contrasena;

        } else if (traerUsuario.error) { Swal.fire("Atencion", traerUsuario.error, "error"); }

    } catch (err) {
        Swal.fire("Atencion", error, "error");
    }

};

async function eliminarUsuario(e) {

    e.preventDefault();

    const idUsuario = await e.target.attributes.idUsuario.value;
    const nombreUsuario = await e.target.attributes.nombreUsuario.value;

    Swal.fire({
        title: `¿Está seguro que desea borrar a ${nombreUsuario}?`,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Aceptar`,
        denyButtonText: `Cancelar`,
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {

                const ext = '/v1/usuarios/';
                const cuerpo = {
                    "id": idUsuario
                };

                const metodo = 'DELETE';

                const eliminarUsuario = await access(url, ext, cuerpo, metodo);

                if (eliminarUsuario.mensaje) {

                    Swal.fire("Eliminado!", "Usuario Eliminado Correctamente.", "success");
                    document.querySelector(".divTabla").innerHTML = "";


                } else if (eliminarUsuario.error) { Swal.fire("Atencion", eliminarUsuario.error, "error"); }

            } catch (err) {
                Swal.fire("Atencion", error, "error");
            }

        } else if (result.isDenied) {
            Swal.fire("Cancelado!", "Operacion Cancelada", "info");
        }
    })

};

btnEditarUsuario.addEventListener('click', async (e) => {

    e.preventDefault();

    const id = document.querySelector('.editarIdUsuario').value;
    const nombre = document.querySelector('.editarNombreUsuario').value;
    const apellido = document.querySelector('.editarApellidoUsuario').value;
    const usuario = document.querySelector('.editarUsuarioModificar').value;
    const contrasena = document.querySelector('.editarContrasenaUsuario').value;
    const email = document.querySelector('.editarEmailUsuario').value;
    const telefono = document.querySelector('.editarTelefonoUsuario').value;
    const domicilio = document.querySelector('.editarDomicilioUsuario').value;

    try {

        const ext = '/v1/usuarios/';
        const cuerpo = {
            "id": id,
            "nombre": nombre,
            "apellido": apellido,
            "usuario": usuario,
            "contrasena": contrasena,
            "email": email,
            "telefono": telefono,
            "domicilio": domicilio
        };

        const metodo = 'PUT';

        let editarUsuario = await access(url, ext, cuerpo, metodo);

        if (editarUsuario.mensaje) {

            $('#editarUsuario').modal('hide');

            $('#editarUsuario').on('hidden.bs.modal', function (e) {
                $(this)
                    .find("input,select")
                    .val('')
                    .end();
            })

            Swal.fire("Editado!", "Usuario Editado Correctamente.", "success");
            document.querySelector(".divTabla").innerHTML = "";

        } else if (editarUsuario.error) { Swal.fire("Atencion", editarUsuario.error, "error"); }

    } catch (err) {
        Swal.fire("Atencion", error, "error");
    }


});

//borrar usuarios seleccion multiple
let arrayDelete=[]

function showid(id){
    var i = arrayDelete.indexOf(id);

    if(i !== -1){
        arrayDelete.splice(i,1);
    }else{
        arrayDelete.push(id);
    }
    
    console.log(arrayDelete);
}


async function borrarSeleccion(e) {


    let cantidadEliminar = arrayDelete.length;    
    e.preventDefault();

    if(cantidadEliminar>1){

        Swal.fire({
            title: `¿Está seguro que desea eliminar a ${cantidadEliminar} usuarios?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: `Aceptar`,
            denyButtonText: `Cancelar`,
        })
        .then(async (result) => {
            if (result.isConfirmed) {
                try {

                    const ext = '/v1/eliminarUsuariosSeleccionados/';
                    const cuerpo = arrayDelete;

                    const metodo = 'DELETE';

                    const eliminarUsuarioSeleccion = await access(url, ext, cuerpo, metodo);

                    if (eliminarUsuarioSeleccion.mensaje) {

                        await Swal.fire("Eliminados!", "Usuarios Eliminados Correctamete.", "success");
                        document.querySelector(".divTabla").innerHTML = "";
                        arrayDelete=[];
                        location.reload();

                    } else if (eliminarUsuarioSeleccion.error) { Swal.fire("Atencion", eliminarUsuarioSeleccion.error, "error"); }

                } catch (err) {
                    Swal.fire("Atencion", error, "error");
                }

            } else if (result.isDenied) {
                Swal.fire("Cancelado!", "Operacion Cancelada", "info");
            }
        })

    }else{
        if (cantidadEliminar=0){
            await Swal.fire("Error", "Debe seleccionar los usuarios.", "error");
        }else{
            await Swal.fire("Error", "Debe seleccionar mas de un usuario.", "error");
        }
        
    }
    
};