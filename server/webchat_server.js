var httpServer = require('http').createServer(function(req, response){ /* Serve your static files */ })
httpServer.listen(1337);

var nowjs = require("now");
var everyone = nowjs.initialize(httpServer);

/* Povezava z MongoDB */

var Db = require('mongodb').Db,
Connection = require('mongodb').Connection,
Server = require('mongodb').Server,
BSON = require('mongodb').BSONPure;

var dbb = new Db('webchat', new Server("127.0.0.1", 27017, {}), {});

var clientIDs = new Array();

everyone.now.init = function() {
	clientIDs[this.now.idu] = this.user.clientId;
}

nowjs.on('disconnect', function () {
	delete clientIDs[this.now.idu];
});

/*************************************************************************/

everyone.now.vrniPrijatelje = function() { // funkcija, ki jo pokliče client, ta pa mu nazaj vrne seznam prijateljev
	
	var trenutno = this.now;
	
	dbb.open(function(err, dbb){
		dbb.collection('prijatelji', function(err, zbirka){
			
			zbirka.find({}, function(err,kazalec){
				kazalec.toArray(function(err, prijatelji) {
					dbb.collection('uporabniki', function(err, zbirka1){
						
						var seznam_idjev = new Array();
						
						for(var u in prijatelji)
						{	
							if(prijatelji[u].staPrijatelja == "true")
							{
								if(prijatelji[u].id1 == trenutno.idu)
									seznam_idjev.push(new BSON.ObjectID(prijatelji[u].id2));
								else if(prijatelji[u].id2 == trenutno.idu)
									seznam_idjev.push(new BSON.ObjectID(prijatelji[u].id1));
							}
						}
						
						settings1 = {
							"_id" : { $in : seznam_idjev }
						};
						
						zbirka1.find(settings1, function(err,kazalec1){
							kazalec1.toArray(function(err, prijatelji1) {
								trenutno.napolniSeznamPrijateljev(prijatelji1);
								dbb.close();
							});
						});
					});
				});
			});
		});	
	});
}

everyone.now.preveriZahteveZaPrijateljstvo = function() { // preveri, če so v čakalni vrsti kakšne zahteve za prijateljstvo in te zahteve posreduje na klient
	
	var trenutno = this.now;
	
	dbb.open(function(err, dbb){
		dbb.collection('prijatelji', function(err, zbirka){
			
			settings = {
				"id2" : trenutno.idu,
				"staPrijatelja" : "false"
			};

			zbirka.find(settings, function(err,kazalec){
				kazalec.toArray(function(err, idji) {
					
					var seznam_idjev = new Array();
					
					for(var i in idji)
					{
						seznam_idjev.push(new BSON.ObjectID(idji[i].id1));
					}
					
					dbb.collection('uporabniki', function(err, zbirka1){
						settings1 = {
							"_id" : { $in : seznam_idjev }
						};
						
						zbirka1.find(settings1, function(err,kazalec1){
							kazalec1.toArray(function(err, zahteve) {
								trenutno.dodajZahteveNaSeznam(zahteve);
								dbb.close();
							});
						});
					});	
				});
			});
		});
	});
}

everyone.now.potrdiPrijateljstvo = function(id) // potrdi prijateljstvo
{
	var trenutno = this.now;
	
	dbb.open(function(err, dbb){
		dbb.collection('prijatelji', function(err, zbirka){
			
			settings = {
				"id1" : id,
				"id2" : trenutno.idu,
				"staPrijatelja" : "false"
			};
			
			zbirka.update(settings, {$set:{"staPrijatelja":"true"}}, {safe:true}, function(err, result) {});
			
			dbb.close();
		});
	});
}

everyone.now.dodajPrijatelja = function(email) // doda zahtevo za prijateljstvo v čakalno vrsto
{
	var trenutno = this.now;
	
	dbb.open(function(err, dbb){
		dbb.collection('uporabniki', function(err, zbirka){

			settings = {
				"email" : email
			};
			
			zbirka.findOne(settings, function(err, up) {
				if(up != null)
				{
					dbb.collection('prijatelji', function(err, zbirka1){
						zbirka1.insert({'id1': trenutno.idu, 'id2': up._id.toString(), 'staPrijatelja': 'false'});
					});
				}
				else
					trenutno.opozorilo("Uporabnik s tem naslovom ne obstaja!");
				dbb.close();
			});
		});
	});
}

everyone.now.posljiSporocilo = function(ime, id, msg)
{
	var trenutno = this.now;
	
	var date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	
	if(hours<10)
		hours = "0" + hours;
	if(minutes<10)
		minutes = "0" + minutes;

	var time = hours + ":" + minutes;
	
	dbb.open(function(err, dbb){
		dbb.collection('sporocila', function(err, zbirka){

			zbirka.insert({'id1': trenutno.idu, 'id2': id, 'sporocilo': msg, 'time': time});
		
			dbb.close();
			
			if(clientIDs[id] != null)
				nowjs.getClient(clientIDs[id], function () { 
					this.now.sprejmiSporocilo(ime,msg,time);	
				});
			trenutno.sprejmiSporocilo(ime,msg,time);
		});
	});
}

everyone.now.vrniStarejsaSporocila = function(id)
{
	var trenutno = this.now;
	var seznam_idjev = new Array();
	
	seznam_idjev.push(new BSON.ObjectID(trenutno.idu));
	seznam_idjev.push(new BSON.ObjectID(id));
	
	dbb.open(function(err, dbb){
		dbb.collection('sporocila', function(err, zbirka){
			
			settings = {
				 $or : [ { "id1" : trenutno.idu, "id2" : id } , { "id2" : trenutno.idu, "id1" : id } ]
			};
			
			zbirka.find(settings, function(err,kazalec){
				kazalec.toArray(function(err, sporocila) {
					dbb.collection('uporabniki', function(err, zbirka1){
	
						settings1 = {
							 "_id" : { $in : seznam_idjev }
						};
						
						zbirka1.find(settings1, function(err,kazalec1){
							kazalec1.toArray(function(err, uporabnik) {
								trenutno.sprejmiStarejsaSporocila(sporocila, uporabnik);
								dbb.close();
							});
						});
					});
				});
			});
		});
	});				
}