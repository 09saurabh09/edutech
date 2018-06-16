const idvalidator = require('mongoose-id-validator');
const assignmentSchema = new MONGOOSE.Schema({
  name: String,
  questions: [{
    type: MONGOOSE.Schema.Types.ObjectId, ref: 'Question'
  }],
  type: String,
  parent: {
    parentType: String,
    parentId: {type: MONGOOSE.Schema.Types.ObjectId, refPath: 'parent.parentType'} 
  },
  status: {
    default: "live", // pending, live, completed
    type: String
  },
  user: { type: MONGOOSE.Schema.Types.ObjectId, ref: 'User' },
  comments: [{
    message: String, createdAt: { type: Date, default: Date.now() }, 
    createdByUserId: String, createdByUserType: String
  }]
}, {
    timestamps: true
});

assignmentSchema.plugin(idvalidator);


module.exports = MONGOOSE.model('Assignment', assignmentSchema, 'assignments');
