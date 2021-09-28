const contactosServicios = require('../services/service_contactos.js');
const { validarDatos, validarExistencia, validarId } = require('../middlewares/midd_contactos.js');

module.exports = (app) => {

    app.get("/v1/contactos/", async (req, res) => {

        console.log("peticion GET a : /v1/contactos/ ");

        try {

            const consultaContactos = await contactosServicios.mostrarContactos(req.body);

            if (consultaContactos.length > 0) { res.status(200).json(consultaContactos); }

            else { res.status(404).json({
                error: `No Hay datos para mostar`
            }); }

        } catch (error) { res.status(500).json({ Error: error.message }); }

    });

    app.post("/v1/contactosFiltro/", async (req, res) => {

        console.log("peticion POST a : /v1/contactosFiltro/ ");

        try {

            const consultaContactos = await contactosServicios.mostrarContactos(req.body);

            if (consultaContactos.length > 0) { res.status(200).json(consultaContactos); }

            else { res.status(404).json({
                error: `No Hay datos para mostar`
            }); }



        } catch (error) { res.status(500).json({ Error: error.message }); }

    });

    app.post("/v1/contactos/", validarDatos, validarExistencia, async (req, res) => {

        console.log("peticion POST a : /v1/contactos/ ");
        
        const crearContacto = await contactosServicios.crearContacto(req.body);

        if (crearContacto.length > 0) {
            res.status(201).json({
                mensaje: `Nueva Contacto con nombre : " ${req.body.nombre} " creada correctamente ! `
            });
        }

        else { res.status(400).json({ mensaje: "Error al Crear Contacto" }); }

    });

    app.put("/v1/contactos/", validarId, async (req, res) => {

        console.log("peticion PUT a : /v1/contactos/ ");

        console.log("Validando Si existe el Contacto");

        if (req.body.id){

        const consultaContacto = await contactosServicios.buscarContacto(req.body);

        if (consultaContacto.length > 0) {

            const editarContacto = await contactosServicios.editarContacto(req.body);

            if (editarContacto.length > 0) {
                res.status(201).json({
                    mensaje: `El Contacto con nombre : " ${req.body.nombre} " fue editada correctamente ! `
                });
            }

        }

        else { res.status(400).json({ mensaje: "Error al Editar el Contacto" }); }

    } else { res.status(400).json({ mensaje: "Debe Enviar el Id de el Contacto a Editar" }); }

    });

    app.delete("/v1/contactos/", async (req, res) => {

        console.log("peticion DELETE a : /v1/contactos/ ");

        console.log("Validando Si existe La Contacto");

        if (req.body.id){

        const consultaContacto = await contactosServicios.buscarContacto(req.body);

        if (consultaContacto.length > 0) {

            const eliminarContacto = await contactosServicios.eliminarContacto(req.body);

            res.status(201).json({
                mensaje: `El Contacto con nombre "${consultaContacto[0].nombre}" fue eliminado correctamente ! `
            });

        }

        else { res.status(400).json({ mensaje: "Error al Eliminar Contacto" }); }

    } else { res.status(400).json({ mensaje: "Debe Enviar el Id del Contacto a Eliminar" }); }

    });

    app.delete("/v1/eliminarContactosSeleccionados/" , async (req, res) => {
                
        let arraySeleccion = req.body;

        arraySeleccion.forEach(element => {
            const consultaUsuario =  contactosServicios.eliminarContactosSeleccionados(element);
        });

        res.status(201).json({
            mensaje: `Usuarios eliminado correctamente ! `
        });

        //  res.status(400).json({ mensaje: "Error al Eliminar Usuario" }); }

        console.log(res.status)
        

    });

    
}