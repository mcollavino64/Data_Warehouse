const express = require('express');
const bodyParser = require('body-parser');
const expressJwt = require("express-jwt");
const { firma, puerto } = require('./config/config.js');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressJwt({ secret: firma, algorithms: ["HS512"] })
	.unless({
		path: [{ url: '/v1/ingreso', methods: ['POST'] },
		{ url: '/v1/usuarios', methods: ['POST'] },
		{ url: '/v1/paises', methods: ['GET'] },
		{ url: '/v1/ciudades', methods: ['GET'] },
		{ url: '/v1/regiones', methods: ['GET']},
		{ url: '/v1/companias', methods: ['GET']}]
	})
	
);

app.use(function (err, req, res, next) {
	if (err.name === 'UnauthorizedError') {
	  return res.status(403).send({
		error: "Debe Enviar Token Valido o Su Token Expiro"
	  });
	}
  });


const usuariosRutas = require('./routes/rute_usuarios.js');
const contactosRutas = require('./routes/rute_contactos.js');
const paisesRutas = require('./routes/rute_paises.js');
const ciudadesRutas = require('./routes/rute_ciudades.js');
const regionesRutas = require('./routes/rute_regiones.js');
const companiasRutas = require('./routes/rute_companias.js');


usuariosRutas(app);
contactosRutas(app);
paisesRutas(app);
ciudadesRutas(app);
regionesRutas(app);
companiasRutas(app);

app.listen(puerto, () => {
    console.clear();
    console.log(`Servidor Inicializado en el puerto :  ${puerto}`)
});
