import con from "../../utils/db.js";

export const getCategories = async (req, res) => {
    try {
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

    } catch (error) {
        console.error("Error:", error);
        return res.json({
            success: false,
            message: "Server Error: ".error
        });
    }
}

export const addCategory = (req, res) => {
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
}