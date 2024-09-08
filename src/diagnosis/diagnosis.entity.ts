import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Diagnosis {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;
}