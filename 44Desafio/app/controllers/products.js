const { httpError } = require("../helpers/handleErrors");

const ProductsService = require("../services/products");
const PORT = process.env.PORT || 8080;

class ProductsController {
  constructor() {
    this.servicio = new ProductsService();
  }

  getProducts = async (req, res) => {
    const username = req.user.username;
    // console.log(username)
    try {
      let products = await this.servicio.listAllProducts();
      await res.render("main", {
        products: products,
        username: username
      });
    } catch (e) {
      httpError(res, e);
    }
  };

  getProductos = async (req, res) => {
    let products = await this.servicio.getAll();
    res.send(products)
  }

  getProduct = async (req, res) => {
    const id = req.params.id;
    try {
      let product = await this.servicio.listOneProduct(id);
      res.send(product);
    } catch (err) {
      res.send("FAILED IN GET PRODUCT BY ID");
    }
  };

  createProduct = async (req, res) => {
    const data = req.body;
    // console.log(req.body)
    try {
      await this.servicio.createProducts(data);
      res.redirect(`http://localhost:${PORT}/products`);
    } catch (e) {
      httpError(res, e);
    }
  };

  updateProduct = (req, res) => {};

  deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
      await this.servicio.deleteOneProduct(id);
      res.send("Producto Eliminado");
    } catch (err) {
      res.send("FAILEDD");
    }
  };
}

module.exports = { ProductsController };

// getProducts = async (req, res) => {
//   if (req.session.passport.user) {
//     try {
//       let products = await listAllProducts();
//       await res.render("main", {
//         products: products,
//         username: req.session.passport.user,
//       });
//     } catch (e) {
//       httpError(res, e);
//     }
//   } else {
//     res.redirect("http://localhost:8080/login");
//   }
// };