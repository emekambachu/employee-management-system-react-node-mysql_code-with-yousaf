import con from "../../utils/db";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {check, validationResult} from "express-validator";


export const adminLogout = async (req, res) => {
    res.clearCookie("token");
    return res.json({
        success: true
    });
}

export const adminLogin = async (req, res) => {

    const sql = "SELECT * FROM admins WHERE email =?";

    con.query(sql, [req.body.email], async (err, result) => {
        if (err) {
            return res.json({
                success: false,
                server_error: "Server Error ".err
            });
        }

        // If email exists in the database
        if (result.length > 0) {
            const email = result[0].email;
            const password = result[0].password;

            // Check password
            const passwordMatch = await bcrypt.compare(req.body.password, password);
            if (!passwordMatch) {
                return res.json({
                    success: false,
                    errors: "Incorrect password"
                });
            }

            // Generate token
            const token = jwt.sign(
                { role: "admin", email: email },
                process.env.JWT_SECRET_KEY || "default_secret_key",
                { expiresIn: '1d' }
            );

            // Name token and set expiry
            res.cookie("token", token, {
                expires: new Date(Date.now() + 86400000),
                httpOnly: true
            });

            // return success and token
            return res.json({
                success: true,
                message: "Login successful",
                token: token,
            });
        }

        // Email not found in the database
        return res.json({
            success: false,
            errors: "Wrong email or password"
        });
    });
};
