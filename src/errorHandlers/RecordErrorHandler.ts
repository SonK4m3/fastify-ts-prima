import { errorCodes, FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { PermissionError } from '../models/error';

export class RecordErrorHandler {
  static handle(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
    if (error instanceof errorCodes.FST_ERR_BAD_STATUS_CODE) {
      reply.status(500).send({ message: 'Server internal error!' });
    } else if (error instanceof PermissionError) {
      reply.status(403).send({ message: error.message });
    } else {
      reply.send(error);
    }
  }
}
