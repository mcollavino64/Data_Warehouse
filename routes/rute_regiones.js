const RegionesServicios = require('../services/service_region.js');

module.exports = (app) => {

app.post("/v1/Regionesfiltro/", async (req, res) => {

    console.log("peticion POST a : /v1/RegionesFiltro/ ");

    try {

        const consultaRegion = await RegionesServicios.mostrarRegiones(req.body);

        if (consultaRegion.length > 0) { res.status(200).json(consultaRegion); }

        else { res.status(404).json({
            error: `No Hay datos para mostar`
        }); }

    } catch (error) { res.status(500).json({ Error: error.message }); }

});

//crear Region
app.post("/v1/regiones2/", async (req, res) => {

    console.log("peticion POST a : /v1/regiones2/ ");
    // console.log(req.body)

        const crearRegion = await RegionesServicios.crearRegion(req.body);

    if (crearRegion.length > 0) {
        res.status(201).json({
            mensaje: `Region creada correctamente ! `
        });
    }

    else { res.status(400).json({ mensaje: "Error al Crear Region" }); }

});

//modificar Region
app.put("/v1/modificarRegion/", async (req, res) => {

    console.log("peticion PUT a : /v1/RegionesModificar/ ");
    console.log(req.body)

        const modificarRegion = await RegionesServicios.modificarRegion(req.body);

    if (modificarRegion.length > 0) {
        res.status(201).json({
            mensaje: `Region modificada correctamente ! `
        });
    }else 
    { 
        res.status(400).json({ mensaje: "Error al Modificar Region" }); 
    }

});
//modificar fin


app.post("/v1/RegionesFiltroID/", async (req, res) => {

    console.log("peticion POST a : /v1/RegionesFiltroID/ ");

    try {

        const consultaRegion = await RegionesServicios.mostrarRegionID(req.body);

        if (consultaRegion.length > 0) { res.status(200).json(consultaRegion); }

        else { res.status(404).json({
            error: `No Hay datos para mostar`
        }); }

    } catch (error) { res.status(500).json({ Error: error.message }); }

});


//eliminar Region
app.delete("/v1/Regiones/", async (req, res) => {        
    console.log("peticion DELETE a : /v1/Regiones/ ");
    console.log(req.body)

    const eliminarRegion = await RegionesServicios.eliminarRegion(req.body);         
                
    res.status(201).json({
        mensaje: `Region eliminada correctamente ! `
    });       

});
//eliminar fin

}