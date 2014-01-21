<?php

session_start();

if( isset($_SESSION['name']) ) {

	$message = $_POST['message'];
	
	$log = fopen('../log/log.html', 'a');

	fwrite($log, '<p class="msg"><b>'.$_SESSION['name'].'</b>: '.stripslashes(htmlspecialchars($message)).'</p>');

	fclose($log);
}