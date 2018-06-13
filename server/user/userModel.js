const bcrypt = require('bcrypt');
const idvalidator = require('mongoose-id-validator');
let {setOldObjectPlugin} = require('../utils/mongoose');

const userSchema = new MONGOOSE.Schema({
    name: {
        type: String,
        required: [true, "User name is required"],
    },
    email: {
        type: String,
        required: [true, "User email is required"],
    },
    password: {
        type: String,
        required: [true, "User password is required"],
    },
    organization: {
        type: String,
        required: [true, "User organization is required"],
    },
    role: String,
    currentSubjects: [{
        type: MONGOOSE.Schema.Types.ObjectId, ref: 'Subject'
    }]
}, {
        timestamps: true
});

userSchema.plugin(idvalidator);

userSchema.plugin(setOldObjectPlugin);

userSchema.pre('save', function (next) {
    const self = this;
    if (self.isNew) {
        bcrypt.hash(self.password, 10, function (err, hash) {
            if (err) return next(err)
            self.password = hash;
            return next();
        });
    } else {
        return next();
    }
});

userSchema.statics.comparePassword = function(password, userPassword) {
    return bcrypt.compare(password, userPassword);
}

userSchema.post('findOneAndUpdate', async function() {
    const userService = require('./userService');
    const currentSubjects = this._update.$set.currentSubjects.toObject();
    const userId = this._conditions._id;
    await PROMISE.all(currentSubjects.map(currentSubject => userService.createOrUpdateUserSubject(userId, currentSubject)));
  });

module.exports = MONGOOSE.model('User', userSchema, 'users');
