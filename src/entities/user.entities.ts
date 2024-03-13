import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Time } from "./time.entities";
import { Todo } from "./todo.entities";


@Entity()
export class User {
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string ;

    @Column({ nullable: true })
    childOf: number;

    @Column({ nullable: true })
    parentOf: number;

    @Column({ nullable: true }) 
    token?: string; 

    @OneToMany(() => Todo, todo => todo.user)
    todos: Todo[]
}