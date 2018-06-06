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
  creater: { type: MONGOOSE.Schema.Types.ObjectId, ref: 'User' },
  comments: [{
    _id: false, message: String, createdAt: { type: Date, default: Date.now() }, 
    createdBy: { type: MONGOOSE.Schema.Types.ObjectId, ref: 'User' }
  }]
}, {
    timestamps: true
});

assignmentSchema.plugin(idvalidator);


module.exports = MONGOOSE.model('Assignment', assignmentSchema, 'assignments');
