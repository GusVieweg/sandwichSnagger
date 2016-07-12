var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;
var _response;

function randomIntInclusive (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex  = /sandwich\?$/,
	    botRegex2 = /Fud\?$/,
	    botRegex3 = /Food\?$/,
	    botRegex4 = /food\?$/,
	    senderName = /Gus Vieweg$/;

  if( request.name && senderName.test(request.name) )&&((request.text && botRegex.test(request.text)) || (request.text && botRegex2.test(request.text)) || (request.text && botRegex3.test(request.text)) || (request.text && botRegex4.test(request.text) )) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;
  
  var randInt = randomIntInclusive(0,4);
  switch( randInt ) {
	case 0:
	  botResponse = "May I get a barbeque please?";
	  break;
	case 1:
	  botResponse = "i'll take a bbq big pls";
	  break;
	case 2:
	  botResponse = "its been a long day ill take whatever tyty";
	  break;
	case 3:
	  botResponse = "I'll take a barbeque thanks.";
	  break;
	case 4:
	  botResponse = "whatever's left over is good for me!";
	  break;
	default:
	  botResponse = "a bbq";
  }
  
  //botResponse = "Holla at yo boi";
  
  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;