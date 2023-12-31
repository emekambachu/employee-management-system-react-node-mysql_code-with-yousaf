import bcrypt from "bcrypt";
import dateService from "../../services/dateService.js";
import fileManagementService from "../../services/fileManagementService.js";
import con from "../../utils/db.js";

export const adminCount = (req, res) => {
    const sql = "SELECT COUNT(id) AS total FROM admins";
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
            total_admin: result[0].total
        });
    });
}

export const adminEmployeesCount = (req, res) => {
    const sql = "SELECT COUNT(id) AS total FROM employees";
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
            total_employees: result[0].total
        });
    });
}

export const adminSalariesCount = (req, res) => {
    const sql = "SELECT SUM(salary) AS total FROM employees";
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
            total_salaries: result[0].total
        });
    });
}

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

    // Validate the request body here;
    const created_at = dateService.getTimeStamp();
    const updated_at = dateService.getTimeStamp();

    const sql = "INSERT INTO employees (first_name, last_name, email, mobile, password, address, dob, salary, category_id, image, created_at, updated_at) VALUES (?)";

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if(err) {
            return res.json({
                success: false,
                message: "Server Error: " + err
            });
        }

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
                    server_error: "Server Error: " + err,
                });
            }

            return res.json({
                success: true,
                message: "Employee Added",
                employee: values,
            });
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