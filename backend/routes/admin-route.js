import express from 'express';

const router = express.Router();
router.post('/api/admin/login', (req, res, next) => {
    console.log("Form request", req.body);
    // res.json({
    //     success: true
    // })
});

export {router as adminRouter}