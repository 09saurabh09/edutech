const {allowedStates} = require('./questionConfig');
const idvalidator = require('mongoose-id-validator');
const questionSchema = new MONGOOSE.Schema({
  title: String,
  author: String,
  concepts: [{
    id: {
      type: MONGOOSE.Schema.Types.ObjectId, ref: 'Concept'
    }, weight: Number, _id: false
  }],
  difficulty: {
    type: Number, 
    required: true,
    min: [1, "Minimum difficulty can be 1"],
    max: [5, "Maximum difficulty can be 5"]
  },
  options: [{ option: String, breakage: {}, isCorrect: {type: Boolean, default: false} }],
  chapter: {
    type: MONGOOSE.Schema.Types.ObjectId, ref: 'Chapter'
  },
  state: { type: String, default: "open", enum: allowedStates },
  creater: { type: MONGOOSE.Schema.Types.ObjectId, ref: 'User' },
  approver: { type: MONGOOSE.Schema.Types.ObjectId, ref: 'User' },
  comments: [{
    _id: false, message: String, createdAt: { type: Date, default: Date.now() }, 
    createdBy: { type: MONGOOSE.Schema.Types.ObjectId, ref: 'User' }
  }]
}, {
    timestamps: true
});

questionSchema.plugin(idvalidator);

// Validate at least one correct answer is submitted
questionSchema.pre('validate', function(next) {
  const self = this;
  if(!_.some(self.options, {isCorrect: true})) return next(new APP_ERROR({message: `Question should have atleast one correct option`, status: 400}));
  next()
});

module.exports = MONGOOSE.model('Question', questionSchema, 'questions');
