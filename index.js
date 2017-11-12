#!/usr/bin/env node

let optValue;
let userValue;
let gitHubQ = require('./gitHubQuery.js');
let fs = require('fs');
let processPrompt = require('prompt');
let apiKey = "";
optValue = process.argv[2];
userValue = process.argv[3];

try{
apiKey = fs.readFileSync('./ofile', 'utf-8').toString();
}
catch(error){
    console.error("No authentication on file, please enter a valid github OAuth key");
    processPrompt.start();
    processPrompt.get(['auth'], function (err, result){
	    if(err){
		    throw err;
	    }else{
	    fs.writeFileSync('./ofile', result.auth.toString());
	    apiKwy =  result.auth.toString();
	    }
    });
}

if(apiKey.length){
	if(optValue != 'repos' &&  optValue != 'stars' && optValue != 'profile'){
		console.error(`${optValue} is not a valid option, please try again`);
	}else if(typeof userValue === "undefined"){
		console.error('There is no User specified');
	}else{
		try{
			let gitQ = new gitHubQ(apiKey);
			switch(optValue){
				case 'repos':
					gitQ.userRepos(userValue);
					break;

				case 'stars':
					gitQ.userStarred(userValue);
					break;

				case 'profile':
					gitQ.userProfile(userValue);
					break;
			}
		}
		catch(error){
			console.log(error.message);
		}
	}
}

