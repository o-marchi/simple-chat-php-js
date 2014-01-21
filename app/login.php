<?php

session_start();

$name = isset($_POST['name']) ? $_POST['name'] : '';

if ( $name != '' ) {
	
	$_SESSION['name'] = stripslashes(htmlspecialchars($name));

	echo "{
		status: true,
		message: 'Login successful',
		name: '{$name}'
	}";
} else {
	echo "{
		status: false,
		message: 'Please type your name',
		name: undefined
	}";
}