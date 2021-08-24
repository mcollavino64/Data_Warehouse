const paisesServicios = require('../services/service_paises.js');

module.exports = (app) => {

    app.get("/v1/paises/", async (req, res) => {

        console.log("peticion GET a : /v1/paises/ ");

        try {

            const consultaPais = await paisesServicios.mostrarPaises(req.body);
        
            if (consultaPais.length > 0) { res.status(200).json(consultaPais); }

            else { res.status(404).json("El Pais no existe"); }

        } catch (error) { res.status(500).json({ Error: error.message }); }

    });

    app.post("/v1/paisesFiltro/", async (req, res) => {

        console.log("peticion POST a : /v1/paisesFiltro/ ");

        try {

            const consultaPais = await paisesServicios.mostrarPaises(req.body);

            if (consultaPais.length > 0) { res.status(200).json(consultaPais); }

            else { res.status(404).json({
                error: `No Hay datos para mostar`
            }); }



        } catch (error) { res.status(500).json({ Error: error.message }); }

    });

    app.post("/v1/paises/", async (req, res) => {

        console.log("peticion POST a : /v1/paises/ ");
        console.log(req.body)

         const crearPais = await paisesServicios.crearPais(req.body);

        if (crearPais.length > 0) {
            res.status(201).json({
                mensaje: `Pais creado correctamente ! `
            });
        }

        else { res.status(400).json({ mensaje: "Error al Crear Pais" }); }

    });

}