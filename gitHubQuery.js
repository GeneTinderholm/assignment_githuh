const request = require('request');
const fs = require('fs');

const baseUri = 'https://api.github.com';

class gitHubQuery{
	constructor(apiKey){
		this.apiKey = apiKey;
	}
	callbackRepos(info) {
	    info.map(function(x){
		    console.log(`\n${x.name}\n${x.description}`);
	    });
	}

	callbackProfile(info) {
		    console.log(`\nemail:${info.email}\n# of public repos:${info.public_repos}\n# of followers:${info.followers},\n# following:${info.following}`);
	}

	userRepos(userName){
		this._sendRequest(userName, "/repos", this.callbackRepos);
	}

	userStarred(userName){
		this._sendRequest(userName, "/starred", this.callbackRepos);
	}

	userProfile(userName){
		this._sendRequest(userName, "", this.callbackProfile);
	}

	_sendRequest(userName, type, callback){
		let options = {
			url: `${baseUri}/users/${userName}${type}`,
			headers: {
				'Authorization': `token ${this.apiKey}`,
				'User-Agent': 'Gene\'s script'
			}
		};
		request(options, function(error, response, body){
			if(!error & response.statusCode == 200){
				callback(JSON.parse(body));
			}else{
				let testfl = `error:\n${error}\nresponse:\n${response}\nbody:${body}`;
				console.log(testfl);
			}
		});
	}
}

module.exports = gitHubQuery;
