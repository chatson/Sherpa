var httpServer = require('http').createServer(function(req, response){ /* Serve your static files */ })
httpServer.listen(1337);

var nowjs = require("now");
var everyone = nowjs.initialize(httpServer);

/* Povezava z MongoDB */

var Db = require('mongodb').Db,
Connection = require('mongodb').Connection,
Server = require('mongodb').Server,
BSON = require('mongodb').BSONNative;

var dbb = new Db('webchat', new Server("127.0.0.1", 27017, {}), {});

/*************************************************************************/

everyone.now.vrniPrijatelje = function(idu) {
	
	idu = idu.$id;
	
	var trenutno = this.now;
	
	dbb.open(function(err, dbb){
		dbb.collection('prijatelji', function(err, zbirka){

		settings = {
			"id1" : idu
		};
		
		zbirka.find(settings, function(err1,kazalec){
			kazalec.toArray(function(err, prijatelji) {
					trenutno.napolniSeznamPrijateljev(prijatelji);	
					dbb.close();
				});
			});
		});	
	});
}