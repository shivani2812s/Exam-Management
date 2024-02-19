const Teacher=require('../models/teacherModel');
const viewSignup=(req,res)=>{
    res.render('teacherSignup');
}

const teacherSignup = async (req, res) => {
    try {
        const { name, gender, phno, employeeID, email, dob } = req.body;
        const newTeacher = new Teacher({
            name,
            gender,
            phno,
            employeeID,
            email,
            dob
        });
        await newTeacher.save();
        res.status(201).json({ message: 'teacher added successfully' });
    } catch (error) {
    
        console.error('Error adding teacher:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports={viewSignup,teacherSignup};