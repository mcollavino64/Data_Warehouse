const usuariosServicios = require('../services/service_users.js');
const { jwt, firma } = require("../config/config.js");

function validarDatos(req, res, next) {

    console.log("Validando Datos Completos del Usuario");

    const { usuario, nombre, apellido, email, contrasena } = req.body;

    if (!usuario || !nombre || !apellido || !email || !contrasena) {

        res.status(400).json({
            error: `Datos Incompletos !`
        });

    } else {

        next();

    }

}


async function validarExistencia(req, res, next) {

    const usuariosServicios = require('../services/service_users.js');

    console.log("Validando Usuario");

    const consultaUsuario = await usuariosServicios.buscarUsuario(req.body);

    console.log("Usuario encontrado : ", consultaUsuario);

    if (consultaUsuario.length > 0) { res.status(409).json({ error:`El usuario ${req.body.usuario} ya existe en la base de datos`}); }

    else { next(); }

}


function esAdmin(req, res, next) {

    const { jwt, firma } = require("../config/config.js");

    console.log("Validando si el usuario es Admin");

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {

        res.status(401).json({ error: "Acceso Restringido" });

    } else {

        const verificar = jwt.verify(token, firma)

        if (verificar.admin == 1) { next(); }
        else { res.status(401).json({ error: "Acceso Restringido" }); }

    }

}

module.exports = { validarDatos, validarExistencia, esAdmin };