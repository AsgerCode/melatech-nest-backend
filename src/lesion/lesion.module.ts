import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LesionsService } from './lesion.service';
import { LesionsController } from './lesion.controller';
import { Lesion } from './lesion.entity';
import { Diagnosis } from 'src/diagnosis/diagnosis.entity';
import { Patient } from 'src/patient/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lesion, Diagnosis, Patient])],
  providers: [LesionsService],
  controllers: [LesionsController],
})
export class LesionsModule { }