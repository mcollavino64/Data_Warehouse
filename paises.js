const getHtmlPaises = (paises) => {

    let html ="";

    if(paises.error){
        
        Swal.fire("Atencion", paises.error , "error");

    }

    if(paises.length > 0){

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

 paises.forEach(pais => {

        html += `<tr>
         <th scope="row">${pais.id}</th>
         <td>${pais.nombre}</td>
       `       
       html += `
       <td>
       <button type="button" class="btn btn-outline-warning btn-sm btnEditarContacto" idPais="${pais.id}" onClick="vistaEditarPais(event)">Editar</button>
       <button type="button" class="btn btn-outline-danger btn-sm btnEliminarContacto" idPais="${pais.id}" onClick="eliminaPais(event)" >Eliminar</button>
     </tr>`

    });

    html += `  
   
     </tbody>
   </table>`;

} 

    return html;

}

btnPais.addEventListener('click', async (e) => {

    e.preventDefault();

    contenidoMostrar.innerHTML = 
    '<div class="d-flex justify-content-center"><button type="button" class="btn btn-success" data-toggle="modal" data-target="#nuevoPais" id="btnAgregarPais" onClick="comboRegiones()" >Agregar País</button></div> <div class="alert alert-secondary" role="alert">Listado de Paises</div>';
    const divTabla = document.createElement("div");
    divTabla.classList.add("divTabla")
    contenidoMostrar.appendChild(divTabla);

    divTabla.innerHTML = "";

    const ext = '/v1/paisesFiltro/';
    const cuerpo = {};

    const metodo = 'POST';

    let paises = await access(url, ext, cuerpo, metodo);

    if(paises.error){Swal.fire("Atencion", paises.error , "error");}
        if (paises) {

            const tabla = getHtmlPaises(paises);
            divTabla.innerHTML = tabla;


        } else if (paises.error) { Swal.fire("Atencion", paises.error , "error"); }
        else { Swal.fire("Atencion", paises.error , "error"); }

});

async function comboRegiones(){  
   
  $('#btn_modal_pais').html('Crear');
  $("#btn_modal_pais").attr("onclick","crearPais()");

  const divAgregarPais = document.getElementById("divRegiones");

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
          
            divAgregarPais.innerHTML= options;

            const selectElement = document.getElementById("sel_regionID");

            selectElement.addEventListener('change', async (e) => {

              var valor = selectElement.options[selectElement.selectedIndex].value;
              
              console.log(valor);
            });


        } else if (regiones.error) { Swal.fire("Atencion", regiones.error , "error"); }
        else { Swal.fire("Atencion", regiones.error , "error"); }
}

async function crearPais(){
  
  const selectElement = document.getElementById("sel_regionID");
  var idRegionSel = selectElement.options[selectElement.selectedIndex].value;
  const nombrePais = document.getElementById('nombreNuevoPais').value;
  
    const ext ="/v1/paises/"
    const cuerpo = {
      "nombre":nombrePais,
      "Region_RegionID":idRegionSel
    }
    const metod = 'POST'

    let insertPais = await access(url, ext, cuerpo, metod);

    if(insertPais.error){Swal.fire("Error al insertar pais nuevo", insertPais.error , "error");}
        if (insertPais) 
        {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Pais creado con éxito',
            showConfirmButton: false,
            timer: 1500
          })
          
          $('#nuevoPais').modal('hide');
          btnPais.click()
        }

}

async function vistaEditarPais (e){
  e.preventDefault();
  comboRegiones()
  const idPais = await e.target.attributes.idPais.value;
  $("#idPaisModify").val(idPais);

  $('#nuevoPais').modal('show');
  $('#btn_modal_pais').html('Modificar');
  $("#btn_modal_pais").attr("onclick","modificarPaisSelected()");

      const ext = "/v1/paisesFiltroID/";
      const cuerpo = {
          "id": idPais
      };
      
      const metodo = 'POST';

      const traerPais = await access(url, ext, cuerpo, metodo);
     
      let str = JSON.stringify(traerPais);
      let jsonPais = JSON.parse(str);
      let region =jsonPais[0].Region_RegionID.toString();
      
      $("#nombreNuevoPais").val(jsonPais[0].nombre);
      $("#sel_regionID").val(region);

};

async function modificarPaisSelected(){  
  let nombrePais = document.getElementById('nombreNuevoPais').value;
  let idRegionSel = document.getElementById('sel_regionID').value;
  let idPais = $("#idPaisModify").val();
  
  const ext ="/v1/modificarPais/"
    const cuerpo = {
      "id":idPais,
      "nombre":nombrePais,
      "Region_RegionID":idRegionSel
    }
    const method = 'PUT'

    let modifyPais = await access(url, ext, cuerpo, method);

    if(modifyPais.error){Swal.fire("Error al insertar pais nuevo", modifyPais.error , "error");}
        if (modifyPais) 
        {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Pais modificado con éxito',
            showConfirmButton: false,
            timer: 1500
          })
          
          $('#nuevoPais').modal('hide');
          btnPais.click()
        }
}

async function eliminaPais (e){
  e.preventDefault();
  const idPais = await e.target.attributes.idPais.value;
  $("#idPaisModify").val(idPais);

  const ext = "/v1/paisesFiltroID/";
  const cuerpo = {
      "id": idPais
  };
  
  const metodo = 'POST';

  const traerPais = await access(url, ext, cuerpo, metodo);
 
  let str = JSON.stringify(traerPais);
  let jsonPais = JSON.parse(str)
  
  let nombrePais = jsonPais[0].nombre;
  
  Swal.fire({
    title: `Esta seguro que desea eliminar ${nombrePais} ?`,
    showDenyButton: true,
    // showCancelButton: true,
    confirmButtonText: 'Eliminar',
    denyButtonText: `Cancelar`,
  }).then(async (result) => {    
    if (result.isConfirmed) {

        try{        
          const ext ="/v1/paises/";
            const cuerpo = {
              "id":idPais
            }
            const method = 'DELETE';
        
            const eliminarPais = await access(url, ext, cuerpo, method);
    
            console.log(eliminarPais)
            if(eliminarPais.error){Swal.fire("Error al eliminar pais nuevo", eliminarPais.error , "error");}
                if (eliminarPais) 
                {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Pais eliminado con éxito',
                    showConfirmButton: false,
                    timer: 1500
                  })                          
                  btnPais.click()
                }
        }catch(err){
          alert(err)
        }

    } else if (result.isDenied) {
      Swal.fire('Eliminacion Cancelada', '', 'info')
    }
  })
};

