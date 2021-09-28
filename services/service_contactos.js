const { sequelize } = require("../config/config.js");

module.exports.mostrarContactos = async (objContacto) => {

    let {id, email, nombre, apellido, pais, region, compania } = objContacto;

    query = "SELECT * FROM contactos WHERE 1 = 1"
    if (id) {query += " AND id = :id";}
    if (email) {query += " AND email = :email";} 
    if (nombre) {query += " AND nombre LIKE :nombre";} 
    if (apellido) {query += " AND apellido LIKE :apellido";} 
    if (pais) {query += " AND pais LIKE :pais";} 
    // if (region) {query += " AND region LIKE :region";}    region: `%${region}%`
    if (compania) {query += " AND compania LIKE :compania";} 
    
    const respuesta =
        sequelize.query(query, {
            replacements: { id: id, email: email, nombre: `%${nombre}%`, apellido: `%${apellido}%`, pais: `%${pais}%`, compania: `%${compania}%`},
            type: sequelize.QueryTypes.SELECT
        });

    return respuesta;

}

module.exports.buscarContacto = async (objContacto) => {

    if (objContacto.id) {
        query = "SELECT * FROM contactos WHERE id = :id";

    const respuesta =
        sequelize.query(query, {
            replacements: { id: objContacto.id },
            type: sequelize.QueryTypes.SELECT
        });

    return respuesta;
    
    } else if (objContacto.email) {

        query = "SELECT * FROM contactos WHERE email = :email";

        const respuesta =
            sequelize.query(query, {
                replacements: { email: objContacto.email },
                type: sequelize.QueryTypes.SELECT
            });
    
        return respuesta;

        
    }else {

        return "Error, Debe enviar Email";

    }
    
}

module.exports.crearContacto = async (objContacto) => {

    const { nombre, apellido, email, telefono, compania, cargo, canal_preferido,compania_companiaID,ciudad_ciudadID } = objContacto;

    if (nombre) {

        query = "INSERT INTO contactos (nombre, apellido, email, telefono, compania, cargo, canal_preferido, compania_companiaID, ciudad_ciudadID) VALUES ( :nombre, :apellido, :email, :telefono, :compania, :cargo, :canal_preferido ,:compania_companiaID, :ciudad_ciudadID) ";

        const respuesta2 =
            sequelize.query(query, {
                replacements: { nombre, apellido, email, telefono, compania, cargo, canal_preferido,compania_companiaID,ciudad_ciudadID},
                type: sequelize.QueryTypes.INSERT
            });

         return respuesta2;

    }

}

module.exports.editarContacto = async (objContacto) => {

    const {id, nombre, apellido, email, telefono, compania_companiaID, cargo, canal_preferido } = objContacto;

    if (id) {
       
        query = "UPDATE contactos SET nombre = :nombre , apellido = :apellido, email  =:email, telefono = :telefono, compania_companiaID = :compania_companiaID, cargo = :cargo, canal_preferido = :canal_preferido WHERE id = :id";

        const respuesta2 =
            sequelize.query(query, {
                replacements: {id, nombre, apellido, email, telefono, compania_companiaID, cargo, canal_preferido},
                type: sequelize.QueryTypes.UPDATE
            });

        return respuesta2;

    }

}


module.exports.eliminarContacto = async (objContacto) => {

    const id = objContacto.id;

    if (id) {

        query = "DELETE FROM contactos WHERE id = :id";

        const respuesta =
            sequelize.query(query, {
                replacements: { id },
                type: sequelize.QueryTypes.DELETE
            });

        return respuesta;

    }

}

module.exports.eliminarContactosSeleccionados = async (objUsuario) => {

    const id = objUsuario;

    // console.log('entra service ' + id)
    if (id) {

        query = "DELETE FROM contactos WHERE id = :id";

        const respuesta =
            sequelize.query(query, {
                replacements: { id },
                type: sequelize.QueryTypes.DELETE
            }).catch(function (err){
                console.log("error" + error)
            });

        return respuesta;

    }

}