
import { User } from "../entities/user.entities";
import { AppDataSource } from "../config/database";

async function seedUserTable() {
    try {
        await AppDataSource.initialize(); // Ensure TypeORM is initialized

        const userRepository = AppDataSource.getRepository(User);

        await userRepository.save([
            { name: "John Doe", email: "john@example.com", password: "password123" },
            { name: "Jane Smith", email: "jane@example.com", password: "password456" }
        ]);

        console.log("User table seeded successfully!");
    } catch (error) {
        console.error("Error seeding user table:", error);
    } finally {
        await AppDataSource.destroy(); // Close the database connection
    }
}

seedUserTable();
