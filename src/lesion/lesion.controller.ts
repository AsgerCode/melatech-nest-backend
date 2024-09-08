import { Controller, Get, Post, Delete, Param, Body, Inject } from '@nestjs/common';
import { LesionsService } from './lesion.service';
import { Lesion } from './lesion.entity';

@Controller('lesions')
export class LesionsController {
    constructor(
        private readonly lesionsService: LesionsService,
    ) { }

    @Get()
    findAll(): Promise<Lesion[]> {
        return this.lesionsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Lesion> {
        return this.lesionsService.findOne(id);
    }

    @Post()
    create(@Body() diagnosis: Partial<Lesion>): Promise<Lesion> {
        return this.lesionsService.create(diagnosis);
    }


    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.lesionsService.remove(id);
    }

}