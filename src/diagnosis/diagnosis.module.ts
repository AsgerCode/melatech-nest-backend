import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosisService } from './diagnosis.service';
import { DiagnosisController } from './diagnosis.controller';
import { Diagnosis } from './diagnosis.entity';
import { Lesion } from 'src/lesion/lesion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Diagnosis, Lesion])],
  providers: [DiagnosisService],
  controllers: [DiagnosisController],
})
export class DiagnosisModule { }