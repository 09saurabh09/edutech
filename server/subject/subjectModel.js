const subjectSchema = new MONGOOSE.Schema({
    name:  String,
    standard: {
        type: Number,
        min: 1,
        max: 12
    } // To which class/standard subject belongs to
  }, {
      timestamps: true
  });
  
  module.exports = MONGOOSE.model('Subject', subjectSchema, 'subjects');
  