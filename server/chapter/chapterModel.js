const idvalidator = require('mongoose-id-validator');
const chapterSchema = new MONGOOSE.Schema({
    name:  String,
    subject: {
      type: MONGOOSE.Schema.Types.ObjectId, ref: 'Subject'
    }
  }, {
      timestamps: true
  });
  
  chapterSchema.plugin(idvalidator);

  module.exports = MONGOOSE.model('Chapter', chapterSchema, 'chapters');
  