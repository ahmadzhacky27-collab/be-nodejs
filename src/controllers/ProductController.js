import pool from "../config/db.js";

// GET ALL DATA
export const getAllProducts = async (req, res) => {
    try {
        const [products] = await pool.query("SELECT *, categories.name AS category_name FROM products LEFT JOIN categories ON products.category_id = categories.id");
        return res.status(200).json({
            status: true,
            total: products.length,
            data: products,
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
        })
    }
};

// GET 1 DATA
// export const getCategoryById = async (req, res) => {

//     try {
//         const id = parseInt(req.params.id);
//         if (isNaN(id)) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Not a Number"
//             });
//         }
//         const [category] = await pool.query("SELECT * FROM categories WHERE id= ?", [id],);
//         if (category.length === 0) {
//             return res.status(404).json({
//                 status: false,
//                 message: "there's no data"
//             })
//         }

//         return res.status(200).json({
//             status: true,
//             message: "Category found",
//             data: category,
//         });

//     } catch (error) {
//         return res.status(500).json({
//             status: false,
//             message: "Fail Fetch user",
//             error: error.message,
//         });
//     }
// };

// // CREATE CATEGORY
// export const createCategory = async (req, res) => {
//     try {
//         const { name } = req.body;
//         if (!name) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Name must be required"
//             });
//         }
//         await pool.query("INSERT INTO categories (name) VALUES (?)", [name]);
//         return res.status(201).json({
//             status: true,
//             message: "Insert is success",
//         })
//     } catch (error) {
//         if (error.code === "ER_DUP_ENTRY") {
//             return res.status(400).json({
//                 status: false,
//                 message: "Category Name is already exist"
//             });
//         }
//         return res.status(500).json({
//             status: false,
//             message: error.message,
//         });
//     }
// };

// // UPDATE CATEGORY
// export const updateCategory = async (req, res) => {
//     try {
//         const id = parseInt(req.params.id);
//         const { name } = req.body
//         if (isNaN(id)) {
//             return res.status(400).json({
//                 status: false,
//                 message: "is Not a Number"
//             });
//         }
//         const category = await pool.query("UPDATE categories SET name=? WHERE id=?", [name, id]);
//         if (category.length === 0) {
//             return res.status(404).json({
//                 status: false,
//                 message: "Data is Not Found"
//             })
//         }
//         return res.status(200).json({
//             status: true,
//             message: "Update Success"
//         });
//     } catch (error) {
//         return res.status(500).json({
//             status: false,
//             message: "Update Failed",
//             error: error.message
//         });
//     }
// }

// // DELETE CATEGORY
// export const deleteCategory = async (req, res) => {
//     try {
//         const id = parseInt(req.params.id);
//         await pool.query("DELETE FROM categories WHERE id=?", [id]);
//         return res.status(200).json({
//             status: true,
//             message: "Category is Deleted"
//         })
//     } catch (error) {
//         return res.status(500).json({
//             status: false,
//             message: error.message
//         });
//     }
// }