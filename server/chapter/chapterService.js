const ChapterModel = MONGOOSE.model('Chapter');
module.exports = {
    async createChapter(params) {
        return new ChapterModel(params.chapter).save();
    }
}