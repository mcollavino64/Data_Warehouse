const CompaniasServicios = require('../services/service_companias.js');

module.exports = (app) => {

app.post("/v1/companiasFiltro/", async (req, res) => {

    console.log("peticion POST a : /v1/Companiasfiltro/ ");

    try {

        const consultaCompania = await CompaniasServicios.mostrarCompanias(req.body);

        if (consultaCompania.length > 0) { res.status(200).json(consultaCompania); }

        else { res.status(404).json({
            error: `No Hay datos para mostar`
        }); }



    } catch (error) { res.status(500).json({ Error: error.message }); }

});

//crear Compania
app.post("/v1/companias/", async (req, res) => {

    console.log("peticion POST a : /v1/companias/ ");
    // console.log(req.body)

        const crearCompania = await CompaniasServicios.crearCompania(req.body);

    if (crearCompania.length > 0) {
        res.status(201).json({
            mensaje: `Compania creada correctamente ! `
        });
    }

    else { res.status(400).json({ mensaje: "Error al Crear Compañia" }); }

});

//modificar Compania
app.put("/v1/modificarCompania/", async (req, res) => {

    console.log("peticion PUT a : /v1/modificarCompania/ ");
    console.log(req.body)

        const modificarCompania = await CompaniasServicios.modificarCompania(req.body);

    if (modificarCompania.length > 0) {
        res.status(201).json({
            mensaje: `Compania modificada correctamente ! `
        });
    }else 
    { 
        res.status(400).json({ mensaje: "Error al Modificar Compania" }); 
    }

});


app.post("/v1/companiasFiltroID/", async (req, res) => {

    console.log("peticion POST a : /v1/companiasFiltroID/ ");

    try {
        const consultaCompania = await CompaniasServicios.mostrarCompaniaID(req.body);

        if (consultaCompania.length > 0) { res.status(200).json(consultaCompania); }

        else { res.status(404).json({
            error: `No Hay datos para mostar`
        }); }

    } catch (error) { res.status(500).json({ Error: error.message }); }

});

//eliminar Region
app.delete("/v1/companias/", async (req, res) => {        
    console.log("peticion DELETE a : /v1/companias/ ");
    console.log(req.body)

    const eliminarCompania = await CompaniasServicios.eliminarCompania(req.body);         
                
    res.status(201).json({
        mensaje: `Region eliminada correctamente ! `
    });       

});
}