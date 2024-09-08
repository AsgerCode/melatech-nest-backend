import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lesion {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    patientId: string;

    @Column()
    diagnosisId: string;
}