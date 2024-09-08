import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientService } from './patient.service';
import { PatientsController } from './patient.controller';
import { Patient } from './patient.entity';
import { Lesion } from 'src/lesion/lesion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, Lesion])],
  providers: [PatientService],
  controllers: [PatientsController],
})
export class PatientModule { }