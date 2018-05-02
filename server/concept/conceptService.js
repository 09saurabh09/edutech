const ConceptModel = MONGOOSE.model('Concept');
module.exports = {
    async createConcept(params) {
        return new ConceptModel(params.concept).save();
    },

    async listConcepts(params) {
        const ids = _.pick(params, ['conceptId']);
        return ConceptModel.find({_id: {"$in": ids.conceptId}})
    },

    async getConceptCount(params) {
        let countDistribution = {};
        const concepts = await ConceptModel.find({chapter: {"$in": params.chapterId}}).select({chapter:1}).lean().exec();
        _.each(concepts, concept => countDistribution[concept.chapter] = (countDistribution[concept.chapter] || 0) + 1);
        return countDistribution;
    }
}