import { CreateProductInput } from '../validators/product.schema';
import ProductRepository from '../repositories/product.repository';

class ProductService {
  constructor(readonly productRepository: ProductRepository) {}

  async createProduct(data: CreateProductInput & { ownerId: number }) {
    return await this.productRepository.createProduct(data);
  }

  async getProduct() {
    return await this.productRepository.getProduct();
  }

  async getProducts() {
    return await this.productRepository.getProducts();
  }
}

export default ProductService;
