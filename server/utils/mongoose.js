/**
 * Created by saurabhk on 11/06/16.
 */
"use strict";

module.exports = {
	getErrorMessage: function (err) {
		let field;
		let message = [err.message];
		let errors = err.errors;
		for (field in errors) {
			if (errors.hasOwnProperty(field)) {
				message.push(err.errors[field].message);
			}

		}
		return message.join(", ");
	},

	setOldObjectPlugin: function(schema) {
		function setOldObject(doc) {
			doc._original = doc.toObject({ transform: false });
		}

		schema.virtual("_getOldObject").get(function() {
			return this._original;
		});

		schema.pre('save', function(next){
			this._oldObject = _.clone(this._getOldObject);
			if(this.isNew) {
				// In case of new instance mongoose modifiedPaths function will
				// not include fields which are set as default by mongoose

				// so we can either set all paths to modified paths
				this._modifiedPaths = Object.keys(schema.paths);

				//// or we can add default set path to modified paths
				//// Only one solution is fine
				//this._modifiedPaths = _.clone(this.modifiedPaths());
				//let defaultModified = [];
				//let instance = this;
				//schema.eachPath(function(path) {
				//    if(instance.$isDefault(path)) {
				//        defaultModified.push(path);
				//    }
				//});
				//this._modifiedPaths = this._modifiedPaths.concat(defaultModified);
			} else {
				this._modifiedPaths = _.cloneDeep(this.modifiedPaths());
			}
			next();
		});

		schema.post('init', setOldObject);
		schema.post('save', setOldObject);
	},

	refreshPlugin: (schema) => {
		schema.methods.refresh = async function () {
			let application = this;
			return application.model(application.constructor.modelName).findOne({ _id: application._id }).exec();
		}

	}
};