const conceptSchema = new MONGOOSE.Schema({
    name:  String
  }, {
      timestamps: true
  });
  
module.exports = MONGOOSE.model('Concept', conceptSchema, 'concepts');
  