import con from "../../utils/db";
import * as jwt from "jsonwebtoken";


export const adminLogout = async (req, res) => {
    res.clearCookie("token");
    return res.json({
        success: true
    });
}

export const adminLogin = async (req, res) => {

    const sql = "SELECT * FROM admins WHERE email =? AND password =?";

    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err){
            return res.json({
                success: false,
                message: "Login failed, wrong email or password"
            });
        }

        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign(
                {role: "admin", email: email},
                "jwt_secret_key",
                {expiresIn: '1d'}
            );
            res.cookie("token", token, {
                expires: new Date(Date.now() + 86400000),
                httpOnly: true
            });

            return res.json({
                success: true,
                message: "Login successful",
                token: token,
            });
        }
    })

}