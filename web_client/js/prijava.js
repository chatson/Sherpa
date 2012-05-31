var uporabnik = "";
now.idu;
now.email = "";

$("#prijavi").click(function(){
	uporabnik = $('#uporabnik').val();
	var geslo = $('#geslo').val();
	$.post("prijavi.php", { uporabnik: uporabnik, geslo: geslo },
		   function(data) {
		     if(data.stanje == true){
				 	now.idu = data.id.$id;
					now.email = data.email;
				 	$("#prijava").fadeOut("slow",function(){
						$("body").load("chat.php");
					});
		     }else{alert("Napaka v prijavi!")}
   	}, "json");
});

$("#prijava a").click(function(){
	var bg = $("<div></div>").attr({id: "zatemnitev"});
		bg.load("registracija.php");
		$("body").append( bg );
		
		var urlSlike = "";
		
		bg.fadeIn("fast", function(){
			$("#registriraj").click(function(){
				
				var data = new Array();
				
				$("#registracija input").each(function(index) {
					if($(this).val() == "Potrdi")
					{
						$.post("registriraj.php", { uporabnik: data[1], geslo: data[2], ime: data[3], priimek: data[4], naslov: data[5], starost: data[6], email: data[7], urlSlike: urlSlike});
						bg.fadeOut("fast");
						return false;
					}
					
					if($(this).val() == "")
					{
						alert("Niste izpolnili vseh polj!");
						return false;
					}
					
					data[index] = $(this).val();
				});			
			});
			
					$('#brskaj-sliko-button input[type=file]').change(function(e){
						var datoteka = e.currentTarget.files[0];
						
						var velikostDatoteke = 0;
						
						if (datoteka.size > 1024 * 1024)
						  velikostDatoteke = (Math.round(datoteka.size * 100 / (1024 * 1024)) / 100).toString() + ' MB';
						else
						  velikostDatoteke = (Math.round(datoteka.size * 100 / 1024) / 100).toString() + 'kb';
						  
						var xhr = new XMLHttpRequest();
			
						xhr.open("POST", "posljiSliko.php");
						var data = new FormData();
						data.append('file', datoteka);
	
						xhr.addEventListener("load", uploadComplete, false);
						xhr.send(data);
						
						function uploadComplete(evt) {
							urlSlike = "/praktikum/slike/avatar/" + datoteka.name;
							$("#brskaj-sliko-button").css("background-image","url(" + urlSlike + ")");
						}
					});
				
					bg.click(function(e){
						if(e.target.id === "zatemnitev")
							bg.fadeOut("fast", function(){
								bg.remove();
							});
					});

		});
		
		bg.click(function(e){
			if(e.target.id === "zatemnitev")
			{
				bg.fadeOut("fast", function(){
					bg.remove();
				});
			}
		});
});