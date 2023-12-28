import express from 'express';
const router = express.Router();
import multer from "multer";
import path from "path";

// controllers
import {
    getEmployees,
    addEmployee,
    getEmployee,
    updateEmployee,
    deleteEmployee,
    adminCount,
    adminEmployeesCount,
    adminSalariesCount,

} from '../controllers/admin/admin-employee-controller.js';

import {
    addCategory,
    getCategories
} from "../controllers/admin/admin-category-controller.js";

// Multer for file uploading
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/employees/photos");
    },
    filename: (req, file, cb) => {
        // get original filename without extension and join it with date and extension
        cb(null, file.originalname.split('.')[0] + "_" + Date.now() + path.extname(file.originalname));
    }
});

// Multer middleware
const upload = multer({
    storage: storage
});

router.get('/admin/count', adminCount);
router.get('/admin/employees/count', adminEmployeesCount);
router.get('/admin/salaries/count', adminSalariesCount);

router.post("/admin/employee/add", upload.single('image'), addEmployee);
router.get('/admin/employees', getEmployees);
router.get('/admin/employee/:id', getEmployee);
router.put('/admin/employee/:id/update', upload.single('image'), updateEmployee);
router.delete('/admin/employees/:id/delete', deleteEmployee);

router.post("/admin/category/add", addCategory);
router.get('/admin/categories', getCategories);

export default router;