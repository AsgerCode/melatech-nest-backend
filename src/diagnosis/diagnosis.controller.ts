import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';
import { Diagnosis } from './diagnosis.entity';

@Controller('diagnosis')
export class DiagnosisController {
    constructor(
        private readonly diagnosisService: DiagnosisService,
    ) { }

    @Get()
    findAll(): Promise<Diagnosis[]> {
        return this.diagnosisService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Diagnosis> {
        return this.diagnosisService.findOne(id);
    }

    @Post()
    create(@Body() diagnosis: Partial<Diagnosis>): Promise<Diagnosis> {
        return this.diagnosisService.create(diagnosis);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.diagnosisService.remove(id);
    }
}