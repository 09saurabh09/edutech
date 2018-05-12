const idvalidator = require('mongoose-id-validator');
const subjectSchema = new MONGOOSE.Schema({
    name: String,
    parent: {
        type: MONGOOSE.Schema.Types.ObjectId, ref: 'Subject', default: null
    },
    standard: {
        type: Number,
        min: 1,
        max: 12
    } // To which class/standard subject belongs to
}, {
        timestamps: true
    });

subjectSchema.plugin(idvalidator, {
    message : 'Given {PATH} does not exist'
});

subjectSchema.pre('validate', function(next) {
    // XOR as either both should present or none should be there
    if (!this.parent != !this.standard) return next(new APP_ERROR({message: `standard and parent both should be provided`}));
    else next();
})

module.exports = MONGOOSE.model('Subject', subjectSchema, 'subjects');
