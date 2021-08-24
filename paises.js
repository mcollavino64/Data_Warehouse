const getHtmlPaises = (paises) => {

    let html ="";

    if(paises.error){
        
        Swal.fire("Atencion", paises.error , "error");

    }

    if(paises.length > 0){

    html = `<table class="table table-bordered table-hover dt-responsive tablas">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Region</th>
        <th scope="col">Sub-Region</th>
      </tr>
    </thead>
    <tbody>
  `;

 paises.forEach(usuario => {

        html += `<tr>
         <th scope="row">${usuario.id}</th>
         <td>${usuario.nombre}</td>
         <td>${usuario.region}</td>
         <td>${usuario.sub_region}</td>
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

    contenidoMostrar.innerHTML = '<div class="alert alert-secondary" role="alert">Listado de Paises</div>';
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