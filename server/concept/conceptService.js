const ConceptModel = MONGOOSE.model('Concept');
module.exports = {
    async createConcept(params) {
        return new ConceptModel(params.concept).save();
    },

    async listConcepts(params) {
        const ids = _.pick(params, ['conceptId']);
        return ConceptModel.find({_id: {"$in": ids.conceptId}})
    }
}