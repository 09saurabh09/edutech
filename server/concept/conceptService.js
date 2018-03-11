const conceptModel = MONGOOSE.model('Concept');
module.exports = {
    async createConcept(params) {
        return new conceptModel(params.concept).save();
    }
}