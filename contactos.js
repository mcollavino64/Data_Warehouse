const getHtml = (contactos) => {

    let html ="";

    if(contactos.error){
        
        Swal.fire("Atencion", contactos.error , "error");

    }

    if(contactos.length > 0){

    html = `<table class="table table-bordered table-hover dt-responsive tablas">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Apellido</th>
        <th scope="col">Email</th>
        <th scope="col">Telefono</th>
        <th scope="col">Pais</th>
        <th scope="col">Region</th>
        <th scope="col">Compania</th>
        <th scope="col">Cargo</th>
        <th scope="col">Canal</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody>
  `;

    contactos.forEach(contacto => {

        const arrayCanalPreferido = contacto.canal_preferido.split(',');

        html += `<tr>
         <th scope="row">${contacto.id}</th>
         <td>${contacto.nombre}</td>
         <td>${contacto.apellido}</td>
         <td>${contacto.email}</td>
         <td>${contacto.telefono}</td>
         <td>${contacto.pais}</td>
         <td>${contacto.region}</td>
         <td>${contacto.compania}</td>
         <td>${contacto.cargo}</td>
         <td>`;

         arrayCanalPreferido.forEach(element => {
             
            if (element=="Telefono"){html+=` <span class="badge badge-warning">${element}</span> `;}
            else if (element=="Email"){html+=` <span class="badge badge-danger">${element}</span> `;}
            else if (element=="Whatsapp"){html+=` <span class="badge badge-success">${element}</span> `;}
            else if (element=="Facebook"){html+=` <span class="badge badge-primary">${element}</span> `;}
            else if (element=="Twitter"){html+=` <span class="badge badge-info">${element}</span> `;}
            else {html+=` <span class="badge badge-secondary">${element}</span> `;} 
        
        });   
         
         html += `
         </td>
         <td>
         <button type="button" class="btn btn-outline-warning btn-sm btnEditarContacto" idContacto="${contacto.id}" onClick="vistaEditarContacto(event)">Editar</button>
         <button type="button" class="btn btn-outline-danger btn-sm btnEliminarContacto" nombreContacto="${contacto.nombre + " " + contacto.apellido}" idContacto="${contacto.id}" onClick="eliminarContacto(event)" >Eliminar</button>
         </td>
       </tr>`     

    });

    html += `  
   
     </tbody>
   </table>`;

} 

    return html;

}


btnContactos.addEventListener('click', async (e) => {
    e.preventDefault();
    const divBusqueda = document.createElement("div");
    divBusqueda.classList.add("divBusqueda");
    divBusqueda.innerHTML = `
    <div class="d-flex justify-content-center"><button type="button" class="btn btn-success" data-toggle="modal" data-target="#nuevoContacto">Crear Contacto</button></div>
      <form>
      <div class="input-group busquedaContacto d-flex justify-content-around">
      <input type="text" class="form-control col-4" id="nombreBusqueda" placeholder="Nombre" >
      <input type="text" class="form-control col-4" id="apellidoBusqueda" placeholder="Apellido">
      <input type="text" class="form-control col-4" id="emailBusqueda" placeholder="Email">
      <input type="text" class="form-control col-4" id="paisBusqueda" placeholder="Pais">
      <input type="text" class="form-control col-4" id="regionBusqueda" placeholder="Region">
      <input type="text" class="form-control col-4" id="companiaBusqueda" placeholder="Compania">
      <button type="submit" class="btn btn-primary" id="buscarContacto" onClick="buscarContactos(event)" >Buscar</button>
      <button type="reset" class="btn btn-danger" id="borrar" >Borrar</button>
      </div>
    </form>

  `;
  
    contenidoMostrar.innerHTML = '<div class="alert alert-info" role="alert">Listado de Contactos</div>';
    contenidoMostrar.appendChild(divBusqueda);

    const divTabla = document.createElement("div");
    divTabla.classList.add("divTabla")
    contenidoMostrar.appendChild(divTabla);

    const ext = '/v1/paises/';
    const cuerpo = {};

    const metodo = 'GET';

    const paises = await access(url, ext, cuerpo, metodo);
    const clase = ".selectNuevoPaisContacto";
    const selector = document.querySelector(clase);

    mostrarPaises(await paises, selector, clase);


});

function mostrarPaises(paises , selector ,clase){

    if(clase === ".selectNuevoPaisContacto"){

      select = "<select class='selectpicker nuevoPaisContacto' id='nuevoPaisContacto' data-live-search='true' title='Elija Pais...'>" ;
      
    } else{
        
        select = "<select class='selectpicker editarPaisContacto' id='editarPaisContacto' data-live-search='true' title='Elija Pais...'>" ;

    }
    

    paises.forEach((pais)=>{
        select += `<option value="${pais.nombre}">${pais.nombre}</option>`;
    });

    select += "</select>" 

    selector.innerHTML =select;

    $('#nuevoPaisContacto').html(select).selectpicker('refresh');
    $('#editarPaisContacto').html(select).selectpicker('refresh');
  };


async function buscarContactos (e){
    const divTabla = document.querySelector(".divTabla");

    e.preventDefault();

    try {

        divTabla.innerHTML = "";
        const nombre = document.querySelector('#nombreBusqueda').value;
        const apellido = document.querySelector('#apellidoBusqueda').value;
        const email = document.querySelector('#emailBusqueda').value;
        const pais = document.querySelector('#paisBusqueda').value;
        const region = document.querySelector('#regionBusqueda').value;
        const compania = document.querySelector('#companiaBusqueda').value;

        const ext = '/v1/contactosFiltro/';
        const cuerpo = {
            "nombre": nombre,
            "apellido": apellido,
            "email": email,
            "pais": pais,
            "region": region,
            "compania": compania
        };

        const metodo = 'POST';

        let contactos = await access(url, ext, cuerpo, metodo);

        if (contactos) {

            const tabla = getHtml(contactos);
            divTabla.innerHTML = tabla;


        } else if (contactos.error) { alert(contactos.error); }
        else { alert("No hay contactos para mostar") }

    } catch (err) {
        alert(err)
    }


};

btnCrearContacto.addEventListener('click', async (e) => {

    e.preventDefault();

    const nombre = document.querySelector('.nuevoNombreContacto').value;
    const apellido = document.querySelector('.nuevoApellidoContacto').value;
    const email = document.querySelector('.nuevoEmailContacto').value;
    const telefono = document.querySelector('.nuevoTelefonoContacto').value;
    const pais = document.querySelector('#nuevoPaisContacto').value;
    const compania = document.querySelector('.nuevaCompaniaContacto').value;
    const cargo = document.querySelector('.nuevoCargoContacto').value;
    const canal = document.querySelectorAll('#nuevoCanalContacto option:checked');
    const mapCanal  = Array.from(canal).map(el => el.value);
    const valCanal = mapCanal.toString();  

    try {

        const ext = '/v1/contactos/';
        const cuerpo = {
            "nombre": nombre,
            "apellido": apellido,
            "email": email,
            "telefono": telefono,
            "pais": pais,
            "compania":compania,
            "cargo" : cargo,
            "canal_preferido" : valCanal
        };

        const metodo = 'POST';

        let crearContacto = await access(url, ext, cuerpo, metodo);

        if (crearContacto.mensaje) {

            $('#nuevoContacto').modal('hide');
            
            $('#nuevoContacto').on('hidden.bs.modal', function (e) {
                $(this)
                  .find("input, select")
                     .val('')
                     .end();
              })

              $("#nuevoPaisContacto").val('default');
              $("#nuevoPaisContacto").selectpicker("refresh");
              

              Swal.fire("Creado!", "Contacto Creado Correctamente.", "success");
              document.querySelector(".divTabla").innerHTML ="";

        } else if (crearContacto.error) { alert(crearContacto.error); }

    } catch (err) {
        alert(err)
    }


});

async function vistaEditarContacto (e){

    e.preventDefault();

    const idContacto = await e.target.attributes.idContacto.value;

    $('#editarContacto').modal('show');
    $('#editarContacto').on('hidden.bs.modal', function (e) {
        $(this)
          .find("input,select")
             .val('')
             .end();
      })

    try {

        const ext = '/v1/contactosFiltro/';
        const cuerpo = {
            "id": idContacto
        };

        const metodo = 'POST';

        const traerContacto = await access(url, ext, cuerpo, metodo);

        if (traerContacto) {

            const ext = '/v1/paises/';
            const cuerpo = {};
        
            const metodo = 'GET';
        
            const paises = await access(url, ext, cuerpo, metodo);
            const clase = ".selectEditarPaisContacto";
            const selector = document.querySelector(clase);
        
            mostrarPaises(await paises, selector, clase);

            const canalesPreferidos = traerContacto[0].canal_preferido.split(",");
            const paisSeleccionado = traerContacto[0].pais;

            document.querySelector('.editarIdContacto').value = traerContacto[0].id;
            document.querySelector('.editarNombreContacto').value = traerContacto[0].nombre;
            document.querySelector('.editarApellidoContacto').value = traerContacto[0].apellido;
            document.querySelector('.editarEmailContacto').value = traerContacto[0].email;
            document.querySelector('.editarTelefonoContacto').value = traerContacto[0].telefono;
            document.querySelector('.editarPaisContacto').value = traerContacto[0].pais;
            document.querySelector('.editarCompaniaContacto').value= traerContacto[0].compania;
            document.querySelector('.editarCargoContacto').value = traerContacto[0].cargo;
            document.querySelectorAll('.editarCanalContacto option').forEach( o => {

                if(canalesPreferidos.indexOf(o.value) != -1){

                    o.selected = "selected";

                }

            })

            document.querySelectorAll('.editarPaisContacto option').forEach( o => {

                if(paisSeleccionado == o.value){

                    o.selected = "selected";
                    o.html = o.value;

                }

            })
            $('select[name=selValue]').val(1); $('.selectpicker').selectpicker('refresh');
        } else if (traerContacto.error) { alert(traerContacto.error); }

    }catch (err) {
        alert(err)
    }
    
};

async function eliminarContacto (e){

    e.preventDefault();
    
    const idContacto = await e.target.attributes.idContacto.value;
    const nombreContacto = await e.target.attributes.nombreContacto.value;

    Swal.fire({
        title: `¿Está seguro que desea borrar a ${nombreContacto}?`,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Aceptar`,
        denyButtonText: `Cancelar`,
      }).then(async (result)  => {
        if (result.isConfirmed) {
                    try {

            const ext = '/v1/contactos/';
            const cuerpo = {
                "id": idContacto
            };
    
            const metodo = 'DELETE';
    
            const eliminarContacto = await access(url, ext, cuerpo, metodo);

            if (eliminarContacto.mensaje) {

                Swal.fire("Eliminado!", "Contacto Eliminado Correctamente.", "success");
                document.querySelector(".divTabla").innerHTML ="";
    
    
            } else if (crearContacto.error) { alert(crearContacto.error); }

        }catch (err) {
            alert(err)
        }
          
        } else if (result.isDenied) {
          Swal.fire("Cancelado!", "Operacion Cancelada", "info");
        }
      })

};

btnEditarContacto.addEventListener('click', async (e) => {

    e.preventDefault();

    const id = document.querySelector('.editarIdContacto').value;
    const nombre = document.querySelector('.editarNombreContacto').value;
    const apellido = document.querySelector('.editarApellidoContacto').value;
    const email = document.querySelector('.editarEmailContacto').value;
    const telefono = document.querySelector('.editarTelefonoContacto').value;
    const pais = document.querySelector('#editarPaisContacto').value;
    const compania = document.querySelector('.editarCompaniaContacto').value;
    const cargo = document.querySelector('.editarCargoContacto').value;
    const canal = document.querySelectorAll('#editarCanalContacto option:checked');
    const mapCanal  = Array.from(canal).map(el => el.value);
    const valCanal = mapCanal.toString();  

    try {

        const ext = '/v1/contactos/';
        const cuerpo = {
            "id":id,
            "nombre": nombre,
            "apellido": apellido,
            "email": email,
            "telefono": telefono,
            "pais": pais,
            "compania":compania,
            "cargo" : cargo,
            "canal_preferido" : valCanal
        };

        const metodo = 'PUT';

        let editarContacto = await access(url, ext, cuerpo, metodo);

        if (editarContacto.mensaje) {

            $('#editarContacto').modal('hide');
            
            $('#editarContacto').on('hidden.bs.modal', function (e) {
                $(this)
                  .find("input,select")
                     .val('')
                     .end();
              })

              Swal.fire("Editado!", "Contacto Editado Correctamente.", "success");
              document.querySelector(".divTabla").innerHTML ="";

        } else if (editarContacto.error) { alert(editarContacto.error); }

    } catch (err) {
        alert(err)
    }


});