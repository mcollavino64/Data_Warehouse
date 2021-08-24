const { sequelize } = require("../config/config.js");

module.exports.mostrarContactos = async (objContacto) => {

    let {id, email, nombre, apellido, pais, region, compania } = objContacto;

    query = "SELECT * FROM contactos WHERE 1 = 1"
    if (id) {query += " AND id = :id";}
    if (email) {query += " AND email = :email";} 
    if (nombre) {query += " AND nombre LIKE :nombre";} 
    if (apellido) {query += " AND apellido LIKE :apellido";} 
    if (pais) {query += " AND pais LIKE :pais";} 
    if (region) {query += " AND region LIKE :region";} 
    if (compania) {query += " AND compania LIKE :compania";} 
    
    const respuesta =
        sequelize.query(query, {
            replacements: { id: id, email: email, nombre: `%${nombre}%`, apellido: `%${apellido}%`, pais: `%${pais}%`, region: `%${region}%`, compania: `%${compania}%`},
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


    const { nombre, apellido, email, telefono, pais, compania, cargo, canal_preferido } = objContacto;

    if (nombre) {

        query = "SELECT * FROM paises WHERE nombre LIKE :nombre";
        
        const respuesta =
            sequelize.query(query, {
                replacements: { nombre: `%${pais}%`},
                type: sequelize.QueryTypes.SELECT
            });
    
        const resultado = await respuesta;
        const region = await resultado[0].region;

        query = "INSERT INTO contactos (nombre, apellido, email, telefono, pais, region, compania, cargo, canal_preferido) VALUES ( :nombre, :apellido, :email, :telefono, :pais, :region, :compania, :cargo, :canal_preferido ) ";

        const respuesta2 =
            sequelize.query(query, {
                replacements: { nombre, apellido, email, telefono, pais, region, compania, cargo, canal_preferido},
                type: sequelize.QueryTypes.INSERT
            });

         return respuesta2;

    }

}

module.exports.editarContacto = async (objContacto) => {

    const {id, nombre, apellido, email, telefono, pais, compania, cargo, canal_preferido } = objContacto;

    if (id) {

        query = "SELECT * FROM paises WHERE nombre LIKE :nombre";
        
        const respuesta =
            sequelize.query(query, {
                replacements: { nombre: `%${pais}%`},
                type: sequelize.QueryTypes.SELECT
            });
    
        const resultado = await respuesta;
        const region = await resultado[0].region;

        query = "UPDATE contactos SET nombre = :nombre , apellido = :apellido, email  =:email, telefono = :telefono, pais = :pais, region = :region, compania = :compania, cargo = :cargo, canal_preferido = :canal_preferido WHERE id = :id";

        const respuesta2 =
            sequelize.query(query, {
                replacements: {id, nombre, apellido, email, telefono, pais, region, compania, cargo, canal_preferido},
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