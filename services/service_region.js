const { sequelize, firma } = require("../config/config.js");

module.exports.mostrarRegiones= async (objRegion) => {

    // let {nombre} = objRegion;

    query = "SELECT * FROM region WHERE 1 = 1";
    // if (nombre) {query += " AND ciudadDescripcion LIKE :nombre";} 
    
    const respuesta =
        sequelize.query(query, {
            // replacements: { nombre: `%${nombre}%`},
            type: sequelize.QueryTypes.SELECT
        });

    return respuesta;

}

// // //BUSCAR Regionn POR ID
module.exports.mostrarRegionID= async (objRegion) => {

    let idRegion = objRegion.id;
    
    query = "SELECT * FROM region WHERE regionID = :id" ;
    // if (nombre) {query += " AND nombre LIKE :nombre";} 
    
    const respuesta =
        sequelize.query(query, {
            replacements: { id: idRegion},
            type: sequelize.QueryTypes.SELECT
        });

    return respuesta;

}

module.exports.crearRegion = async (objRegion) => {
    
        const nombre = objRegion.regionDescripcion;            

        query = "INSERT INTO region (regionDescripcion) VALUES (:nombre) ";

        const respuesta =
            sequelize.query(query, {
                replacements: { nombre },
                type: sequelize.QueryTypes.INSERT
            });        
        
        return "OK";
}

module.exports.modificarRegion = async (objRegion) => {
        let RegionID = objRegion.RegionID;
        let RegionDescripcion = objRegion.RegionDescripcion;        

        query = "UPDATE region SET RegionDescripcion = :RegionDescripcion WHERE RegionID = :RegionID";

        const respuesta =
            sequelize.query(query, {
                replacements: {RegionID, RegionDescripcion},
                type: sequelize.QueryTypes.INSERT
            });        
        
        return "OK";
}

// module.exports.mostrarPaises= async (obj) => {

//     // let {nombre} = obj;

//     query = "SELECT * FROM paises"
     
//     const respuesta =
//         sequelize.query(query, {
//             // replacements: { nombre: `%${nombre}%`},
//             type: sequelize.QueryTypes.SELECT
//         });

//     return respuesta;

// }

module.exports.eliminarRegion = async (objRegion) => {

    const id = objRegion.id;
   
    if (id) {
        query = "DELETE FROM region WHERE regionID = :id";

        const respuesta =
        sequelize.query(query, {
            replacements: { id },
            type: sequelize.QueryTypes.DELETE
        });       
        
        return respuesta;
    }
}