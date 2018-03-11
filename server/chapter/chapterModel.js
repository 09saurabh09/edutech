const chapterSchema = new MONGOOSE.Schema({
    name:  String,
    subject: {
      type: MONGOOSE.Schema.Types.ObjectId, ref: 'Subject'
    }
  }, {
      timestamps: true
  });
  
  module.exports = MONGOOSE.model('Chapter', chapterSchema, 'chapters');
  