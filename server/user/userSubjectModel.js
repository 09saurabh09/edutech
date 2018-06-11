const userSubjectSchema = new MONGOOSE.Schema({
    subjectId: { type: MONGOOSE.Schema.Types.ObjectId, ref: 'Subject' },
    completionBreakup: {},
    user: { type: MONGOOSE.Schema.Types.ObjectId, ref: 'User' },
  }, {
      timestamps: true
  });

  module.exports = MONGOOSE.model('UserSubject', userSubjectSchema, 'user_subjects');
  