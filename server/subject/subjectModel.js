const subjectSchema = new MONGOOSE.Schema({
    name:  String
  }, {
      timestamps: true
  });
  
  module.exports = MONGOOSE.model('Subject', subjectSchema, 'subjects');
  