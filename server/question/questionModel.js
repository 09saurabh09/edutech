const questionSchema = new MONGOOSE.Schema({
  title: String,
  author: String,
  concepts: [{
    id: {
      type: MONGOOSE.Schema.Types.ObjectId, ref: 'Concept'
    }, weight: Number, _id: false
  }],
  options: [{ option: String, breakage: {}, _id: false }],
  chapter: {
    type: MONGOOSE.Schema.Types.ObjectId, ref: 'Chapter'
  },
  state: { type: String, default: "open" },
  creater: { type: MONGOOSE.Schema.Types.ObjectId, ref: 'User' },
  approver: { type: MONGOOSE.Schema.Types.ObjectId, ref: 'User' },
  comments: [{
    _id: false, message: String, createdAt: { type: Date, default: Date.now() }, 
    createdBy: { type: MONGOOSE.Schema.Types.ObjectId, ref: 'User' }
  }]
}, {
    timestamps: true
  });

module.exports = MONGOOSE.model('Question', questionSchema, 'questions');
