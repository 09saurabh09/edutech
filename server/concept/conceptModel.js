const idvalidator = require('mongoose-id-validator');
const conceptSchema = new MONGOOSE.Schema({
    name:  String,
    chapter: {
        type: MONGOOSE.Schema.Types.ObjectId, ref: 'Chapter', required: true
    }
  }, {
      timestamps: true
  });
  
conceptSchema.plugin(idvalidator);  
module.exports = MONGOOSE.model('Concept', conceptSchema, 'concepts');
  