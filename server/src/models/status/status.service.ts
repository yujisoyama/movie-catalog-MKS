import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRedis, setRedis } from 'src/redisConfig';
import { verifyStringIsEmpty } from 'src/utils/verifyStringIsEmpty';
import { Repository } from 'typeorm';
import { ICreateStatus } from './interfaces/status';
import { Status } from './status.entity';

@Injectable()
export class StatusService {
    constructor(@InjectRepository(Status) private statusRepository: Repository<Status>) { }

    async createStatus(createStatus: ICreateStatus) {
        if (verifyStringIsEmpty(createStatus.description)) {
            return {
                message: "A descrição do status não pode ser nula.",
                property: "description"
            }
        }

        const descriptionAlreadyExists = await this.statusRepository.createQueryBuilder("status")
            .where("LOWER(status.description) = LOWER(:description)", { description: createStatus.description })
            .getOne();

        if (descriptionAlreadyExists) {
            return {
                message: "Este status já existe.",
                property: "description"
            }
        }

        const newStatus = this.statusRepository.create(createStatus);
        await this.statusRepository.save(newStatus);
        await setRedis(`status-${newStatus.id}`, JSON.stringify(newStatus));
        return "Relação adicionada com sucesso!"
    }

    async getAllStatus(): Promise<Status[]> {
        return await this.statusRepository.find();
    }

    async getStatusById(status: Partial<Status>): Promise<Status> {
        const statusRedis = await getRedis(`status-${status.id}`);
        return await JSON.parse(statusRedis);
    }

}


