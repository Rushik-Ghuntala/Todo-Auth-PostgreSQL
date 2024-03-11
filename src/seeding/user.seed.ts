import { User } from "../entities/user.entities";
import { AppDataSource } from "../config/database";

export const seedUserTable = async () => {
    const userRepository = AppDataSource.getRepository(User);

    // Insert sample user data
    await userRepository.save([
        { name: "John Doe", email: "john@example.com", password: "password123" },
        { name: "Jane Smith", email: "jane@example.com", password: "password456" }
    ]);

    console.log("User table seeded successfully!");
};
