const mongoose=require('mongoose');
const teacherSchema=new mongoose.Schema({
    name:String,
    gender:String,
    phno:String,
    email:String,
    dob:Date,
    employeeID:String,
})
module.exports=mongoose.model('teacher',teacherSchema);