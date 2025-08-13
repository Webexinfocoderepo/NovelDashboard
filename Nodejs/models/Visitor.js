const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  projectId: String,
  userId: String,
  status: String,
  ip: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  isActive:{
    type:Boolean,
    default:true
  }
});

module.exports = mongoose.model('Visitor', visitorSchema);
