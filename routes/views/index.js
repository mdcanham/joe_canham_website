var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	locals.data = {
		skills: [],
		videos: []
	};

	//Load in skills
	view.on('init', function(next){
		keystone.list('Skill').model.find().sort({ 'sortOrder' : 1 }).exec(function(err, results) {
			if (err || !results.length) {
				return next(err);
			}
			locals.data.skills = results;
			next();
		});
	});

	view.on('init', function(next){
		keystone.list('Video').model.find().sort({ 'sortOrder' : 1 }).exec(function(err, results) {
			if (err || !results.length) {
        console.log(error);
        return;
			}
      locals.data.videos = results;
			next();
		});
	});

	// Render the view
	view.render('index');

};
