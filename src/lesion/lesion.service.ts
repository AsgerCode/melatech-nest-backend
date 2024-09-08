import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesion } from './lesion.entity';
import { Patient } from 'src/patient/patient.entity';
import { Diagnosis } from 'src/diagnosis/diagnosis.entity';

@Injectable()
export class LesionsService {
    constructor(
        @InjectRepository(Lesion) private lesionsRepository: Repository<Lesion>,
        @InjectRepository(Patient) private patientsRepository: Repository<Patient>,
        @InjectRepository(Diagnosis) private diagnosisRepository: Repository<Diagnosis>,
    ) { }

    findAll(): Promise<Lesion[]> {
        return this.lesionsRepository.find();
    }

    async findOne(id: string): Promise<Lesion> {
        const lesion = await this.lesionsRepository.findOneBy({ id });

        if (lesion === null) {
            throw new Error('Lesion not found.');
        }

        return lesion;
    }

    async remove(id: string): Promise<void> {
        const lesion: Lesion = await this.lesionsRepository.findOneBy({ id });

        if (lesion === null) {
            throw new Error('Lesion not found.');
        }

        const patient: Patient = await this.patientsRepository.findOne({
            where: { id: lesion.patientId }
        });
        const diagnosis: Diagnosis = await this.diagnosisRepository.findOne({
            where: { id: lesion.diagnosisId }
        })

        if (patient !== null || diagnosis !== null) {
            throw new Error('Lesion has related patient or diagnosis.');
        }

        await this.lesionsRepository.delete(id);
    }

    create(lesion: Partial<Lesion>): Promise<Lesion> {
        const newLesion = this.lesionsRepository.create(lesion);
        return this.lesionsRepository.save(newLesion);
    }
}