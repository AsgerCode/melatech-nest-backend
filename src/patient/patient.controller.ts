import { Controller, Get, Post, Delete, Param, Body, Inject } from '@nestjs/common';
import { PatientService } from './patient.service';
import { Patient } from './patient.entity';
import { LesionsService } from 'src/lesion/lesion.service';

@Controller('patients')
export class PatientsController {
    constructor(
        private readonly patientService: PatientService,
    ) { }

    @Get()
    findAll(): Promise<Patient[]> {
        return this.patientService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Patient> {
        return this.patientService.findOne(id);
    }

    @Post()
    create(@Body() patient: Partial<Patient>): Promise<Patient> {
        return this.patientService.create(patient);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.patientService.remove(id);
    }
}