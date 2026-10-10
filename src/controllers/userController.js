import pool from "../config/db.js";

// GET ALL DATA
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
            message: "Fetch user failed",
            error: error.message
        });
    }
}

// GET 1 DATA
export const getUserById = async (req, res) => {

    try {
        const id = parseInt(req.params.id);
        const [rows] = await pool.query("SELECT id, name, email, is_active FROM users WHERE id= ?", [id]);
        if (rows.length === 0) {
            res.status(404).json({
                status: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            status: true,
            message: "User found",
            data: rows[0],
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
    try {
        const id = parseInt(req.params.id);

        await pool.query("UPDATE FROM users WHERE id=?", [id]);
        return res.status(200).json({
            status: true,
            message: "UPDATE IS SUCCESS",
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

export const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const [result] = await pool.query("DELETE FROM users WHERE id=?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Delete User Success",
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Delete user failed",
            error: error.message
        });
    }
};