import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import ProductController from '../controllers/product.controller';
import { $ref, CreateProductInput } from '../validators/product.schema';

const productController = new ProductController();
async function productRoutes(server: FastifyInstance) {
  server.post(
    '/',
    {
      // preHandler: [server.authenticate],
      schema: { body: $ref('createProductSchema'), response: { 201: $ref('productsResponseSchema') } },
    },
    (request: FastifyRequest<{ Body: CreateProductInput }>, reply: FastifyReply) =>
      productController.createProductHandler(request, reply),
  );

  server.get(
    '/',
    { schema: { response: { 200: $ref('productsResponseSchema') } } },
    productController.getProductsHandler,
  );
}

export default productRoutes;
