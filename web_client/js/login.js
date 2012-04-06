$(document).ready(function(){
	$('#login').css('margin-top',($(document).height()/2)-200);
        $('#content2').hide();
	
});

function loginaj()
{
	var username = $('#username').val();
	var pass = $('#pass').val();
	$.post("login.php", { username: username, pass: pass },
		   function(data) {
		     if(data.Status == "true"){
			$('#content').fadeOut('fast',function(){
				$('#usernav').html(username);
				$('#nav').fadeIn('slow',function(){
						$('#content').width(1024);

						$('#content').fadeIn('slow');
				});
			});
			now.name = username;
		     }else{alert("Napaka v prijavi!")}
   	}, "json");
}

$('#loginaj').click(function(){	
	loginaj();
	
});

$('#register').click(function(){	
	$('#content').fadeOut('fast');
	$('#content2').fadeIn('slow');
});

$('#reg').click(function(){	
	if($('#pass1').val()==$('#pass2').val())
	{
		var username = $('#username1').val();
		var pass = $('#pass1').val();
		$.post("register.php", { username: username, pass: pass });
		$('#content2').fadeOut('fast');
		$('#content').fadeIn('slow');
	}else{
            alert('Napačni podatki!');
        }
});
