const getHtmlRegiones = (Regiones) => {

    let html ="";

    if(Regiones.error){
        
        Swal.fire("Atencion", Regiones.error , "error");

    }

    if(Regiones.length > 0){

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

 Regiones.forEach(Region => {

        html += `<tr>
         <th scope="row">${Region.RegionID}</th>
         <td>${Region.RegionDescripcion}</td>
       `       
       html += `
       <td>
       <button type="button" class="btn btn-outline-warning btn-sm btnEditarContacto" idRegion="${Region.RegionID}" onClick="vistaEditarRegion(event)">Editar</button>
       <button type="button" class="btn btn-outline-danger btn-sm btnEliminarContacto" idRegion="${Region.RegionID}" onClick="eliminaRegion(event)" >Eliminar</button>
     </tr>`

    });

    html += `  
   
     </tbody>
   </table>`;

} 

    return html;

}

btnRegion.addEventListener('click', async (e) => {    
    console.log('click evvent')
    e.preventDefault();
    contenidoMostrar.innerHTML = 
    '<div class="d-flex justify-content-center"><button type="button" class="btn btn-success" data-toggle="modal" data-target="#nuevoRegion" id="btnAgregarRegion" =>Agregar Region</button></div> <div class="alert alert-secondary" role="alert">Listado de Regiones</div>';
    const divTabla = document.createElement("div");
    divTabla.classList.add("divTabla");
    contenidoMostrar.appendChild(divTabla);

    divTabla.innerHTML = "";
    
    const ext = '/v1/Regionesfiltro/';
    
    const cuerpo = {};

    const metodo = 'POST';
    
    let Regiones = await access(url, ext, cuerpo, metodo);
    
    if(Regiones.error){Swal.fire("Atencion", Regiones.error , "error");}
        if (Regiones) {

            const tabla = getHtmlRegiones(Regiones);
            divTabla.innerHTML = tabla;
            
        } else if (Regiones.error) { Swal.fire("Atencion", Regiones.error , "error"); }
        else { Swal.fire("Atencion", Regiones.error , "error"); }

});

async function crearRegion(){

$('#btn_modal_region').html('Crear');

  const nombreRegion = document.getElementById('nombreNuevoRegion').value;

    const ext ="/v1/regiones2/";
    const cuerpo = {
      "regionDescripcion":nombreRegion      
    }
    const metod = 'POST'

    let insertRegion = await access(url, ext, cuerpo, metod);
    console.log("insert " + insertRegion);

    // return false;

    if(insertRegion.error){Swal.fire("Error al insertar Region nuevo", insertRegion.error , "error");}
        if (insertRegion) 
        {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Region creada con éxito',
            showConfirmButton: false,
            timer: 1500
          })
          
          $('#nuevoRegion').modal('hide');
          btnRegion.click()
        }

}

async function vistaEditarRegion (e){
  e.preventDefault();
//   comboPaises()
  const idRegion = await e.target.attributes.idRegion.value;
  $("#idRegionModify").val(idRegion);

  $('#nuevoRegion').modal('show');
  $('#btn_modal_region').html('Modificar');
  $("#btn_modal_region").attr("onclick","modificarRegionSelected()");

      const ext = "/v1/RegionesFiltroID/";
      const cuerpo = {
          "id": idRegion
      };
      
      const metodo = 'POST';

      const traerRegion = await access(url, ext, cuerpo, metodo);
     
      let str = JSON.stringify(traerRegion);
      let jsonRegion = JSON.parse(str);    
      
      $("#nombreNuevoRegion").val(jsonRegion[0].RegionDescripcion);    

};

async function modificarRegionSelected(){  
  let nombreRegion = document.getElementById('nombreNuevoRegion').value;    
  let idRegion = $("#idRegionModify").val();
  
  const ext ="/v1/modificarRegion/"
    const cuerpo = {
      "RegionID":idRegion,
      "RegionDescripcion":nombreRegion      
    }
    const method = 'PUT'

    let modifyRegion = await access(url, ext, cuerpo, method);

    if(modifyRegion.error){Swal.fire("Error al insertar Region nuevo", modifyRegion.error , "error");}
        if (modifyRegion) 
        {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Region modificada con éxito',
            showConfirmButton: false,
            timer: 1500
          })
          
          $('#nuevoRegion').modal('hide');
          btnRegion.click()
        }
}

async function eliminaRegion (e){
  e.preventDefault();
  const idRegion = await e.target.attributes.idRegion.value;
  $("#idRegionModify").val(idRegion);

  const ext = "/v1/RegionesFiltroID/";
  const cuerpo = {
      "id": idRegion
  };
  
  const metodo = 'POST';

  const traerRegion = await access(url, ext, cuerpo, metodo);
 
  let str = JSON.stringify(traerRegion);
  let jsonRegion = JSON.parse(str)
  
  let nombreRegion = jsonRegion[0].RegionDescripcion;
  
  Swal.fire({
    title: `Esta seguro que desea eliminar ${nombreRegion} ?`,
    showDenyButton: true,
    // showCancelButton: true,
    confirmButtonText: 'Eliminar',
    denyButtonText: `Cancelar`,
  }).then(async (result) => {    
    if (result.isConfirmed) {

        try{        
          const ext ="/v1/Regiones/";
            const cuerpo = {
              "id":idRegion
            }
            const method = 'DELETE';
        
            const eliminarRegion = await access(url, ext, cuerpo, method);
    
            console.log(eliminarRegion)
            if(eliminarRegion.error){Swal.fire("Error al eliminar Region nuevo", eliminarRegion.error , "error");}
                if (eliminarRegion) 
                {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Region eliminado con éxito',
                    showConfirmButton: false,
                    timer: 1500
                  })                          
                  btnRegion.click()
                }
        }catch(err){
          alert(err)
        }

    } else if (result.isDenied) {
      Swal.fire('Eliminacion Cancelada', '', 'info')
    }
  })
};

