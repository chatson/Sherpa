 //------------------------------------smile replace---------------------------------------------------------------------------------
function replaceSmile(text) {
  var emoticons = {
        ':)' : 'smile.gif',
        ':-)'  : 'smile.gif',
        ':=)'  : 'smile.gif',
        ':(' : 'sadsmile.gif',
        ':-('  : 'sadsmile.gif',
        ':=('  : 'sadsmile.gif',
        ':D' : 'bigsmile.gif',
        ':=D' : 'bigsmile.gif',
        ':-D' : 'bigsmile.gif',
        ':d' : 'bigsmile.gif',
        ':=d' : 'bigsmile.gif',
        ':-d' : 'bigsmile.gif',
        '8)' : 'cool.gif',
        '8=)' : 'cool.gif',
        '8-)' : 'cool.gif',
        'B)' : 'cool.gif',
        'B=)' : 'cool.gif',
        'B-)(cool)' : 'cool.gif',
        ';)' : 'wink',
        ';(' : 'crying.gif',
        ';-(' : 'crying.gif',
        ';=(' : 'crying.gif',

        '(sweat)' : 'sweating.gif',
        '(:|' : 'sweating.gif',
        ':|' : 'speechless.gif',
        ':=|' : 'speechless.gif',
        ':-|' : 'speechless.gif',
        ':*' : 'kiss.gif',
        ':=*' : 'kiss.gif',
        ':-*' : 'kiss.gif',
        ':P' : 'tongueout.gif',
        ':=P' : 'tongueout.gif',
        ':-P' : 'tongueout.gif',
        ':p' : 'tongueout.gif',
        ':=p' : 'tongueout.gif',
        ':-p' : 'tongueout.gif',
        '(blush)' : 'blush.gif',
        ':$' : 'blush.gif',
        ':-$' : 'blush.gif',
        ':=$' : 'blush.gif',
        ':">' : 'blush.gif',
        ':^)' : 'wondering.gif',
        '|-)' : 'sleepy.gif',
        'I-)' : 'sleepy.gif',
        'I=)' : 'sleepy.gif',
        '(snooze)' : 'sleepy.gif',
        '|(' : 'dull.gif',
        '|-(' : 'dull.gif',
        '|=(' : 'dull.gif',
        '(inlove)'  : 'inlove.gif'

}, url = "images/smiles/", patterns = [],
     metachars = /[[\]{}()*+?.\\|^$\-,&#\s]/g;

  // build a regex pattern for each defined property
  for (var i in emoticons) {
    if (emoticons.hasOwnProperty(i)){ // escape metacharacters
      patterns.push('('+i.replace(metachars, "\\$&")+')');
    }
  }

  // build the regular expression and replace
  return text.replace(new RegExp(patterns.join('|'),'g'), function (match) {
    return typeof emoticons[match] != 'undefined' ? '<img src="'+url+emoticons[match]+'"/>' :match;
  });
}




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
        var txt = $("#chat-input").html();
        options = {
                callback: function( text, href ) {
                                  href && debug.log([ text, href ]);
                                   return href ? '<a class="chatlink" href="' + href + '" title="' + href + '" target="_blank" >' + text + '</a>' : text;
                }
        };
        txt = linkify( txt, options );
        txt = replaceSmile(txt);

	now.posljiSporocilo(txt);
});

now.prejmiSporocilo(var s)
{
	$("#chat-box").html($("#chat-box").html()+s);
}