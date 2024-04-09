import prisma from '../prisma';
import { CdrIdType, CdrType } from '../validators/cdr.schema';

class CdrRepository {
  constructor() {}

  async findByIdUuidAndCreatedAt(key: CdrIdType) {
    return await prisma.cdr.findUnique({
      where: {
        id_uuid_created_at: {
          ...key,
        },
      },
    });
  }

  async getAllCdrs(start: number, limit: number) {
    return await prisma.cdr.findMany({
      skip: start,
      take: limit,
    });
  }
}

export default CdrRepository;
