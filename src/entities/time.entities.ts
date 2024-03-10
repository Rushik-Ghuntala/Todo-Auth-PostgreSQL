import { CreateDateColumn, UpdateDateColumn } from "typeorm";


export class Time {
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @UpdateDateColumn( { type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updatedAt: Date;
}