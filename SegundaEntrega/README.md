# Proyecto Final Segunda Etapa Coderhouse curso Backend
# DBaaS | Mongo Atlas |  Firebase | Integración con Node.js

Acuerdo revisando por la consigna:
Es armar los contenedores que ya desarrollados (memoria, archivos) y dos contenedores más (que todos cumpliendo con la misma interfaz) que permitan realizar las operaciones básicas de CRUD en MongoDb (ya sea local o remoto) y en Firebase.
Luego de eso, para cada contenedor, crear dos clases derivadas, una para trabajar con Productos, y otra para trabajar con Carritos.

Aspectos a incluir en el entregable:
A las clases derivadas de los contenedores se las conoce como DAOs (Data Access Objects), y pueden ir todas incluidas en una misma carpeta de ‘daos’.
En la carpeta de daos, incluir un archivo que importe todas las clases y exporte una instancia de dao de productos y una de dao de carritos, según corresponda. Esta decisión se tomará en base al valor de una variable de entorno cargada al momento de ejecutar el servidor (opcional: investigar el uso de imports dinámicos).
Incluir un archivo de configuración (config) que contenga los datos correspondientes para conectarse a las bases de datos o medio de persistencia que corresponda.

La otra opcional:
Hacer lo mismo para bases de datos relacionales: MariaDB/SQLite3.

* Para inicializar la tabla "Articulos" hay que ejecutar el archivo mysql.js