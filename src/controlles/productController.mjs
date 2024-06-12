import { validationResult } from "express-validator";
import { ProductRepository } from "../repositories/product.repository.mjs";
import { productService } from "../services/productServices.mjs";

const productRepository = new ProductRepository();
const service = new productService(productRepository);

/**
 *
 * @param {request} req
 * @param {response} res
 * @route /api/product/create_product
 * @method POST
 */

export async function createProduct(req, res, next) {
  const product = req.body;
  try {
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
 *
 * @param {request} req
 * @param {response} res
 * @route /api/product/get_products
 * @method GET
 */

export async function getProducts(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const products = await service.getProducts(page, pageSize);
    res.send(products);
  } catch (err) {
    next(err);
  }
}

/**
 *
 * @param {request} req
 * @param {response} res
 * @route /api/product/delete_product/:id_product
 * @method DELETE
 */

export async function deleteProduct(req, res, next) {
  try {
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
 * @route /api/product/update_product/:id_product
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
