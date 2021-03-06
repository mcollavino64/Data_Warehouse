const btnLogin = document.querySelector('.btnLogin');
const btnRegistrar = document.querySelector('.btnRegistrar');
const btnSalir = document.querySelector('.btnSalir');

const btnUsuarios = document.querySelector('.btnUsuarios');
const btnBuscarUsuario = document.querySelector(".btnBuscarUsuario");
const btnCrearUsuario = document.querySelector(".btnCrearUsuario");
const btnEditarUsuario = document.querySelector(".btnEditarUsuario");

const btnContactos = document.querySelector('.btnContactos');
const btnBuscarContacto = document.querySelector(".btnBuscarContacto");
const btnCrearContacto = document.querySelector(".btnCrearContacto");
const btnEditarContacto = document.querySelector(".btnEditarContacto");

const btnCompanias = document.querySelector('.btnCompanias');
const btnPais = document.querySelector('.btnPais');
const contenidoMostrar = document.querySelector(".mostrar_contenido");
const btnCiudad = document.querySelector('.btnCiudad');
const btnRegion = document.querySelector('.btnRegion');
const btnCompania = document.querySelector('.btnCompania');



const url = 'http://127.0.0.1:3001';

const access = async (url, ext, cuerpo, metodo) => {

    if (metodo == "GET") {
        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
        const respuesta = await fetch(url + ext, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': bearer
            }
        });

        data = await respuesta.json();
        return await data;

    } else {

        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));	
        const respuesta = await fetch(url + ext, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': bearer
            },
            body: JSON.stringify(cuerpo)
        });

        data = await respuesta.json();
        return await data;

    }



}

btnLogin.addEventListener('click', async (e) => {

    e.preventDefault();

    const usuario = document.querySelector('.usuario').value;
    const contrasena = document.querySelector('.password').value;

    try {
        const ext = '/v1/ingreso';
        const cuerpo = {
            "usuario": usuario,
            "contrasena": contrasena
        };
        const metodo = 'POST';

        let ingreso = await access(url, ext, cuerpo, metodo);

        if (ingreso.token) {

            $("#btnLogin").addClass("btn-warning").removeClass("btn-success");
            $("#btnLogin").prop('disabled', true);
            $("#btnLogin").html(`Bienvenid@ al sitio ${usuario}`);
            $("#navbarResponsive ul li").show();

            let isAdmin = JSON.stringify(ingreso.admin)

            if (isAdmin != 1){
                $('#span_admin').hide();
                $(".btnUsuarios").hide();
                $(".btnPais").hide();
                $(".btnCiudad").hide();
                $(".btnRegion").hide();                                
                $(".btnCompania").hide();
            }else{
                $('#span_admin').show()
                $('#span_admin').show();
                $(".btnPais").show();
                $(".btnCiudad").show();  
                $(".btnRegion").show();
                $(".btnCompania").show();
            }
            

            localStorage.setItem("Token", JSON.stringify(ingreso.token));
            localStorage.setItem("Usuario", JSON.stringify(usuario));
            localStorage.setItem("Admin", JSON.stringify(ingreso.admin));

            setTimeout(function () {
                $('#login').modal('hide');

                $("#btn_login").removeClass('btn-success');
                $("#btn_login").addClass('btn-danger');

                $(".btnIngreso").prop('disabled', true);
                $(".btnRegistro").prop('disabled', true);
            }, 1000);

        } else {
            alert(ingreso.error);
        }

    } catch (err) {

    }


});

btnRegistrar.addEventListener('click', async (e) => {

    e.preventDefault();

    const usuario = document.querySelector('.nuevoUsuario').value;
    const nombre = document.querySelector('.nuevoNombre').value;
    const apellido = document.querySelector('.nuevoApellido').value;
    const email = document.querySelector('.nuevoEmail').value;
    const telefono = document.querySelector('.nuevoTelefono').value;
    const domicilio = document.querySelector('.nuevoDomicilio').value;
    const contrasena = document.querySelector('.nuevoPassword').value;

    try {

        const ext = '/v1/usuarios/';
        const cuerpo = {
            "usuario": usuario,
            "nombre": nombre,
            "apellido": apellido,
            "email": email,
            "telefono": telefono,
            "domicilio": domicilio,
            "contrasena": contrasena
        };

        const metodo = 'POST';

        let registro = await access(url, ext, cuerpo, metodo);

        if (registro.mensaje) {

            $(".btnRegistrar").addClass("btn-warning").removeClass("btn-success");
            $(".btnRegistrar").html('Registrad@ !!');
            $(".btnRegistro").prop('disabled', true);
            $(".btnRegistro").html('Registrad@ !!');

            setTimeout(function () {
                $('#registro').modal('hide');
                $(".btnRegistrar").prop('disabled', true);
            }, 2000);

        } else if (registro.error) { alert(registro.error); }

    } catch (err) {
        alert(err)
    }


});


btnSalir.addEventListener('click', async (e) => {
    e.preventDefault();
    localStorage.clear();
    $("#btn_login").removeClass('btn-danger');
    $("#btn_login").addClass('btn-success');

    $(".btnIngreso").prop('disabled', false);
    $(".btnRegistro").prop('disabled', false);
    $(".btnTransferir").prop('disabled', true);
    $(".btnTransferencias").prop('disabled', true);
    $("#navbarResponsive ul li").hide();
    contenidoMostrar.innerHTML = "";
    location.reload();
});


document.addEventListener("DOMContentLoaded", function (event) {

    if (localStorage.getItem("Token") !== null) {

        $(".btnIngreso").prop('disabled', true);
        $(".btnRegistro").prop('disabled', true);
        $("#navbarResponsive ul li").show();


    } else {

        $("#navbarResponsive ul li").hide();
        $('#login').modal('show');
    }

    if ( localStorage.getItem("Admin") == 0 || localStorage.getItem("Admin") === null ){

        $('#span_admin').hide();
        $(".btnUsuarios").hide();
        $(".btnPais").hide();
        $(".btnCiudad").hide();
        $(".btnRegion").hide();            
        $(".btnCompania").hide();                    
    }else{
        $('#span_admin').show()
        $('#span_admin').show();
        $(".btnPais").show();
        $(".btnCiudad").show();  
        $(".btnRegion").show();    
        $(".btnCompania").show();
    }                    

});

$(document).ready(function() {
    $('select').selectpicker();
});

