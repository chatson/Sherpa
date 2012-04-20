var uporabnik;
var idu;

$("#prijavi").click(function(){
	uporabnik = $('#uporabnik').val();
	var geslo = $('#geslo').val();
	$.post("prijavi.php", { uporabnik: uporabnik, geslo: geslo },
		   function(data) {
		     if(data.stanje == true){
				 	idu = data.id;
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
		
		bg.fadeIn("fast", function(){
			$("#registriraj").click(function(){
				
				var data = new Array();
				
				$("#registracija input").each(function(index) {
					if($(this).val() == "Potrdi")
					{
						$.post("registriraj.php", { uporabnik: data[0], geslo: data[1], ime: data[2], priimek: data[3], naslov: data[4], starost: data[5], email: data[6]});
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
		});
		
		bg.click(function(e){
			if(e.target.id === "zatemnitev")
				bg.fadeOut("fast");
		});
});