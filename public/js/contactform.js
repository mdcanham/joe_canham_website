var cf = $('#contactform');
var spinner = cf.find(".spinner");
var button = cf.find("button");

cf.on('submit', function(event){
  event.preventDefault();

  var data = cf.serialize();

  button.text("");
  spinner.css('display', 'block');

  $.post("/contact", data, function(response, status){
    if(status === "success"){
      cf.find("input, textarea").val("");
      spinner.css("display", "none");
      cf.find("button").text(response.message);
      setTimeout(function(){
        cf.find("button").text("Send");
      }, 5000);
    } else {
      spinner.css("display", "none");
      cf.find("button").text(response.message);
      setTimeout(function(){
        cf.find("button").text("Send");
      }, 5000);
    }
  }, "json");
});
