<?php

$isset = isset($_SESSION) ? 'true' : 'false';
$session_name = isset($_SESSION) ? $_SESSION['name'] : 'undefined';

echo "{
	isset: {$isset},
	name: {$session_name}
}";