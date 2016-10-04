var express     = require('express');
var bodyParser  = require('body-parser');
var korosensei  = require('./korosensei.json');

var app = express();
var port = process.env.PORT || 1345;
var responses = korosensei.responses;
var wordBank = generateTriggerWordString();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
	res.status(200).send('Welcome to Korosensei Bot!\n===================\nPlease paste the text below into the trigger word input field in your korosensei bot integration! \n\n' + wordBank); 
});

app.listen(port,function() {
	console.log('Listening on port' + port);
});


app.post('/hello', function(req,res,next) {
	var username = req.body.user_name,
			trigger = req.body.trigger_word,
			channel = req.body.channel_name,
			botPayload = {};

	for(var i = 0; i < responses.length; i++) {
		if(trigger == responses[i].trigger) {
			botPayload.text = responses[i].message.replace("__", userwhoname);
		}
	}

	if(botPayload.text == undefined) {
		botPayload.text = "Sorry " + username + ", seems like something went wrong. :sadkorosensei:";
	}

	if(username !== 'slackbot') {
		return res.status(200).json(botPayload);
	}
	else {
		return res.status(200).end();
	}
});

function generateTriggerWordString() {
	var str = "";

	for(var i = 0; i < responses.length; i++) {
		str += responses[i].message + ",";
	}

	return str;
}






