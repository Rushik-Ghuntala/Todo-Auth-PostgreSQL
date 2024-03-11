import { Todo } from "../entities/todo.entities";
import { AppDataSource } from "../config/database";

export const seedTodoTable = async () => {
    const todoRepository = AppDataSource.getRepository(Todo);

    // Insert sample to do data
    await todoRepository.save([
        { title: "Task 1", description: "Description for Task 1" },
        { title: "Task 2", description: "Description for Task 2" }
    ]);

    console.log("Todo table seeded successfully!");
};
