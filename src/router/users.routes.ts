import { Express } from "express";
import * as userController from "../controllers/user.controllers";

const userRoutes = (app: Express) => {
    // Get all users
    app.get("/allusers", userController.getUsers);

    // Get a specific user by ID
    app.get("/user/:id", userController.getUserById);

    // Create a new user
    app.post("/adduser", userController.createUser);

    // Update an existing user
    app.put("/updateuser/:id", userController.updateUser);

    // Delete a user
    app.delete("/deleteuser/:id", userController.deleteUser);
};

export default userRoutes;
