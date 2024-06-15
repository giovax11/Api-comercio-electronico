import { validationResult } from "express-validator";
import { ProductRepository } from "../repositories/product.repository.mjs";
import { productService } from "../services/productServices.mjs";

const productRepository = new ProductRepository();
const service = new productService(productRepository);

/**
 *Create a new product
 *
 * @param {request} req
 * @param {response} res
 * @route /api/products/
 * @method POST
 */

export async function createProduct(req, res, next) {
  const product = req.body;
  try {
    // Validate the request data using the express-validator middleware
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const createProduct = await service.createProduct(product);
    res.send(createProduct);
  } catch (err) {
    next(err);
  }
}

/**
 *Get created products
 *
 * @param {request} req
 * @param {response} res
 * @route /api/products/?page=?&pageSize=?

 * @method GET
 */

export async function getProducts(req, res, next) {
  try {
    // Extract the page and page size from the query string, defaulting to 1 and 10 if not provided
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const products = await service.getProducts(page, pageSize);
    res.send(products);
  } catch (err) {
    next(err);
  }
}

/**
 *Delete product
 *
 * @param {request} req
 * @param {response} res
 * @route /api/products/:id_product
 * @method DELETE
 */

export async function deleteProduct(req, res, next) {
  try {
    // Validate the request data using the express-validator middleware
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id_product = parseInt(req.params.id_product);
    const deletedProducts = await service.deleteProduct(id_product);
    res.send(deletedProducts);
  } catch (err) {
    next(err);
  }
}

/**
 *
 * @param {request} req
 * @param {response} res
 * @route /api/products/:id_product
 * @method PUT
 */

export async function updateProduct(req, res, next) {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id_product = parseInt(req.params.id_product);
    const product = req.body;
    const updatedProduct = await service.updateProducts(product, id_product);
    res.send(updatedProduct);
  } catch (err) {
    next(err);
  }
}
