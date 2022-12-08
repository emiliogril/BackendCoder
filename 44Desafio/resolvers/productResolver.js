const ProductsService = require("../app/services/products");
const productsService = new ProductsService();

const getProducts = async () => {
  return await productsService.listAllProducts();
};

const getProductById = async (args) => {
  const { id } = args;
  return await productsService.listOneProduct(id);
};

const addProduct = async (args) => {
  const { title, thumbnail, price, description, category } = args;

  const newProduct = {
    title,
    thumbnail,
    price,
    description,
    category,
  };

  return await productsService.createProducts(newProduct);
};

const deleteOneProduct = async (args) => {
  const { id } = args;
  return await productsService.deleteOneProduct(id);
}

module.exports = { getProducts, getProductById, addProduct, deleteOneProduct };