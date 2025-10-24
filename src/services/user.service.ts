// import packages 
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

// import modules 
import *as userRepositories from '../Repositories/users.repository'
import { NewUser,UpdateUser } from '../Types/users.types'

// load env variables 
dotenv.config()

// reusable function to check if user exist 
const ensureUserExists = async (id: number) => {
    const user = await userRepositories.getUserById(id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

// get all users 
export const listUsers = async() => await userRepositories.getUsers();

// get users by id 
export const getUser =async(id:number)=>{
    if(isNaN(id)){
        throw new Error('Invalid User Id')
    }
    return await ensureUserExists(id)
}

// create user by Id and hash their password 
export const createUser = async(user:NewUser)=>{
    // hash pass b4 saving 
    if(user.password_hash){
        user.password_hash=await bcrypt.hash(user.password_hash,10)
        console.log('Hashed password',user.password_hash)
    }

    return await userRepositories.createUser(user)
}

// update user by Id 
export const updateUser=async(id:number,user:UpdateUser)=>{
    if(isNaN(id)){
        throw new Error('Invalid User Id')
    }
    await ensureUserExists(id);
    // hash pass on update
    if(user.password_hash){
        user.password_hash=await bcrypt.hash(user.password_hash,10)
        console.log('Hashed password',user.password_hash)
    }
    return await userRepositories.updateUser(id,user)
}

// delete user by Id 
export const deleteUser = async(id:number)=>{
    if(isNaN(id)){
        throw new Error('Invaid User Id')
    }
    await ensureUserExists(id);
    return await userRepositories.deleteUser(id)
}