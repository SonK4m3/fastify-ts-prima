import prisma from '../prisma';
import { CreateProductInput } from '../validators/product.schema';

class ProductRepository {
  constructor() {}
  async createProduct(data: CreateProductInput & { ownerId: number }) {
    return await prisma.product.create({
      data,
    });
  }

  async getProduct() {
    return await prisma.product.findMany({
      select: {
        content: true,
        title: true,
        price: true,
        id: true,
        owner: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
  }

  async getProducts() {
    return await prisma.product.findMany();
  }
}

export default ProductRepository;
