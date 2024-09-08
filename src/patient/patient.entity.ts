import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Patient {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;
}