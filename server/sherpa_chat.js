var httpServer = require('http').createServer(function(req, response){ /* Serve your static files */ })
httpServer.listen(1338);

var Db = require('mongodb').Db,
Connection = require('mongodb').Connection,
Server = require('mongodb').Server,
BSON = require('mongodb').BSONNative;


dbb = new Db('sherpa_dherpa', new Server("127.0.0.1", 27017, {}), {});

var nowjs = require("now");
var everyone = nowjs.initialize(httpServer);

everyone.now.obdelajSporocilo = function(msg) {

	var date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	if(hours<10)
		hours = "0" + hours;
	if(minutes<10)
		minutes = "0" + minutes;
	if(seconds<10)
		seconds = "0" + seconds;

	username = this.now.name;
        time = hours + ":" + minutes + ":" + seconds;

	dbb.open(function(err, dbb){
		dbb.collection('globalLogs', function(err, collection){
			settings = {
                                "time" : time,
				"username" : username,
				"msg" : msg
			};
			collection.insert(settings, function(){
				dbb.close();			
			});
				
		});	
	});    

	everyone.now.prejmi(time,username,msg);
}

everyone.now.obdelajUser = function(option) {
    
    username = this.now.name;
    if(option == "add"){
        dbb.open(function(err, dbb){
		dbb.collection('availableUsers', function(err, collection){
			settings = {
				"username" : username
			};
                       
                        collection.findOne(settings, function(err,data){
                                    if(data == null){
                                        collection.insert(settings);
                                    }
                                    
                                    dbb.close();
                                    everyone.now.refreshUsers();
                                });
                                /*collection.insert(settings, function(){
                                    dbb.close();
                                    everyone.now.refreshUsers();
                                });*/
                            
				
		});	
	});
    }else if(option == "remove"){
        dbb.open(function(err, dbb){
		dbb.collection('availableUsers', function(err, collection){
                        settings = {
				"username" : username
			};
			collection.remove(settings, function(){
				dbb.close();
                                everyone.now.refreshUsers();
			});
		});	
	});
    }
    
    
}


var sobe = new Array();
var grupe = new Array();
var users_sobe = new Array();

everyone.now.zahtevajSobe = function(){
	this.now.prikaziSobe(sobe);
}

everyone.now.ustvariSobo = function(ime)
{
	sobe.push(ime);
	grupe.push(nowjs.getGroup(ime));
	grupe[grupe.length - 1].addUser(this.user.clientId);
	users_sobe[this.user.clientId] = sobe.length - 1;
}

nowjs.on('disconnect', function () {
	delete sobe[users_sobe[this.user.clientId]];
	delete grupe[users_sobe[this.user.clientId]];
});

everyone.now.dodajVSobo = function(sid)
{
	var id = sid.split("a")[1];
	
	delete sobe[id];
	grupe[id].addUser(this.user.clientId);
	users_sobe[this.user.clientId] = id;
	
	grupe[id].getUsers(function (users) {
		console.log("Igro sta zacela:");
  		for (var i = 0; i < users.length; i++) console.log(users[i]); 
		console.log("");
	});
	
}