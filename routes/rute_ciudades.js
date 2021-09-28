const ciudadesServicios = require('../services/service_ciudades.js');

module.exports = (app) => {

    // app.get("/v1/ciudades/", async (req, res) => {
    //     console.log("peticion GET a : /v1/ciudades/ ");
    //     try {
    //         const consultaCiudad = await ciudadesServicios.mostrarCiudades(req.body);        
    //         if (consultaCiudad.length > 0) 
    //         { 
    //             res.status(200).json(consultaCiudad); 
    //         }else 
    //         { 
    //             res.status(404).json("La Ciudad no existe"); 
    //         }

    //     } catch (error) { res.status(500).json({ Error: error.message }); }

    // });

    app.post("/v1/ciudadesfiltro/", async (req, res) => {
    
        console.log("peticion POST a : /v1/ciudadesFiltro/ ");

        try {

            const consultaCiudad = await ciudadesServicios.mostrarCiudades(req.body);

            if (consultaCiudad.length > 0) { res.status(200).json(consultaCiudad); }

            else { res.status(404).json({
                error: `No Hay datos para mostar`
            }); }



        } catch (error) { res.status(500).json({ Error: error.message }); }

    });


    //crear Ciudad
    app.post("/v1/ciudades/", async (req, res) => {

        console.log("peticion POST a : /v1/ciudades/ ");
        console.log(req.body)

         const crearCiudad = await ciudadesServicios.crearCiudad(req.body);

        if (crearCiudad.length > 0) {
            res.status(201).json({
                mensaje: `Ciudad creada correctamente ! `
            });
        }

        else { res.status(400).json({ mensaje: "Error al Crear Ciudad" }); }

    });

    // //modificar Ciudad
    app.put("/v1/modificarCiudad/", async (req, res) => {

        console.log("peticion PUT a : /v1/ciudadesModificar/ ");
        console.log(req.body)

         const modificarCiudad = await ciudadesServicios.modificarCiudad(req.body);

        if (modificarCiudad.length > 0) {
            res.status(201).json({
                mensaje: `Ciudad modificada correctamente ! `
            });
        }else 
        { 
            res.status(400).json({ mensaje: "Error al Modificar Ciudad" }); 
        }

    });
    // //modificar fin

    app.post("/v1/PaisesCombo/", async (req, res) => {

        console.log("peticion POST a : paises combo ");

        try {

            const consultaPais = await ciudadesServicios.mostrarPaises(req.body);

            if (consultaPais.length > 0) 
            { 
                res.status(200).json(consultaPais);
            }else { 
                res.status(404).json({
                error: `No Hay datos para mostar`
                }); 
            }
        } catch (error) 
        { 
            res.status(500).json({ Error: error.message }); 
        }

    });

    app.post("/v1/ciudadesFiltroID/", async (req, res) => {

        console.log("peticion POST a : /v1/ciudadesFiltroID/ ");

        try {

            const consultaCiudad = await ciudadesServicios.mostrarCiudadID(req.body);

            if (consultaCiudad.length > 0) { res.status(200).json(consultaCiudad); }

            else { res.status(404).json({
                error: `No Hay datos para mostar`
            }); }

        } catch (error) { res.status(500).json({ Error: error.message }); }

    });


    // //eliminar Ciudad
    app.delete("/v1/ciudades/", async (req, res) => {        
        console.log("peticion DELETE a : /v1/ciudades/ ");
        console.log(req.body)

        const eliminarCiudad = await ciudadesServicios.eliminarCiudad(req.body);         
                 
        res.status(201).json({
            mensaje: `Ciudad eliminado correctamente ! `
        });       

    });
    
    //combo ciudades por pais
    app.post("/v1/ciudadesfiltroPais/", async (req, res) => {
    
        console.log("peticion POST a : /v1/ciudadesfiltroPais/ ");

        try {

            const consultaCiudad = await ciudadesServicios.mostrarCiudadesPais(req.body);

            if (consultaCiudad.length > 0) { res.status(200).json(consultaCiudad); }

            else { res.status(404).json({
                error: `No Hay datos para mostar`
            }); }



        } catch (error) { res.status(500).json({ Error: error.message }); }

    });
}