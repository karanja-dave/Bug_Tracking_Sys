import { Express } from "express";
import * as userController from "../controllers/user.controllers";

const userRoutes = (app: Express) => {
    // Get all users
    app.get("/users", userController.getUsers);

    // Get a specific user by ID
    app.get("/users/:id", userController.getUserById);

    // Create a new user
    app.post("/users", userController.createUser);

    // Update an existing user
    app.patch("/users/:id", userController.updateUser);

    // Delete a user
    app.delete("/users/:id", userController.deleteUser);

    // Log in user 
    app.post('/login',userController.loginUser)
};

export default userRoutes;
