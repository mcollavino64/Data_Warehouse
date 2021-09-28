const { sequelize, firma } = require("../config/config.js");

module.exports.mostrarPaises= async (objPais) => {

    let {nombre} = objPais;

    query = "SELECT * FROM paises WHERE 1 = 1"
    if (nombre) {query += " AND nombre LIKE :nombre";} 
    
    const respuesta =
        sequelize.query(query, {
            replacements: { nombre: `%${nombre}%`},
            type: sequelize.QueryTypes.SELECT
        });

    return respuesta;

}

//BUSCAR PAIS POR ID
module.exports.mostrarPaisID= async (objPais) => {

    let idPais = objPais.id;
    
    query = "SELECT * FROM paises WHERE id = :id" ;
    // if (nombre) {query += " AND nombre LIKE :nombre";} 
    
    const respuesta =
        sequelize.query(query, {
            replacements: { id: idPais},
            type: sequelize.QueryTypes.SELECT
        });

    return respuesta;

}

module.exports.crearPais = async (objPais) => {

    // objPais.forEach(function (item, index) {

        const nombre = objPais.nombre;
        const Region_RegionID = objPais.Region_RegionID;        

        query = "INSERT INTO paises (nombre, Region_RegionID) VALUES (:nombre, :Region_RegionID) ";

        const respuesta =
            sequelize.query(query, {
                replacements: { nombre, Region_RegionID },
                type: sequelize.QueryTypes.INSERT
            });

        // });
        
        return "OK";
}

module.exports.modificarPais = async (objPais) => {

        let id = objPais.id;
        let nombre = objPais.nombre;
        let Region_RegionID = objPais.Region_RegionID;        

        query = "UPDATE paises SET nombre = :nombre , Region_RegionID = :Region_RegionID WHERE id = :id";

        const respuesta =
            sequelize.query(query, {
                replacements: {id, nombre, Region_RegionID},
                type: sequelize.QueryTypes.INSERT
            });        
        
        return "OK";
}

module.exports.mostrarRegiones= async (obj) => {

    let {nombre} = obj;

    query = "SELECT * FROM region"
     
    const respuesta =
        sequelize.query(query, {
            // replacements: { nombre: `%${nombre}%`},
            type: sequelize.QueryTypes.SELECT
        });

    return respuesta;

}

module.exports.eliminarPais = async (objPais) => {

    const id = objPais.id;
   
    if (id) {
        query = "DELETE FROM paises WHERE id = :id";

        const respuesta =
        sequelize.query(query, {
            replacements: { id },
            type: sequelize.QueryTypes.DELETE
        });       
        
        return respuesta;
    }
}


module.exports.mostrarPaisesRegion= async (objPais) => {

    let Region_RegionID = objPais.Region_RegionID;
    
    query = "SELECT * FROM paises WHERE Region_RegionID = :Region_RegionID" ;
    // if (nombre) {query += " AND nombre LIKE :nombre";} 
    
    const respuesta =
        sequelize.query(query, {
            replacements: { Region_RegionID: Region_RegionID},
            type: sequelize.QueryTypes.SELECT
        });

    return respuesta;

}