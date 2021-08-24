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


module.exports.crearPais = async (objPais) => {

    objPais.forEach(function (item, index) {

        const nombre = item.nombre;
        const region = item.region;
        const sub_region = item.sub_region;

        query = "INSERT INTO paises (nombre, region, sub_region) VALUES (:nombre, :region, :sub_region) ";

        const respuesta =
            sequelize.query(query, {
                replacements: { nombre, region, sub_region },
                type: sequelize.QueryTypes.INSERT
            });

        });
        
        return "OK";
}