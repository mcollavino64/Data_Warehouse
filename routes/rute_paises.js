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


    //crear pais
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
    //modificar pais
    app.put("/v1/modificarPais/", async (req, res) => {

        console.log("peticion PUT a : /v1/paisesModificar/ ");
        console.log(req.body)

         const modificarPais = await paisesServicios.modificarPais(req.body);

        if (modificarPais.length > 0) {
            res.status(201).json({
                mensaje: `Pais modificado correctamente ! `
            });
        }else 
        { 
            res.status(400).json({ mensaje: "Error al Modificar Pais" }); 
        }

    });
    //modificar fin

    app.post("/v1/regiones/", async (req, res) => {

        console.log("peticion POST a : regiones ");

        try {

            const consultaRegion = await paisesServicios.mostrarRegiones(req.body);

            if (consultaRegion.length > 0) 
            { 
                res.status(200).json(consultaRegion);
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

    app.post("/v1/paisesFiltroID/", async (req, res) => {

        console.log("peticion POST a : /v1/paisesFiltroID/ ");

        try {

            const consultaPais = await paisesServicios.mostrarPaisID(req.body);

            if (consultaPais.length > 0) { res.status(200).json(consultaPais); }

            else { res.status(404).json({
                error: `No Hay datos para mostar`
            }); }



        } catch (error) { res.status(500).json({ Error: error.message }); }

    });

     //eliminar pais
     app.delete("/v1/paises/", async (req, res) => {        
        console.log("peticion DELETE a : /v1/paisesEliminar/ ");
        console.log(req.body)

        const eliminarPais = await paisesServicios.eliminarPais(req.body);         
                 
        res.status(201).json({
            mensaje: `Pais eliminado correctamente ! `
        });       

    });
    
    //combo paises por region
    app.post("/v1/paisesFiltroRegion/", async (req, res) => {

        console.log("peticion POST a : /v1/paisesFiltroRegion/ ");
        console.log(req.body)

        try {

            const consultaPais = await paisesServicios.mostrarPaisesRegion(req.body);

            if (consultaPais.length > 0) { res.status(200).json(consultaPais); }

            else { res.status(404).json({
                error: `No Hay datos para mostar`
            }); }



        } catch (error) { res.status(500).json({ Error: error.message }); }

    });
}