const { sequelize, firma } = require("../config/config.js");

module.exports.mostrarCompanias= async (objCompania) => {
    query = "SELECT * FROM compania WHERE 1 = 1";
    const respuesta =
        sequelize.query(query, {            
            type: sequelize.QueryTypes.SELECT
        });
    return respuesta;
}

//Buscar Compañia por ID
module.exports.mostrarCompaniaID= async (objCompania) => {
    let idCompania = objCompania.id;    
    query = "SELECT * FROM Compania WHERE CompaniaID = :id" ;        
    const respuesta =
        sequelize.query(query, {
            replacements: { id: idCompania},
            type: sequelize.QueryTypes.SELECT
        });
    return respuesta;
}

module.exports.crearCompania = async (objCompania) => {
    
        const nombre = objCompania.companiaDescripcion;            

        query = "INSERT INTO Compania (companiaDescripcion) VALUES (:nombre) ";

        const respuesta =
            sequelize.query(query, {
                replacements: { nombre },
                type: sequelize.QueryTypes.INSERT
            });        
        
        return "OK";
}

module.exports.modificarCompania = async (objCompania) => {
        let companiaID = objCompania.companiaID;
        let companiaDescripcion = objCompania.companiaDescripcion;        

        query = "UPDATE Compania SET companiaDescripcion = :companiaDescripcion WHERE companiaID = :companiaID";

        const respuesta =
            sequelize.query(query, {
                replacements: {companiaID, companiaDescripcion},
                type: sequelize.QueryTypes.INSERT
            });        
        
        return "OK";
}

module.exports.eliminarCompania = async (objCompania) => {

    const id = objCompania.id;
   
    if (id) {
        query = "DELETE FROM Compania WHERE companiaID = :id";

        const respuesta =
        sequelize.query(query, {
            replacements: { id },
            type: sequelize.QueryTypes.DELETE
        });       
        
        return respuesta;
    }
}