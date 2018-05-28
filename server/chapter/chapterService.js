const ChapterModel = MONGOOSE.model('Chapter');
module.exports = {
    async createChapter(params) {
        return new ChapterModel(params.chapter).save();
    },

    async getChapterCount(params) {
        const count = await ChapterModel.count({subject: params.subject}).exec();
        return {[params.subject]: count}
    }
}