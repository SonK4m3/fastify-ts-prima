import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateProductInput } from '../validators/product.schema';
import ProductService from '../services/product.service';
import ProductRepository from '../repositories/product.repository';

const productRepository: ProductRepository = new ProductRepository();
const productService: ProductService = new ProductService(productRepository);

class ProductController {
  constructor() {}

  async createProductHandler(request: FastifyRequest<{ Body: CreateProductInput }>, reply: FastifyReply) {
    const product = await productService.createProduct({
      ...request.body,
      ownerId: request.user.id,
    });

    return product;
  }

  async getProductsHandler() {
    const products = await productService.getProducts();
    return products;
  }
}

export default ProductController;
