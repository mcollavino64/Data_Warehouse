const getHtml = (contactos) => {

    let html ="";

    if(contactos.error){
        
        Swal.fire("Atencion", contactos.error , "error");

    }

    if(contactos.length > 0){

    html = `<table class="table table-bordered table-hover dt-responsive tablas">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Apellido</th>
        <th scope="col">Email</th>
        <th scope="col">Telefono</th>        
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
        <th><input type="checkbox" id="${contacto.id}" onclick="showidContact(id)" ></th>
         <th scope="row">${contacto.id}</th>
         <td>${contacto.nombre}</td>
         <td>${contacto.apellido}</td>
         <td>${contacto.email}</td>
         <td>${contacto.telefono}</td>               
         <td>${contacto.compania_companiaID}</td>
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
    <div class="d-flex justify-content-center"><button type="button" class="btn btn-success" data-toggle="modal" data-target="#nuevoContacto" onClick="comboRegionesContacto()" >Crear Contacto</button></div>
      <form>
      <div class="input-group busquedaContacto d-flex justify-content-around">
      <input type="text" class="form-control col-4" id="nombreBusqueda" placeholder="Nombre" >
      <input type="text" class="form-control col-4" id="apellidoBusqueda" placeholder="Apellido">
      <input type="text" class="form-control col-4" id="emailBusqueda" placeholder="Email">            
      <input type="text" class="form-control col-4" id="companiaBusqueda" placeholder="Compania">
      <button type="submit" class="btn btn-primary" id="buscarContacto" onClick="buscarContactos(event)" >Buscar</button>
      <button type="reset" class="btn btn-danger" id="borrar" >Borrar Filtros</button>
      <button type="reset" class="btn btn-secondary" id="btn_borrar" onClick="borrarSeleccionContactos(event)" >Eliminar Seleccionados</button>
      </div>
    </form>`
    ;
  
    contenidoMostrar.innerHTML = '<div class="alert alert-info" role="alert">Listado de Contactos</div>';
    contenidoMostrar.appendChild(divBusqueda);

    const divTabla = document.createElement("div");
    divTabla.classList.add("divTabla")
    contenidoMostrar.appendChild(divTabla);


});


async function buscarContactos (e){
    const divTabla = document.querySelector(".divTabla");

    e.preventDefault();

    try {

        divTabla.innerHTML = "";
        const nombre = document.querySelector('#nombreBusqueda').value;
        const apellido = document.querySelector('#apellidoBusqueda').value;
        const email = document.querySelector('#emailBusqueda').value;
        // const pais = document.querySelector('#paisBusqueda').value;
        // const region = document.querySelector('#regionBusqueda').value;
        const compania = document.querySelector('#companiaBusqueda').value;

        const ext = '/v1/contactosFiltro/';
        const cuerpo = {
            "nombre": nombre,
            "apellido": apellido,
            "email": email,
            // "pais": pais,
            // "region": region,
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

    const ciudadSeleccionada = $('#ciudadIdAddContact').val();        
    const compania = $('#companiaIdAddContact').val();      

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
            "compania":compania,
            "cargo" : cargo,
            "canal_preferido" : valCanal,            
            "compania_companiaID": compania,
            "ciudad_ciudadID" : ciudadSeleccionada
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
         
              Swal.fire("Creado!", "Contacto Creado Correctamente.", "success");
              document.querySelector(".divTabla").innerHTML ="";

        } else if (crearContacto.error) { alert(crearContacto.error); }

    } catch (err) {
        alert(err)
    }
});

async function vistaEditarContacto (e){
    
    e.preventDefault();

    comboCompaniasEditContacto()
    
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
                    
            const canalesPreferidos = traerContacto[0].canal_preferido.split(",");
            const paisSeleccionado = traerContacto[0].pais;

            document.querySelector('.editarIdContacto').value = traerContacto[0].id;
            document.querySelector('.editarNombreContacto').value = traerContacto[0].nombre;
            document.querySelector('.editarApellidoContacto').value = traerContacto[0].apellido;
            document.querySelector('.editarEmailContacto').value = traerContacto[0].email;
            document.querySelector('.editarTelefonoContacto').value = traerContacto[0].telefono;
            // document.querySelector('.editarPaisContacto').value = traerContacto[0].pais;
            // document.querySelector('.editarCompaniaContacto').value= traerContacto[0].compania;
            $("#sel_companiaEditContactID").val(traerContacto[0].compania_companiaID);
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


btnEditarContacto.addEventListener('click', async (e) => {

    e.preventDefault();

    const id = document.querySelector('.editarIdContacto').value;
    const nombre = document.querySelector('.editarNombreContacto').value;
    const apellido = document.querySelector('.editarApellidoContacto').value;
    const email = document.querySelector('.editarEmailContacto').value;
    const telefono = document.querySelector('.editarTelefonoContacto').value;
    // const pais = document.querySelector('#editarPaisContacto').value;
    // const compania = document.querySelector('.editarCompaniaContacto').value;
    const cargo = document.querySelector('.editarCargoContacto').value;
    const canal = document.querySelectorAll('#editarCanalContacto option:checked');
    const mapCanal  = Array.from(canal).map(el => el.value);
    const valCanal = mapCanal.toString();  
    const compania =$("#sel_companiaEditContactID").val();

    try {

        const ext = '/v1/contactos/';
        const cuerpo = {
            "id":id,
            "nombre": nombre,
            "apellido": apellido,
            "email": email,
            "telefono": telefono,            
            "compania_companiaID":compania,
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


async function comboRegionesContacto(){  
    comboCompaniasContacto()
  
    const divAgregarRegion = document.getElementById("divRegionesContacto");
  
    const ext = '/v1/regiones/';
      const cuerpo = {};    
      const metodo = 'POST';
  
      let regiones = await access(url, ext, cuerpo, metodo);
  
      if(regiones.error){Swal.fire("Atencion", regiones.error , "error");}
          if (regiones) {
  
            let str = JSON.stringify(regiones);
            let json = JSON.parse(str)          
            
            options = '<select id="sel_regionID">' ;
  
              for (var i=0; i< json.length; i++){                
                  options +='<option value ="' + json[i].RegionID + '">'
                  +  json[i].RegionDescripcion + '</option>';
              }
  
              options += '</select>';
            
              divAgregarRegion.innerHTML= options;
  
              const selectElement = document.getElementById("sel_regionID");
  
              selectElement.addEventListener('change', async (e) => {
                var valor = selectElement.options[selectElement.selectedIndex].value;
                comboPaisesContacto(valor)                
              });
  
  
          } else if (regiones.error) { Swal.fire("Atencion", regiones.error , "error"); }
          else { Swal.fire("Atencion", regiones.error , "error"); }
  }

  async function comboPaisesContacto(RegionID){  
  
    const divAgregarPais = document.getElementById("divPaisesContacto");
  
    const ext = '/v1/paisesFiltroRegion/';
      const cuerpo = {
          Region_RegionID:RegionID
      };    
      const metodo = 'POST';
  
      let paises = await access(url, ext, cuerpo, metodo);
  
      if(paises.error){Swal.fire("Atencion", paises.error , "error");}
          if (paises) {
  
            let str = JSON.stringify(paises);
            let json = JSON.parse(str)          
            
            options = '<select id="sel_paisID">' ;
  
              for (var i=0; i< json.length; i++){                
                  options +='<option value ="' + json[i].id + '">'
                  +  json[i].nombre + '</option>';
              }
  
              options += '</select>';
            
              divAgregarPais.innerHTML= options;
  
              const selectElement = document.getElementById("sel_paisID");
  
              selectElement.addEventListener('change', async (e) => {
  
                var valor = selectElement.options[selectElement.selectedIndex].value;
                comboCiudadesContacto(valor)
                
              });
  
  
          } else if (paises.error) { Swal.fire("Atencion", paises.error , "error"); }
          else { Swal.fire("Atencion", paises.error , "error"); }
  }

  async function comboCiudadesContacto(paises_id){  
       
    const divAgregarCiudades = document.getElementById("divCiudadesContacto");
  
    const ext ="/v1/ciudadesfiltroPais/";
      const cuerpo = {
        paises_id:paises_id
      };    
      const metodo = 'POST';
  
      let ciudades = await access(url, ext, cuerpo, metodo);
  
      if(ciudades.error){Swal.fire("Atencion", ciudades.error , "error");}
          if (ciudades) {
  
            let str = JSON.stringify(ciudades);
            let json = JSON.parse(str)          
            
            options = '<select id="sel_ciudadID">' ;
  
              for (var i=0; i< json.length; i++){                
                  options +='<option value ="' + json[i].ciudadID + '">'
                  +  json[i].ciudadDescripcion + '</option>';
              }
  
              options += '</select>';
            
              divAgregarCiudades.innerHTML= options;
  
              const selectElement = document.getElementById("sel_ciudadID");
              var valor = selectElement.options[selectElement.selectedIndex].value;
                
                $('#ciudadIdAddContact').val(valor);
            //   selectElement.addEventListener('change', async (e) => {
  
            //   var valor = selectElement.options[selectElement.selectedIndex].value;
                
            //     $('#ciudadIdAddContact').val(valor);
            //   });
  
  
          } else if (ciudades.error) { Swal.fire("Atencion", ciudades.error , "error"); }
          else { Swal.fire("Atencion", ciudades.error , "error"); }
  }

  let arrayDeleteContacts=[]
  function showidContact(id){
    var i = arrayDeleteContacts.indexOf(id);

    if(i !== -1){
        arrayDeleteContacts.splice(i,1);
    }else{
        arrayDeleteContacts.push(id);
    }
    
    console.log(arrayDeleteContacts);
}

  async function borrarSeleccionContactos(e) {


    let cantidadContactosEliminar = arrayDeleteContacts.length;    
    e.preventDefault();

    if(cantidadContactosEliminar>1){

        Swal.fire({
            title: `¿Está seguro que desea eliminar a ${cantidadContactosEliminar} contactos?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: `Aceptar`,
            denyButtonText: `Cancelar`,
        })
        .then(async (result) => {
            if (result.isConfirmed) {
                try {

                    const ext = '/v1/eliminarContactosSeleccionados/';
                    const cuerpo = arrayDeleteContacts;

                    const metodo = 'DELETE';

                    const eliminarUsuarioSeleccion = await access(url, ext, cuerpo, metodo);

                    if (eliminarUsuarioSeleccion.mensaje) {

                        await Swal.fire("Eliminados!", "Contactos Eliminados Correctamete.", "success");
                        document.querySelector(".divTabla").innerHTML = "";
                        arrayDeleteContacts=[];
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
        if (cantidadContactosEliminar=0){
            await Swal.fire("Error", "Debe seleccionar los contactos.", "error");
        }else{
            await Swal.fire("Error", "Debe seleccionar mas de un contacto.", "error");
        }
        
    }
    
};

async function comboCompaniasContacto(){  
    
    const divAgregarRegion = document.getElementById("divCompaniasContacto");
  
    const ext = '/v1/companiasFiltro/';
      const cuerpo = {};    
      const metodo = 'POST';
  
      let companias = await access(url, ext, cuerpo, metodo);
  
      if(companias.error){Swal.fire("Atencion", companias.error , "error");}
          if (companias) {
  
            let str = JSON.stringify(companias);
            let json = JSON.parse(str)          
            
            options = '<select id="sel_companiaContactID">' ;
  
              for (var i=0; i< json.length; i++){                
                  options +='<option value ="' + json[i].companiaID + '">'
                  +  json[i].companiaDescripcion + '</option>';
              }
  
              options += '</select>';
            
              divAgregarRegion.innerHTML= options;
  
              const selectElementCompania = document.getElementById("sel_companiaContactID");
              var valorCompania = selectElementCompania.options[selectElementCompania.selectedIndex].value;                              
              $('#companiaIdAddContact').val(valorCompania);

              selectElementCompania.addEventListener('change', async (e) => {
                var valorCompania = selectElementCompania.options[selectElementCompania.selectedIndex].value;
                $('#companiaIdAddContact').val(valorCompania);
                console.log(valorCompania);
              });
  
  
          } else if (companias.error) { Swal.fire("Atencion", companias.error , "error"); }
          else { Swal.fire("Atencion", companias.error , "error"); }
  }

  async function comboCompaniasEditContacto(){  
    
    const divAgregarRegion = document.getElementById("divCompaniasContactoEdit");
  
    const ext = '/v1/companiasFiltro/';
      const cuerpo = {};    
      const metodo = 'POST';
  
      let companias = await access(url, ext, cuerpo, metodo);
  
      if(companias.error){Swal.fire("Atencion", companias.error , "error");}
          if (companias) {
  
            let str = JSON.stringify(companias);
            let json = JSON.parse(str)          
            
            options = '<select id="sel_companiaEditContactID">' ;
  
              for (var i=0; i< json.length; i++){                
                  options +='<option value ="' + json[i].companiaID + '">'
                  +  json[i].companiaDescripcion + '</option>';
              }
  
              options += '</select>';
            
              divAgregarRegion.innerHTML= options;
  
              const selectElementCompania = document.getElementById("sel_companiaEditContactID");
              var valorCompania = selectElementCompania.options[selectElementCompania.selectedIndex].value;                              
              $('#companiaIdAddContact').val(valorCompania);

              selectElementCompania.addEventListener('change', async (e) => {
                var valorCompania = selectElementCompania.options[selectElementCompania.selectedIndex].value;
                $('#companiaIdAddContact').val(valorCompania);
                console.log(valorCompania);
              });
  
  
          } else if (companias.error) { Swal.fire("Atencion", companias.error , "error"); }
          else { Swal.fire("Atencion", companias.error , "error"); }
  }
  
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