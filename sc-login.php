<?php

include_once './vendor/autoload.php';
include_once './client-data.php';

use Njasm\Soundcloud\SoundcloudFacade;

$facade = new SoundcloudFacade($clientID, $clientSecret);
$facade->userCredentials($username, $password); // on success, access_token is set by default for next requests.
$response = $facade->get('/me/playlists')->request();
// raw/string body response
echo $response->bodyRaw();
// as object
echo $response->bodyObject()->id;
// as array
$array = $response->bodyArray();
print_r(json_decode($array));