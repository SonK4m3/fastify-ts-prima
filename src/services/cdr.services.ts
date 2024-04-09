import CdrRepository from '../repositories/cdr.repository';
import { CdrIdType } from '../validators/cdr.schema';

class CdrService {
  constructor(readonly cdrRepository: CdrRepository) {}

  async findById(key: CdrIdType) {
    return await this.cdrRepository.findByIdUuidAndCreatedAt(key);
  }

  async getAllCdrs(start: number, limit: number) {
    return await this.cdrRepository.getAllCdrs(start, limit);
  }
}

export default CdrService;
