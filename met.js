
//process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser;
const request = require('request')


const metMuseum = function (obj, callback){
	//console.log('https://collectionapi.metmuseum.org/public/collection/v1/objects?search=' + obj)
	const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=' + obj
	request({url, json: true}, function(error, response){
		if(error){
			callback(error, undefined)
		} else {
			const data = response.body
			if ( data.message ) {
        		callback(data.message, undefined)
      		} else if(data.total == '0') {			
					callback(data.query + ' was not found', undefined)
				}
				else
				{
					const info = {
						obj: data.objectIDs[0] 

					}
					//console.log(info)
					callback(undefined, info)
				}
		}
	})
}

const metObjects = function(objectID, callback) {
	console.log('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + objectID)
	const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + objectID
	request({url, json: true}, function(error, response) {
		if (error) {
      		callback(error, undefined)
    	} else {
    		const data = response.body
    		if ( data.message ) {
        		callback(data.message + ' - ' + data.error, undefined)
      		} else {
      			const info = {
					artist : data.constituents[0].name,
  					title: data.title,
  					year: data.objectEndDate,
  					technique: data.medium,
  					metUrl: data.objectURL
				}
				callback(undefined, info)
      		}
    	}
	})
}

module.exports = {
	metMuseum : metMuseum,
	metObjects : metObjects
}

