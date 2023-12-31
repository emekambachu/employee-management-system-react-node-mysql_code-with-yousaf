import express from 'express';
const router = express.Router();

// controllers
import {
    employeeLogin,

} from '../controllers/employee/employeeAuthController.js';

const {
    loginValidation,
} = require('../middlewares/validators/auth/loginValidation');

router.post('/employee/login', loginValidation, employeeLogin);

export default router;