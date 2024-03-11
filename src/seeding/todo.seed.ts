import { Todo } from "../entities/todo.entities";
import { AppDataSource } from "../config/database";

export const seedTodoTable = async () => {
    try {
        await AppDataSource.initialize(); // Ensure TypeORM is initialized

        // Get the repository for To do entity
        const todoRepository = AppDataSource.getRepository(Todo);

        // Insert sample to-do data
        await todoRepository.save([
            { title: "Task 1", description: "Description for Task 1" },
            { title: "Task 2", description: "Description for Task 2" }
        ]);

        console.log("Todo table seeded successfully!");
    } catch (error) {
        console.error("Error seeding todo table:", error);
    } finally {
        // Close the connection if needed
        await AppDataSource.destroy();
    }
};

// Call the function to seed the To do table
seedTodoTable();
