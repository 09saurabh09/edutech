const subjectModel = MONGOOSE.model('Subject');
module.exports = {
    async createSubject(params) {
        return new subjectModel(params.subject).save();
    }
}