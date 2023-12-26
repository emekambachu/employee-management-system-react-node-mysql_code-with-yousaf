import express from 'express';
import con from '../utils/db.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dateService from "../services/date-service.js";

const router = express.Router();

router.post('/admin/login', (req, res) => {
    const sql = "SELECT * FROM admins WHERE email = ? AND password = ?";
    con.query(
        sql,
        [req.body.email, req.body.password],
        (err, result) => {
            if (err) return res.json({
                success: false,
                Message: "Query Error: "+err
            });

            if (result.length > 0) {
                console.log(result);
                const email = result[0].email;
                const token = jwt.sign(
                    {role: "Admin", email: email},
                    "jwt_secret_key",
                    {expiresIn: '1d'}
                );
                res.cookie('token', token);
                return res.json({
                    success: true
                });
            }else{
                return res.json({
                    success: false,
                    error_message: "Wrong Password or Email"
                });
            }
        })
});

router.get('/admin/categories', (req, res) => {
    const sql = "SELECT * FROM categories";
    con.query(sql, (err, result) => {
            if (err) return res.json({
                success: false,
                Message: "Query Error: "+err
            });

            return res.json({
                success: true,
                categories: result
            });
        });

})

router.post('/admin/category/add', (req, res) => {
    const sql = "INSERT INTO categories (name) VALUES (?)";
    con.query(sql, [req.body.name], (err, result) => {

            if (err) return res.json({
                success: false,
                Message: "Query Error: "+err
            });

            return res.json({
                success: true,
                category: req.body.name
            });
        });
});

router.post('/admin/employee/add', async (req, res) => {
    try {
        // Validate the request body here
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const created_at = dateService.getTimeStamp();
        const updated_at = dateService.getTimeStamp();
        console.log("NOW", created_at);

        const sql = "INSERT INTO employees (first_name, last_name, email, mobile, password, address, dob, salary, category_id, image, created_at, updated_at) VALUES (?)";

        const values = [
            req.body.first_name,
            req.body.last_name,
            req.body.email,
            req.body.mobile,
            hashedPassword,
            req.body.address,
            req.body.dob,
            req.body.salary,
            req.body.category_id,
            req.body.image,
            created_at,
            updated_at
        ];

        const result = await con.query(sql, [values]);

        return res.json({
            success: true,
            message: "Employee Added",
            employee: values
        });

    } catch (error) {
        console.error("Error:", error);
        return res.json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

export {router as adminRouter}