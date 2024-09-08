import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diagnosis } from './diagnosis.entity';
import { Lesion } from 'src/lesion/lesion.entity';

@Injectable()
export class DiagnosisService {
    constructor(
        @InjectRepository(Diagnosis) private diagnosisRepository: Repository<Diagnosis>,
        @InjectRepository(Lesion) private lesionRepository: Repository<Lesion>,
    ) { }

    findAll(): Promise<Diagnosis[]> {
        return this.diagnosisRepository.find();
    }

    async findOne(id: string): Promise<Diagnosis> {
        const diagnosis = await this.diagnosisRepository.findOneBy({ id });

        if (diagnosis === null) {
            throw new Error('Diagnosis not found.');
        }

        return diagnosis;
    }

    async remove(id: string): Promise<void> {
        const lesion: Lesion = await this.lesionRepository.findOne({
            where: { diagnosisId: id}
        })

        if (lesion !== null) {
            throw new Error('Diagnosis has related lesion.');
        }

        await this.diagnosisRepository.delete(id);
    }

    create(diagnosis: Partial<Diagnosis>): Promise<Diagnosis> {
        const newDiagnosis = this.diagnosisRepository.create(diagnosis);
        return this.diagnosisRepository.save(newDiagnosis);
    }
}