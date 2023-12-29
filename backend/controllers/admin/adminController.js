import con from "../../utils/db.js";

export const getAdmins = async (req, res) => {
    try {
        const sql = "SELECT * FROM admins";
        con.query(sql, (err, result) => {
            if (err) return res.json({
                success: false,
                Message: "Query Error: "+err
            });

            return res.json({
                success: true,
                admins: result
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

