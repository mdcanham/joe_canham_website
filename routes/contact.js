var api_key = 'key-ca0bd1d747bbe938fddab9b36316834f';
var domain = 'mg.joecanham.co';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

exports = module.exports = function(app) {
  //Allow videos to be accessed fromt the frontend
  app.post('/contact', function(request, response){
    var data = {
      from: request.body.name + '<' + request.body.email + '>',
      to: 'admin@joecanham.co',
      subject: 'joecanham.co contact form',
      text: request.body.message
    };
    mailgun.messages().send(data, function (error, body) {
      console.log(body);
    });
  });
}
