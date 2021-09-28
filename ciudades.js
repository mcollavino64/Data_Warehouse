const getHtmlCiudades = (ciudades) => {

    let html ="";

    if(ciudades.error){
        
        Swal.fire("Atencion", ciudades.error , "error");

    }

    if(ciudades.length > 0){

    html = `
    <table class="table table-bordered table-hover dt-responsive tablas">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody>` ;

 ciudades.forEach(ciudad => {

        html += `<tr>
         <th scope="row">${ciudad.ciudadID}</th>
         <td>${ciudad.ciudadDescripcion}</td>
       `       
       html += `
       <td>
       <button type="button" class="btn btn-outline-warning btn-sm btnEditarContacto" idciudad="${ciudad.ciudadID}" onClick="vistaEditarciudad(event)">Editar</button>
       <button type="button" class="btn btn-outline-danger btn-sm btnEliminarContacto" idciudad="${ciudad.ciudadID}" onClick="eliminaciudad(event)" >Eliminar</button>
     </tr>`

    });

    html += `  
   
     </tbody>
   </table>`;

} 

    return html;

}

btnCiudad.addEventListener('click', async (e) => {
    // console.log('ejecuto boton')
    e.preventDefault();
    contenidoMostrar.innerHTML = 
    '<div class="d-flex justify-content-center"><button type="button" class="btn btn-success" data-toggle="modal" data-target="#nuevoCiudad" id="btnAgregarciudad" onClick="comboPaises()" >Agregar Ciudad</button></div> <div class="alert alert-secondary" role="alert">Listado de ciudades</div>';
    const divTabla = document.createElement("div");
    divTabla.classList.add("divTabla");
    contenidoMostrar.appendChild(divTabla);

    divTabla.innerHTML = "";
    
    const ext = '/v1/ciudadesfiltro/';
    
    const cuerpo = {};

    const metodo = 'POST';

    
    let ciudades = await access(url, ext, cuerpo, metodo);
    
    if(ciudades.error){Swal.fire("Atencion", ciudades.error , "error");}
        if (ciudades) {

            const tabla = getHtmlCiudades(ciudades);
            divTabla.innerHTML = tabla;
            

        } else if (ciudades.error) { Swal.fire("Atencion", ciudades.error , "error"); }
        else { Swal.fire("Atencion", ciudades.error , "error"); }

});

async function comboPaises(){  
   
  $('#btn_modal_ciudad').html('Crear');
  $("#btn_modal_ciudad").attr("onclick","crearciudad()");

  const divAgregarciudad = document.getElementById("divCiudades");

  const ext = '/v1/PaisesCombo/';
    const cuerpo = {};    
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
          
            divAgregarciudad.innerHTML= options;

            const selectElement = document.getElementById("sel_paisID");

            selectElement.addEventListener('change', async (e) => {

              var valor = selectElement.options[selectElement.selectedIndex].value;
              
              console.log(valor);
            });


        } else if (paises.error) { Swal.fire("Atencion", paises.error , "error"); }
        else { Swal.fire("Atencion", paises.error , "error"); }
}

async function crearciudad(){
  
  const selectElement = document.getElementById("sel_paisID");
  var idPaisSel = selectElement.options[selectElement.selectedIndex].value;
  const nombreciudad = document.getElementById('nombreNuevoCiudad').value;
  
    const ext ="/v1/ciudades/"
    const cuerpo = {
      "ciudadDescripcion":nombreciudad,
      "paises_id":idPaisSel
    }
    const metod = 'POST'

    let insertciudad = await access(url, ext, cuerpo, metod);

    if(insertciudad.error){Swal.fire("Error al insertar ciudad nuevo", insertciudad.error , "error");}
        if (insertciudad) 
        {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'ciudad creado con éxito',
            showConfirmButton: false,
            timer: 1500
          })
          
          $('#nuevoCiudad').modal('hide');
          btnCiudad.click()
        }

}

async function vistaEditarciudad (e){
  e.preventDefault();
  comboPaises()
  const idciudad = await e.target.attributes.idciudad.value;
  $("#idCiudadModify").val(idciudad);

  $('#nuevoCiudad').modal('show');
  $('#btn_modal_ciudad').html('Modificar');
  $("#btn_modal_ciudad").attr("onclick","modificarciudadSelected()");

      const ext = "/v1/ciudadesFiltroID/";
      const cuerpo = {
          "id": idciudad
      };
      
      const metodo = 'POST';

      const traerciudad = await access(url, ext, cuerpo, metodo);
     
      let str = JSON.stringify(traerciudad);
      let jsonciudad = JSON.parse(str);
      let pais =jsonciudad[0].paises_id.toString();
      
      $("#nombreNuevoCiudad").val(jsonciudad[0].ciudadDescripcion);
      $("#sel_paisID").val(pais);

};

async function modificarciudadSelected(){  
  let nombreciudad = document.getElementById('nombreNuevoCiudad').value;  
  let idPaisSel = document.getElementById('sel_paisID').value;
  let idciudad = $("#idCiudadModify").val();
  
  const ext ="/v1/modificarCiudad/"
    const cuerpo = {
      "ciudadID":idciudad,
      "ciudadDescripcion":nombreciudad,
      "paises_id":idPaisSel
    }
    const method = 'PUT'

    let modifyciudad = await access(url, ext, cuerpo, method);

    if(modifyciudad.error){Swal.fire("Error al insertar ciudad nuevo", modifyciudad.error , "error");}
        if (modifyciudad) 
        {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'ciudad modificado con éxito',
            showConfirmButton: false,
            timer: 1500
          })
          
          $('#nuevoCiudad').modal('hide');
          btnCiudad.click()
        }
}

async function eliminaciudad (e){
  e.preventDefault();
  const idciudad = await e.target.attributes.idciudad.value;
  $("#idCiudadModify").val(idciudad);

  const ext = "/v1/ciudadesFiltroID/";
  const cuerpo = {
      "id": idciudad
  };
  
  const metodo = 'POST';

  const traerciudad = await access(url, ext, cuerpo, metodo);
 
  let str = JSON.stringify(traerciudad);
  let jsonciudad = JSON.parse(str)
  
  let nombreciudad = jsonciudad[0].ciudadDescripcion;
  
  Swal.fire({
    title: `Esta seguro que desea eliminar ${nombreciudad} ?`,
    showDenyButton: true,
    // showCancelButton: true,
    confirmButtonText: 'Eliminar',
    denyButtonText: `Cancelar`,
  }).then(async (result) => {    
    if (result.isConfirmed) {

        try{        
          const ext ="/v1/ciudades/";
            const cuerpo = {
              "id":idciudad
            }
            const method = 'DELETE';
        
            const eliminarciudad = await access(url, ext, cuerpo, method);
    
            console.log(eliminarciudad)
            if(eliminarciudad.error){Swal.fire("Error al eliminar ciudad nuevo", eliminarciudad.error , "error");}
                if (eliminarciudad) 
                {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'ciudad eliminado con éxito',
                    showConfirmButton: false,
                    timer: 1500
                  })                          
                  btnCiudad.click()
                }
        }catch(err){
          alert(err)
        }

    } else if (result.isDenied) {
      Swal.fire('Eliminacion Cancelada', '', 'info')
    }
  })
};

