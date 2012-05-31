$(document).ready(function(){
	
	/******************* Scroll stvari *******************/
				
	var pane = $('.scroll-pane');
	pane.jScrollPane();
	var api = pane.data('jsp');

	/*****************************************************/
	
	$("#nastavitve").html(uporabnik);
	
	$("#obvestila-button").click(function(){
		now.preveriZahteveZaPrijateljstvo();
	});
	
	razsiri();
	
	now.init();
	
	now.opozorilo = function(msg)
	{
		alert(msg);
	}
	
	now.napolniSeznamPrijateljev = function(prijatelji)
	{	
		$("#friend-list ul").html("");
	
		for(var i=0; i<prijatelji.length;i++)
		{
			$("#friend-list ul").append("<li id=\"prijatelj_" + prijatelji[i]._id + "\"><span>" + prijatelji[i].uporabnik + "</span></li>");
			
			if(i==0)
			{
				$("#friends-header div b").html(prijatelji[i].uporabnik);
				$("#friend-list ul li").addClass("selected-friend");
				vrniStarejsaSporocila();
			}
		}
		
		$("#friend-list ul li").click(function(e){
			$("#friend-list ul li").removeClass("selected-friend");
			$(this).addClass("selected-friend");
			$("#friends-header div b").html($(".selected-friend span").html());
			vrniStarejsaSporocila();
		});
		
		$("#friend-list ul li").bind("contextmenu", function(e){
			var ctxmenu = $("<div></div>").attr({class: "ctxmenu"});
			ctxmenu.append("<ul><li id=\"profil-button\">Ogled profila</li><li id=\"datoteka-button\">Pošlji datoteko</li></ul>");
			$(this).append( ctxmenu );
			
			$(".ctxmenu ul").hover(function(){}, function(){
				$(this).remove();
			});
			
			$("#datoteka-button").click(function(){
				var bg = $("<div></div>").attr({id: "zatemnitev"});
				bg.load("posljiDatoteko.php");
				$("body").append( bg );
				
				bg.fadeIn("fast", function(){
					$('#brskaj-datoteke-button input[type=file]').change(function(e){
						var datoteka = e.currentTarget.files[0];
						
						var velikostDatoteke = 0;
						
						if (datoteka.size > 1024 * 1024)
						  velikostDatoteke = (Math.round(datoteka.size * 100 / (1024 * 1024)) / 100).toString() + ' MB';
						else
						  velikostDatoteke = (Math.round(datoteka.size * 100 / 1024) / 100).toString() + 'kb';
						  
						var xhr = new XMLHttpRequest();
			
						xhr.open("POST", "poslji.php");
						var data = new FormData();
						data.append('file', datoteka);
						//xhr.upload.addEventListener("progress", updateProgress, false);
						xhr.addEventListener("load", uploadComplete, false);
						xhr.send(data);
						
						function uploadComplete(evt) {
							var url = "<a href=\"/praktikum/datoteke/" + datoteka.name + "\" target=\"_blank\">" + datoteka.name + "</a>";
							now.posljiSporocilo(uporabnik,$(".selected-friend").attr("id").split("_")[1],url);
							
							bg.remove();
						}
					});
				});
				
				bg.click(function(e){
					if(e.target.id === "zatemnitev")
						bg.fadeOut("fast", function(){
							bg.remove();
						});
				});
			});
			
			return false;
		});
	}
	
	function dodajSporociloNaChatBox(ime, msg, cas)
	{
		var sp_ime = "<div class='sp_ime'>" + ime + "</div>";
		var sp_cas = "<div class='sp_cas'>" + cas + "</div>";
		var sp_msg = "<div class='sp_msg'>" + msg + "</div>";
		var sp_clear = "<div class='clear'></div>";
		
		var sporocilo = $("<div></div>").attr({class: "sporocilo"});//.attr({id: "msg_" + msgid});
		
		sporocilo.append(sp_ime + sp_msg + sp_cas + sp_clear);
		
				
		api.getContentPane().append(sporocilo);
		api.reinitialise();
		api.scrollToY(api.getContentPane().height());
	}
	
	function vrniStarejsaSporocila()
	{
		now.vrniStarejsaSporocila($(".selected-friend").attr("id").split("_")[1]);
	}
	
	now.sprejmiStarejsaSporocila = function(sporocila, uporabnik)
	{
		api.getContentPane().html("");

		for(var s in sporocila)
		{
			var ime = "";
			
			if(sporocila[s].id1 == uporabnik[0]._id)
				dodajSporociloNaChatBox(uporabnik[0].uporabnik, sporocila[s].sporocilo, sporocila[s].time);
			else
				dodajSporociloNaChatBox(uporabnik[1].uporabnik, sporocila[s].sporocilo, sporocila[s].time);
		}
		
		$("#friends-header div i").html(uporabnik[1].komentar);
		$("#friends-header img").attr("src",uporabnik[1].slika);
		
		$("#jspPane").width(700);
	}
	
	now.dodajZahteveNaSeznam = function(zahteve)
	{
		if(zahteve.length == 0)
			return;
		
		var bg = $("<div></div>").attr({id: "zatemnitev"});
		bg.load("zahtevePrijateljev.php");
		$("body").append( bg );

		bg.fadeIn("fast", function(){
			for(var i in zahteve)
			{				
				$("#zahtevePrijateljev").append("<div><span>" + zahteve[i].uporabnik + "</span><input type='button' value='Potrdi' id='potrdi_" + zahteve[i]._id + "' /><div class='clear'></div></div>");
				$("#potrdi_" + zahteve[i]._id).click(function(){
					
					var a = $(this).attr("id");
					
					now.potrdiPrijateljstvo(a.split("_")[1]);
					
					$(this).parent().remove();
				});
			}
		});
		
		bg.click(function(e){
			if(e.target.id === "zatemnitev")
			{
				now.vrniPrijatelje();
				bg.fadeOut("fast", function(){
					bg.remove();
				});
			}
		});
	}
	
	now.vrniPrijatelje();
	now.sprejmiSporocilo = function(ime, msg, cas)
	{
		if(uporabnik == ime || $(".selected-friend").html() == ime)
			dodajSporociloNaChatBox(ime, msg, cas);
	}
});

$("#dodaj-okno-button").click(function(){
		var bg = $("<div></div>").attr({id: "zatemnitev"});
		bg.load("dodajPrijatelja.php");
		$("body").append( bg );
		
		bg.fadeIn("fast", function(){
			$("#dodaj-button").click(function(){
				now.dodajPrijatelja($("#dodajPrijatelja #email").val());
				bg.fadeOut("fast");
			});
		});
		
		bg.click(function(e){
			if(e.target.id === "zatemnitev")
				bg.fadeOut("fast");
		});
});

$("#chat-input input[type=button]").click(function(){
		now.posljiSporocilo(uporabnik,$(".selected-friend").attr("id").split("_")[1],$("#chat-input textarea").val());
		$("#chat-input textarea").val("");
});

$(window).resize(function(e){
	razsiri();
});

function razsiri()
{
	var visina = $(this).height();
	
	$("#content").height(visina-200);
	$("#chat").height(visina-200);
	$("#chat-box").height(visina-440);
	$("#friends").height(visina-200);
}