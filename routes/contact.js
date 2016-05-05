var api_key = 'key-ca0bd1d747bbe938fddab9b36316834f';
var domain = 'mg.joecanham.co';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

exports = module.exports = function(app) {
  //Allow videos to be accessed from the frontend
  app.post('/contact', function(request, response){
    if(request.body.honey){
      response.status(500).send({ message: 'We think that you might be a robot! Your message was not sent.' });
      return;
    };

    if(!request.body.name ||  request.body.name === ""
    || !request.body.email ||  request.body.email === ""
    || !request.body.message ||  request.body.message === ""){
      response.status(400).send({ messsage: 'Please enter your details correctly' });
      return;
    }

    var data = {
      from: request.body.name + '<' + request.body.email + '>',
      to: process.env.CONTACT_EMAIL,
      subject: 'joecanham.co contact form',
      text: request.body.message
    };
    mailgun.messages().send(data, function (error, body) {
      if(error){
        response.status(400).send({ messsage: 'Something went wrong, please try again.' });
        return;
      }
      response.status(200).send({message: 'We\'ve got your message. Thanks!'});
    });
  });
}
