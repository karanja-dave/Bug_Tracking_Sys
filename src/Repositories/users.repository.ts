// import modules 
import { getPool } from '../db/config'
import { NewUser, UpdateUser, User } from '../Types/users';

//get all users
export const getUsers = async (): Promise<User[]> => {
    const pool = await getPool();
    const result = await pool.request().query('SELECT * FROM Users');
    return result.recordset;
}

//get user by id
export const getUserById = async (id: number): Promise<User[]> => {
    const pool = await getPool();
    const result = await pool
        .request()
        .input('id', id)
        .query('SELECT * FROM Users WHERE userid = @id');
    return result.recordset[0];
};

//create new user -user: any changed to user: NewUser
export const createUser = async (user: NewUser) => {
    const pool = await getPool();
    await pool
        .request()
        .input('first_name', user.first_name)
        .input('last_name', user.last_name)
        .input('email', user.email)
        .input('role_user', user.role_user)
        .input('password_hash', 'defaultpasswordhash') // Placeholder for password hash
        .input('created_at', new Date())
        .query('INSERT INTO Users (first_name, last_name, email, role_user, password_hash, created_at)');
    return { message: 'User created successfully' };
}



//update a user
export const updateUser = async (id: number, user: UpdateUser) => {
    const pool = await getPool();
    await pool
        .request()
        .input('id', id)
        .input('first_name', user.first_name)
        .input('last_name', user.last_name)
        .input('email', user.email)
        .input('role_user', user.role_user)
        .input('created_at', new Date())
        .query('UPDATE Users SET first_name = @first_name, last_name = @last_name, email= @email, role_user=@role_user, created_at=@created_at WHERE userid = @id');
    return { message: 'User updated successfully' };
}


//delete a user
export const deleteUser = async (id: number) => {
    const pool = await getPool();
    await pool
        .request()
        .input('id', id)
        .query('DELETE FROM Users WHERE userid = @id');
    return { message: 'User deleted successfully' };
}