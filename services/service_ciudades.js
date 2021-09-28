const { sequelize, firma } = require("../config/config.js");

module.exports.mostrarCiudades= async (objCiudad) => {

    // let {nombre} = objCiudad;

    query = "SELECT * FROM ciudad WHERE 1 = 1";
    // if (nombre) {query += " AND ciudadDescripcion LIKE :nombre";} 
    
    const respuesta =
        sequelize.query(query, {
            // replacements: { nombre: `%${nombre}%`},
            type: sequelize.QueryTypes.SELECT
        });

    return respuesta;

}

// //BUSCAR Ciudad POR ID
module.exports.mostrarCiudadID= async (objCiudad) => {

    let idCiudad = objCiudad.id;
    
    query = "SELECT * FROM ciudad WHERE ciudadID = :id" ;
    // if (nombre) {query += " AND nombre LIKE :nombre";} 
    
    const respuesta =
        sequelize.query(query, {
            replacements: { id: idCiudad},
            type: sequelize.QueryTypes.SELECT
        });

    return respuesta;

}

module.exports.crearCiudad = async (objCiudad) => {
    
        const nombre = objCiudad.ciudadDescripcion;
        const paisId = objCiudad.paises_id;        

        query = "INSERT INTO ciudad (ciudadDescripcion, paises_id) VALUES (:nombre, :paisId) ";

        const respuesta =
            sequelize.query(query, {
                replacements: { nombre, paisId },
                type: sequelize.QueryTypes.INSERT
            });        
        
        return "OK";
}

module.exports.modificarCiudad = async (objCiudad) => {

        let ciudadID = objCiudad.ciudadID;
        let nombre = objCiudad.ciudadDescripcion;
        let paises_id = objCiudad.paises_id;        

        query = "UPDATE ciudad SET ciudadDescripcion = :nombre , paises_id = :paises_id WHERE ciudadID = :ciudadID";

        const respuesta =
            sequelize.query(query, {
                replacements: {ciudadID, nombre, paises_id},
                type: sequelize.QueryTypes.INSERT
            });        
        
        return "OK";
}

module.exports.mostrarPaises= async (obj) => {

    // let {nombre} = obj;

    query = "SELECT * FROM paises"
     
    const respuesta =
        sequelize.query(query, {
            // replacements: { nombre: `%${nombre}%`},
            type: sequelize.QueryTypes.SELECT
        });

    return respuesta;

}

module.exports.eliminarCiudad = async (objCiudad) => {

    const id = objCiudad.id;
   
    if (id) {
        query = "DELETE FROM ciudad WHERE ciudadID = :id";

        const respuesta =
        sequelize.query(query, {
            replacements: { id },
            type: sequelize.QueryTypes.DELETE
        });       
        
        return respuesta;
    }
}

module.exports.mostrarCiudadesPais= async (objCiudad) => {

    let paises_id = objCiudad.paises_id;
    
    query = "SELECT * FROM ciudad WHERE paises_id = :paises_id" ;
    // if (nombre) {query += " AND nombre LIKE :nombre";} 
    
    const respuesta =
        sequelize.query(query, {
            replacements: { paises_id: paises_id},
            type: sequelize.QueryTypes.SELECT
        });

    return respuesta;

}