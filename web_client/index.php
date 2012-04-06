<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Sherpa</title>
<link rel="stylesheet" href="css/sherpa.css" type="text/css" />
<script src="js/Three.js"></script>
<script src="js/RequestAnimationFrame.js"></script>
<script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js'></script>
<script type='text/javascript' src='http://server.h0tb1t.eu:1338/nowjs/now.js'></script>
<script type='text/javascript' src='js/ba-linkify.js'></script>
<script type='text/javascript' src='js/ba-debug.js'></script>
<script type="text/javascript" src="js/Tween.js"></script>
<script type="text/javascript" src="js/sherpa.js"></script>
<script type="text/javascript" src="js/levels.js"></script>
<script type="text/javascript">
    window.onbeforeunload = function (evt) {
        /*var message = 'Are you sure you want to leave?';
        if (typeof evt == 'undefined') {
            evt = window.event;
        }
        if (evt) {
            evt.returnValue = message;
        }
        return message;*/
        now.obdelajUser("remove");
        
    }
    var isActive = true;

    window.onfocus = function () { 
        isActive = true; 
    }; 

    window.onblur = function () { 
        isActive = false; 
    }; 

</script> 
</head>

<body>
	<div id='nav'>
            <button id='rotate0' class="next browse left">Normal</button>
            <button id='rotate90' class="next browse left">Rotate 180</button>
            <button id='usernav' class="next browse right">Options</button>
        <div class='clear'></div>
    </div>
    <div id='content'>
    <?php 
		session_start();
		if(isset($_SESSION['pass']))
		{	
			echo "<script type='text/javascript'>
				$('#content').fadeOut('fast',function(){
				$('#usernav').html('".$_SESSION['username']."');
				$('#nav').fadeIn('slow',function(){
						$('#content').width(1024);
						
						$('#content').fadeIn('slow');
				});
			});
			now.name = '".$_SESSION['username']."';
			</script>";
		}
		
	?>
    	<div id='login' class='window'>
		<div><center><b>Prijava</b></h3></center></div><br />
        	U. ime:<input type='text' id='username' style='width:250px' /><br />
	    	Geslo:<input type='password' id='pass' style='width:250px' /><br /><br />
		<button id='loginaj'>Pošlji</button><button id='register'>Registriraj</button><br /><br />
        </div>
        
    </div>
   <div id='content2'>
    	<div id='login' class='window'>
		<div><center><b>Registracija</b></h3></center></div><br />
        	U. ime:<input type='text' id='username1' style='width:250px' /><br />
	    	Geslo1:<input type='password' id='pass1' style='width:250px' /><br /><br />
		Geslo2:<input type='password' id='pass2' style='width:250px' /><br /><br />
		<button id='reg'>Pošlji</button><br /><br />
        </div>
    </div>
	<script type='text/javascript' src='js/login.js'></script>
</body>
</html>
