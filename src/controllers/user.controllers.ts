import {request, response} from 'express';
import * as userService from '../services/user.service';

export const getUsers = async (req = request, res = response) => {
    try {
        const users = await userService.listUsers();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ error.message });
    }
};


//get user by id
export const getUserById = async (req = request, res = response) => {
    const id = parseInt(req.params.id);
    try {
        const user = await userService.getUser(id);
        res.status(200).json(user);
    } catch (error: any) {
        if (error.message === 'Invalid userid') {
            res.status(400).json({ message: 'Invalid userid' })
            } else if (error.message === 'User not found') {
            res.status(404).json({ message: 'User not found' })
            } else {
            res.status(500).json({ error: error.message });
        }
    }
}

//create new user
export const createUser = async (req = request, res = response) => {
    const user = req.body;
    try {
        const result = await userService.createUser(user);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}


//update a user
export const updateUser = async (req = request, res = response) => {
    const id = parseInt(req.params.id);

    //update
    try {
        const user = req.body;
        const result = await userService.updateUser(id, user);
        res.status(200).json(result);
    } catch (error: any) {
        if (error.message === 'Invalid userid') {
            res.status(400).json({ message: 'Invalid userid' })
            } else if (error.message === 'User not found') {
            res.status(404).json({ message: 'User not found' })
            } else {
            res.status(500).json({ error: error.message });
        }
    }
}


//delete a user
export const deleteUser = async (req = request, res = response) => {
    const id = parseInt(req.params.id);

    //delete
    try {
        const result = await userService.deleteUser(id);
        res.status(200).json(result);
    } catch (error: any) {
        if (error.message === 'Invalid userid') {
            res.status(400).json({ message: 'Invalid userid' })
            } else if (error.message === 'User not found') {
            res.status(404).json({ message: 'User not found' })
            } else {
            res.status(500).json({ error: error.message });
        }
    }
}

