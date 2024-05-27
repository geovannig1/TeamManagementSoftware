// define the task schema
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskTitle: {
    type: String,
    required: true,
  },
  taskDescription: {
    type: String,
  },
  taskPriority:{
    type:String,
    enum:['High','Medium','Low']
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  assignedBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  taskStatus: {
    type: String,
    enum: ['In Progress', 'Completed'],
    default: 'In Progress',
  },
  dueDate: {
    type: String,
  },
  assignedOn:{
    type:String
  },
  attachedMediaURLSet:[
    {
      mediaType :{type:String},
      mediaURL : {type:String},
      mediaName:{type:String},
      mediaSize:{type:Number}
    }
  ],
  
  taskComments:[{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Comment'
      }]
  
  // Add any additional task-related fields here
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
