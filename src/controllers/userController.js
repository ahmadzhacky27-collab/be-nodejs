import pool from "../config/db.js";

const USERS = [
    {
        id: 1,
        name: "Joko",
        email: "joko@gmail.com",
        password: "12345678",
    },
    {
        id: 2,
        name: "Anis",
        email: "anis@gmail.com",
        password: "12345678",
    },
    {
        id: 3,
        name: "Ganjar",
        email: "ganjar@gmail.com",
        password: "12345678",
    },
];

// CRUD

// READ
export const getAllUser = async (req, res) => {

    try {
        const [rows] = await pool.query("SELECT id, name, email, is_active FROM users");
        return res.status(200).json({
            status: true,
            message: "Fetch user success",
            total: rows.length,
            data: rows,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Fetch user success",
            error: error.message
        });
    }
}

export const getUserById = async (req, res) => {

    try {
        const id = parseInt(req.params.id);
        // FIND
        const user = await pool.query("SELECT id, name, email, is_active FROM users WHERE id= ?", [id],);
        if (!user) {
            res.status(404).json({
                status: false,
                message: "User not found",
            })
        }

        res.status(200).json({
            status: true,
            message: "User found",
            data: user,
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Fail Fetch user",
            error: error.message,
        });
    }
};

export const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {

        const [user] = await pool.query("INSERT INTO users(name,email,password) VALUES (?,?,?)", [name, email, password]);

        return res.status(201).json({
            status: true,
            message: "Create Data Success",
            data: { id: user.insertId, name, email },
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Create user failed",
            error: error.message
        });
    }
};

export const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, password } = req.body;

    const userIndex = USERS.findIndex((u) => u.id === id);
    USERS[userIndex] = {
        ...USERS[userIndex],
        ...(name && { name }),
        ...(email && { email }),
        ...(password && { password })
    }

    return res.status(200).json({
        status: true,
        message: 'Update user success',
        data: USERS[userIndex]
    });
}

export const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = USERS.findIndex((u) => u.id === id);

    if (userIndex === -1) {
        res.status(404).json({
            status: false,
            message: "User not found",
        })
    }

    const deletedUser = USERS.splice(userIndex, 1)[0];
    return res.status(200).json({
        status: true,
        message: "Delete user success",
    });
};