const conceptSchema = new MONGOOSE.Schema({
    name:  String,
    chapter: {
        type: MONGOOSE.Schema.Types.ObjectId, ref: 'Chapter', required: true
    }
  }, {
      timestamps: true
  });
  
module.exports = MONGOOSE.model('Concept', conceptSchema, 'concepts');
  