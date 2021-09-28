# DataWarehouse

# 1 - Clonar proyecto desde la consola :

 git clone https://github.com/mcollavino64/Data_Warehouse.git

# 2 - Instalación de dependencias 🔩

 npm install

#3 - Crear base de datos 🔩

En el gestor de bd crear un nuevo esquema con el nombre "data_warehouse_2"

#4 -Ejecutar en el gestor de base de datos las consultas en scriptNuevo_DataWarehoyse.sql para la creacion de las tablas y el insert de datos

#5- Editar el archivo config/config.js con los datos de su entorno.

#6 - Iniciar el servidor, desde el master ejecturar el siguiente comando

 nodemon servidor.js

- Ya podes Utitlizar el Sistema , hace click derecho sobre el archivo index.html y seleccioná  --> Open with live server


📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌
## 7 Ingresar al Sitio

Administrador :

Usuario: Macollavino, Contraseña :123

Usuario Normal:

Usuario: Acamica , Contraseña : 123



📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌



## 8 ENDPOINT

localhost:3001/v1

| Metodo |       Enpoint      |           Body	        	|           Header	        	|                  Descripcion                           |
|--------|--------------------|-----------------------------|-------------------------------|--------------------------------------------------------|
|  POST  | /login             |{usuario,contraseña}		    |                   		    | Devuelve el Token del Usuario                          |
|   GET  | /usuarios          |                   		    |           {token }    		| Devuelve Informacion de todos los usuarios             |
|  POST  | /usuariosFiltro    |{id || email || usuario ||   |           {token }    		| Devuelve informacion de un Usuario 					 |
|        |                    | nombre || apellido}         |                               |                                                        |
|  POST  | /usuarios          |{ usuario, nombre, apellido, |                   		    | Crea un Usuario                                        |
|		 |					  |	email, contrasena, telefono,|                   		    |                                                        |
|		 |					  | domicilio  }          		|                   		    |					                                     |
|   PUT  | /usuarios          |{ usuario, nombre, apellido, |           {token }    		| Modifica un Usuario                   (Solo Admin)     |
|        | 				      |	email, contrasena, telefono,|                   		    |                                                        |
|		 |					  | domicilio}          		|                   		    |                                                        |
| DELETE | /usuarios          |{usuario}    				|           {token }    		| Elimina un usuario                    (Solo Admin)     |
|--------|--------------------|-----------------------------|-------------------------------|--------------------------------------------------------|
|   GET  | /contactos         |                      	    |           {token }       	    | Devuelve todos los contactos                           |
|  POST  | /contactosFiltro   | {id || email || nombre ||   |           {token }            | Devuelve el Contacto con la Busqueda Filtrada          |
|        |                    |apellido || pais || compania}|     	                        |                                                        |
|  POST  | /contactos         |{ nombre, apellido, email,   |           {token }            |                                                        |
|        |                    | telefono, pais, compania,   |                               |                                                        |
|        |                    | cargo, canal_preferido }    |                        		| Crea un Contacto                                       |
|		 |					  |                             |                   		    |                                                        |
|  PUT   | /contactos         |{ id, nombre, apellido, email|           {token }            |  Modifica un Contacto                                  |
|        |                    | telefono, pais, compania,   |                               |                                                        |
|        |                    | cargo, canal_preferido }    |                        		|                                                        |
|		 |					  |                             |                   		    |                                                        |
| DELETE | /contactos         |{ id}                        |           {token }    		| Elimina un Contacto                                    |
|--------|--------------------|-----------------------------|-------------------------------|--------------------------------------------------------|
|   GET  | /paises            |                      	    |           {token }       	    | Devuelve todos los paises                              |
|   POST | /paisesFiltro      | {nombre}              	    |           {token }       	    | Devuelve el resultado de paises Filtrado               |
|--------|--------------------|-----------------------------|-------------------------------|--------------------------------------------------------|
