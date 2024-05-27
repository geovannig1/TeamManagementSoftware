// define the project schema
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String, 
  },
  projectManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  projectMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
],
allTasks: 
[{
   type: mongoose.Schema.Types.ObjectId,
   ref: 'Task',
  }],
  startDate:{
    type: Date,
    required:true
  },
projectStatus:{
  type: String,
  enum: ['In Progress', 'Completed'],
},
attachedMediaURLSet:[
  {
    mediaType :{type:String},
    mediaURL : {type:String},
    mediaName:{type:String},
    mediaSize:{type:Number}
  }
],
projectComments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Comment'
  }]
  // Add any additional project-related fields here
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
