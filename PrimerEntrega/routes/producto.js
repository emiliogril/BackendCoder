const fs = require('fs');

class Producto {
    constructor(ruta) {
        this.ruta = ruta
    }

    async save(obj) {
        try {

            let dataArch = await fs.promises.readFile(this.ruta, 'utf8');
            let dataArchParse = JSON.parse(dataArch);
            let timestamp = Date.now()
            if (dataArchParse.length) {

                await fs.promises.writeFile(this.ruta, JSON.stringify([...dataArchParse, { id: dataArchParse[dataArchParse.length - 1].id + 1, timestamp: timestamp, ...obj}], null, 2))
                let idProduct = dataArchParse[dataArchParse.length - 1].id + 1
                console.log(`El producto tiene el ID: ${idProduct}`);
                return idProduct;

            } else {

                await fs.promises.writeFile(this.ruta, JSON.stringify([{id: 1, timestamp: timestamp,...obj }], null, 2))
                console.log(`El producto tiene el ID: 1`);
                return 1;

            }

        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
            let dataArchParse = JSON.parse(dataArch)

            let producto = dataArchParse.find(producto => producto.id === id)
            if (producto) {
                console.log(producto)
                return producto
            } else {
                console.log('El producto no existe');
                return null
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            if (dataArchParse.length) {
                return dataArchParse

            } else {
                console.log('No hay Productos')
            }

        } catch (error) {
            console.log(error);
        }
    }

    async updateById(id, product) {
        product.id = id

        try {
            const products = await this.getAll()
            const index = products.findIndex(obj => obj.id === id)
            let timestamp = Date.now()
            if (index !== -1){
                product.timestamp = timestamp
                products[index] = product
                await fs.promises.writeFile(this.ruta, JSON.stringify(products, null, 2))
                return {mensaje: 'Producto actualizado'}

            } else {
                return {mensaje: 'Producto no encontrado'}
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            let producto = dataArchParse.find(producto => producto.id === id)
            if (producto) {
                let dataArchParseFiltered = dataArchParse.filter(producto => producto.id !== id)
                await fs.promises.writeFile(this.ruta, JSON.stringify(dataArchParseFiltered, null, 2))
                console.log('Producto Eliminado')
            } else {
                console.log('No se encontró el producto')
            }

        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2), 'utf8')
        console.log('Todos los productos se han eliminado')
    }
}

module.exports = Producto;