import bcrypt from "bcrypt";
import dateService from "../../services/date-service.js";
import con from "../../utils/db.js";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";

export const getEmployees = (req, res) => {
    const sql = "SELECT * FROM employees";
    con.query(sql, (err, result) => {
        if (err) {
            console.error("Query Error:", err);
            return res.json({
                success: false,
                message: "Query Error: " + err
            });
        }

        return res.json({
            success: true,
            employees: result
        });
    });
};

export const addEmployee = async (req, res) => {
    try {
        // Validate the request body here
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const created_at = dateService.getTimeStamp();
        const updated_at = dateService.getTimeStamp();

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

        con.query(sql, [values], (err, result) => {
            if (err) {
                console.error("Query Error:", err);
                return res.json({
                    success: false,
                    message: "Query Error: " + err,
                });
            }

            return res.json({
                success: true,
                message: "Employee Added",
                employee: values,
            });
        });

    } catch (error) {
        console.error("Error:", error);
        return res.json({
            success: false,
            message: "Server Error: ".error
        });
    }
}