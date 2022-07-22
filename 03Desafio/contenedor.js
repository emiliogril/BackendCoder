const { Console } = require('console');
const fs = require('fs');

class contenedor {

findNextID = (arr) =>{
        if(arr.length > 0){
            let ids = arr.map(producto =>  producto.id);
            const max = Math.max.apply(null, ids);
            return max+1;
        }else{
            return 1;
        }
    }

save = async (obj) =>{
        try {
            let datos = await this.getAll();
            let proximoId = this.findNextID(datos);
            obj = {...obj,id:proximoId};
            let datosAGuardar = [...datos,obj];
            await fs.promises.writeFile('productos.txt',JSON.stringify(datosAGuardar, null, 2));
            return proximoId;
        } catch (error) {
            console.log('Grabar - Ocurrio un error');
        }
    }

getById = async (id) =>{
        try {
            let datos = await fs.promises.readFile('productos.txt','utf-8');
            datos = JSON.parse(datos);
            let producto = datos.find(producto => producto.id === id);
            if(producto === undefined){
                return null;
            }else{
                return producto;
            }
        } catch (error) {
            return 'GetById - No se pudo consultar';
        }
    }

getAll = async () =>{
        try {
            let datos = await fs.promises.readFile('./productos.txt','utf-8');
            if (datos.length === 0){
                return [];
            }else{
                datos = JSON.parse(datos);
                return datos;
            }
        } catch (error) {
            console.log('getAll - No se pudo consultar');
        }
    }

deleteById = async (id) =>{
        try {
            let datos = await this.getAll();
            let nuevosDatos = datos.filter(producto => producto.id !== id);
            await fs.promises.writeFile('productos.txt',JSON.stringify(nuevosDatos, null, 2));
            console.log('Producto id:'+id+' a sido eliminado');
        } catch (error) {
            console.log('Ocurrio un error al eliminar');
        }
    }

deleteAll = async () => {
        try {
            await fs.promises.writeFile('productos.txt','[]');
            console.log('Todos los datos han sido eliminados');
        } catch (error) {
            console.log('deleteAll - ocurrio un error');
        }
    }
}

module.exports = contenedor;