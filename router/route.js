const express = require('express');
const mongoose=require('mongoose')
const router = express.Router();
const loginController=require('../controllers/loginController');
const studentController=require('../controllers/studentController');
const teacherController=require('../controllers/teacherController');
router.get('/login', loginController.viewlogin);
router.get('/signup/student',studentController.viewstudentSignup);
router.post('/signup/student',studentController.studentSignup);
router.get('/signup/teacher',teacherController.viewSignup);
router.get('/signup/teacher',teacherController.teacherSignup);
// router.get('/signup/admin',studentController);
module.exports = router;
