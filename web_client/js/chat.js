$(document).ready(function(){
	$("#nastavitve").html(uporabnik);
	
	now.napolniSeznamPrijateljev = function(prijatelji)
	{
		for(var i=0; i<prijatelji.length;i++)
		{
			$("#friend-list ul").append("<li>" + prijatelji[i].uporabnik + "</li>");
			
			if(i==0)
			{
				$("#friends-header div b").html(prijatelji[i].uporabnik);
				$("#friend-list ul li").addClass("selected-friend");
			}
		}
		
		$("#friend-list ul li").click(function(){
			$("#friend-list ul li").removeClass("selected-friend");
			$(this).addClass("selected-friend");
			$("#friends-header div b").html($(this).html());
		});
	}
	
	now.vrniPrijatelje(idu);
});

$("#chat-input input[type=button]").click(function(){
	now.posljiSporocilo($("#chat-input").html());
});

now.prejmiSporocilo(var s)
{
	$("#chat-box").html($("#chat-box").html()+s);
}