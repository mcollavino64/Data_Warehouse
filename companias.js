const getHtmlCompanias = (Companias) => {

    let html ="";

    if(Companias.error){
        
        Swal.fire("Atencion", Companias.error , "error");

    }

    if(Companias.length > 0){

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

 Companias.forEach(Compania => {

        html += `<tr>
         <th scope="row">${Compania.companiaID}</th>
         <td>${Compania.companiaDescripcion}</td>
       `       
       html += `
       <td>
       <button type="button" class="btn btn-outline-warning btn-sm btnEditarContacto" idCompania="${Compania.companiaID}" onClick="vistaEditarCompania(event)">Editar</button>
       <button type="button" class="btn btn-outline-danger btn-sm btnEliminarContacto" idCompania="${Compania.companiaID}" onClick="eliminaCompania(event)" >Eliminar</button>
     </tr>`

    });

    html += `  
   
     </tbody>
   </table>`;

} 

    return html;

}

btnCompania.addEventListener('click', async (e) => {
    // console.log('ejecuto boton')
    e.preventDefault();
    contenidoMostrar.innerHTML = 
    '<div class="d-flex justify-content-center"><button type="button" class="btn btn-success" data-toggle="modal" data-target="#nuevoCompania" id="btnAgregarCompania">Agregar Compania</button></div> <div class="alert alert-secondary" role="alert">Listado de Companias</div>';
    const divTabla = document.createElement("div");
    divTabla.classList.add("divTabla");
    contenidoMostrar.appendChild(divTabla);

    divTabla.innerHTML = "";
    
    const ext = '/v1/Companiasfiltro/';
    
    const cuerpo = {};

    const metodo = 'POST';
    
    let Companias = await access(url, ext, cuerpo, metodo);
    
    if(Companias.error){Swal.fire("Atencion", Companias.error , "error");}
        if (Companias) {

            const tabla = getHtmlCompanias(Companias);
            divTabla.innerHTML = tabla;
            
        } else if (Companias.error) { Swal.fire("Atencion", Companias.error , "error"); }
        else { Swal.fire("Atencion", Companias.error , "error"); }

});

async function crearCompania(){

    $('#btn_modal_compania_crear').html('Crear');
    
      const nombreCompania = document.getElementById('nombreNuevoCompania').value;
    
        const ext ="/v1/companias/";
        const cuerpo = {
          "companiaDescripcion":nombreCompania      
        }
        const metod = 'POST'
    
        let insertCompania = await access(url, ext, cuerpo, metod);
    
        if(insertCompania.error){Swal.fire("Error al insertar una Compañia nueva", insertCompania.error , "error");}
            if (insertCompania) 
            {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Compañia creada con éxito',
                showConfirmButton: false,
                timer: 1500
              })
              
              $('#nuevoCompania').modal('hide');
              btnCompania.click()
            }
    
}
    
async function vistaEditarCompania (e){
    e.preventDefault();
    const idCompania = await e.target.attributes.idCompania.value;
    $("#idCompaniaModify").val(idCompania);
    
    $('#nuevoCompania').modal('show');
    $('#btn_modal_compania_crear').html('Modificar');
    $("#btn_modal_compania_crear").attr("onclick","modificarCompaniaSelected()");

    const ext = "/v1/companiasFiltroID/";
    const cuerpo = {
        "id": idCompania
    };
    
    const metodo = 'POST';

    const traerCompania = await access(url, ext, cuerpo, metodo);
    
    let str = JSON.stringify(traerCompania);
    let jsonCompania = JSON.parse(str);    
    
    $("#nombreNuevoCompania").val(jsonCompania[0].companiaDescripcion);    

};

async function modificarCompaniaSelected(){  
    let nombreCompania = document.getElementById('nombreNuevoCompania').value;    
    let idCompania = $("#idCompaniaModify").val();
    
    const ext ="/v1/modificarCompania/"
    const cuerpo = {
        "companiaID":idCompania,
        "companiaDescripcion":nombreCompania      
    }
    const method = 'PUT'

    let modifyCompania = await access(url, ext, cuerpo, method);

    if(modifyCompania.error){Swal.fire("Error al insertar Compania nuevo", modifyCompania.error , "error");}
        if (modifyCompania) 
        {
            Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Compania modificada con éxito',
            showConfirmButton: false,
            timer: 1500
            })
            
            $('#nuevoCompania').modal('hide');
            btnCompania.click()
        }
}
    
async function eliminaCompania (e){
    e.preventDefault();
    const idCompania = await e.target.attributes.idCompania.value;
    $("#idCompaniaModify").val(idCompania);

    const ext = "/v1/CompaniasFiltroID/";
    const cuerpo = {
        "id": idCompania
    };
    
    const metodo = 'POST';

    const traerCompania = await access(url, ext, cuerpo, metodo);
    
    let str = JSON.stringify(traerCompania);
    let jsonCompania = JSON.parse(str)
    
    let nombreCompania = jsonCompania[0].companiaDescripcion;
    
    Swal.fire({
    title: `Esta seguro que desea eliminar ${nombreCompania} ?`,
    showDenyButton: true,
    // showCancelButton: true,
    confirmButtonText: 'Eliminar',
    denyButtonText: `Cancelar`,
    }).then(async (result) => {    
    if (result.isConfirmed) {

        try{        
            const ext ="/v1/companias/";
            const cuerpo = {
                "id":idCompania
            }
            const method = 'DELETE';
        
            const eliminarCompania = await access(url, ext, cuerpo, method);
    
            console.log(eliminarCompania)
            if(eliminarCompania.error){Swal.fire("Error al eliminar Compania nuevo", eliminarCompania.error , "error");}
                if (eliminarCompania) 
                {
                    Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Compania eliminado con éxito',
                    showConfirmButton: false,
                    timer: 1500
                    })                          
                    btnCompania.click()
                }
        }catch(err){
            alert(err)
        }

    } else if (result.isDenied) {
        Swal.fire('Eliminacion Cancelada', '', 'info')
    }
    })
};

    