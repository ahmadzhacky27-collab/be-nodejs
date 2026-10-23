import pool from "../config/db.js";
import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";

// GET ALL DATA
export const getAllUser = async (req, res) => {

    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                created_at: true,
                update_at: true,
            },
            orderBy: { id: "desc" },
        });
        // const [rows] = await pool.query("SELECT id, name, email, is_active FROM users");
        return res.status(200).json({
            status: true,
            message: "Fetch user success",
            total: users.length,
            data: users,
        });
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            status: false,
            message: "Fetch user failed",
            error: error.message
        });
    }
}

// GET 1 DATA
export const getUserById = async (req, res) => {

    try {
        const id = parseInt(req.params.id);
        const user = await prisma.user.findUnique({
            where: { id: id },
        });

        return res.status(200).json({
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

// CREATE USER
export const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
        // const [user] = await pool.query("INSERT INTO users(name,email,password) VALUES (?,?,?)", [name, email, password]);
        return res.status(201).json({
            status: true,
            message: "Create user success",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Create user failed",
            error: error.message
        });
    }
};

// UPDATE USER
export const updateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, email, password, is_active } = req.body;
        let update = "";

        const dataUpdate = {};
        if(email) dataUpdate.email = email;
        if(name) dataUpdate.name = name;
        if(password) { dataUpdate.password = await bcrypt.hash(password, 10)};

        const user = await prisma.user.update({
            where: { id: id },
            data: dataUpdate,
            select: {
                id: true,
                name: true,
                email: true,
                created_at: true,
                update_at: true,
            }
        });

        // if (!password) {
        //     const [user] = await pool.query("UPDATE users SET name=?, email=?, is_active=? WHERE id=?", [name, email, is_active, id]);
        // } else {
        //     const [user] = await pool.query("UPDATE users SET name=?, email=?, password=?, is_active=? WHERE id=?", [name, email, password, is_active, id]);
        // }
        return res.status(200).json({
            status: true,
            message: "Update user success",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

// DELETE USER
export const deleteUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);        
        await prisma.user.delete({
            where: { id: id },
        });

        return res.status(200).json({
            status: true,
            message: "Delete user success",
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Delete user failed",
            error: error.message
        });
    }
};