const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({

  name: {
    type: String,
    default:"No Name",
  },

  rfid: {
    type: String,
    required: [true, 'is required'],
    
  },
  number:{
    type:Number,
    default:1,
  }

  

}, {minimize: false});






const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;