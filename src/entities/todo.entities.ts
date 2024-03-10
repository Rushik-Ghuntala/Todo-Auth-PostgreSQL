import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Time } from "./time.entities";
import { User } from "./user.entities";

@Entity()
export class Todo extends Time{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne( () => User, user => user.todos)
    user: User;
}