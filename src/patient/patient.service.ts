import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { Lesion } from 'src/lesion/lesion.entity';

@Injectable()
export class PatientService {
    constructor(
        @InjectRepository(Patient) private patientsRepository: Repository<Patient>,
        @InjectRepository(Lesion) private lesionRepository: Repository<Lesion>,
    ) { }

    findAll(): Promise<Patient[]> {
        return this.patientsRepository.find();
    }

    async findOne(id: string): Promise<Patient> {
        const patient = await this.patientsRepository.findOneBy({ id });

        if (patient === null) {
            throw new Error('Patient not found.');
        }

        return patient;
    }

    async remove(id: string): Promise<void> {
        const lesion: Lesion = await this.lesionRepository.findOne({
            where: { patientId: id}
        })

        if (lesion !== null) {
            console.log(lesion)
            throw new Error('Patient has related lesion.');
        }

        await this.patientsRepository.delete(id);
    }

    create(patient: Partial<Patient>): Promise<Patient> {
        const newPatient = this.patientsRepository.create(patient);
        return this.patientsRepository.save(newPatient);
    }
}