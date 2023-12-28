import bcrypt from "bcrypt";
import dateService from "../../services/dateService.js";
import fileManagementService from "../../services/fileManagementService.js";
import con from "../../utils/db.js";

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

export const getEmployee = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employees WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Query Error:", err);
            return res.json({
                success: false,
                message: "Query Error: " + err
            });
        }

        return res.json({
            success: true,
            employee: result
        });
    });
};

export const updateEmployee = (req, res) => {

    console.log("Body", req.body);
    console.log("Request", req);

    const id = req.params.id;

    // Validate the request body here
    const hashedPassword = '';
    if(req.body.password !== '') {
        const hashedPassword = bcrypt.hash(req.body.password, 10);
    }
    const updated_at = dateService.getTimeStamp();

    // Construct the SQL query with optional image update
    const sql = `
        UPDATE employees 
        SET 
            first_name = ?, 
            last_name = ?, 
            email = ?, 
            mobile = ?,
            address = ?, 
            dob = ?, 
            salary = ?, 
            category_id = ?,
            updated_at = ?
        WHERE id = ?
    `;

    const values = [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.mobile,
        req.body.address,
        req.body.dob,
        req.body.salary,
        req.body.category_id,
        updated_at
    ];

    con.query(sql, [...values, id], (err, result) => {
        if (err) {
            console.error("Query Error:", err);
            return res.json({
                success: false,
                message: "Query Error: " + err,
            });
        }

        return res.json({
            success: true,
            message: "Employee Updated",
            employee: values,
        });
    });

};

export const addEmployee = (req, res) => {

    console.log("filename", req.file.filename);

    // Validate the request body here
    const hashedPassword = bcrypt.hash(req.body.password, 10);
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
        req.file.filename,
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
}

export const deleteEmployee = (req, res) => {

    console.log("Image name", req.query.image);

    const id = req.params.id;
    const sql = "DELETE FROM employees WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Query Error:", err);
            return res.json({
                success: false,
                message: "Query Error: " + err
            });
        }

        if (result.affectedRows === 0) {
            // No employee found with the specified ID
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        // Delete file from server
        fileManagementService.deleteFile(req.query.image, "/uploads/employees/photos/");

        return res.json({
            success: true,
            message: "Deleted"
        });
    });
};