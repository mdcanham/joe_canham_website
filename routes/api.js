/*********************************************
A LIGHT-WEIGHT API TO PUBICALLY ACCESS PORTFOLIO CONTENT
**********************************************/
var keystone = require('keystone');

exports = module.exports = function(app) {
  //Allow videos to be accessed fromt the frontend
  app.get('/api/v1/portfolio/videos', function(request, response){
    var videos;
    keystone.list('Video').model.find().sort({ 'sortOrder' : 1 }).exec(function(err, results) {
			if (err || !results.length) {
        console.log(error);
        return;
			}
      response.send(results);
		});
  });
}
