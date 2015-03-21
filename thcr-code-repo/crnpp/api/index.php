<?php
/**
 * author: @_thinkholic
 * 21032015
 */
# TimeZone Settings
date_default_timezone_set("UTC");

$timestamp = date("Y-m-d H:i:s", time());

# Custom-functions

# status
$status = array(  
    100 => 'Continue',
    101 => 'Switching Protocols',
    200 => 'OK',
    201 => 'Created',
    202 => 'Accepted',
    203 => 'Non-Authoritative Information',
    204 => 'No Content',
    205 => 'Reset Content',
    206 => 'Partial Content',
    300 => 'Multiple Choices',
    301 => 'Moved Permanently',
    302 => 'Found',
    303 => 'See Other',
    304 => 'Not Modified',
    305 => 'Use Proxy',
    307 => 'Temporary Redirect',
    400 => 'Bad Request',
    401 => 'Unauthorized',
    402 => 'Payment Required',
    403 => 'Forbidden',
    404 => 'Not Found',
    405 => 'Method Not Allowed',
    406 => 'Not Acceptable',
    407 => 'Proxy Authentication Required',
    408 => 'Request Time-out',
    409 => 'Conflict',
    410 => 'Gone',
    411 => 'Length Required',
    412 => 'Precondition Failed',
    413 => 'Request Entity Too Large',
    414 => 'Request-URI Too Large',
    415 => 'Unsupported Media Type',
    416 => 'Requested range not satisfiable',
    417 => 'Expectation Failed',
    500 => 'Internal Server Error',
    501 => 'Not Implemented',
    502 => 'Bad Gateway',
    503 => 'Service Unavailable',
    504 => 'Gateway Time-out',
    505 => 'HTTP Version not supported'
);

# respond inits
$data['statusCode'] = 400;

# headers
header("Access-Control-Allow-Orgin: *");
header("Access-Control-Allow-Methods: *");

# respond inits
$data['validToken'] = FALSE;
$data['success'] = FALSE;
$data['data'] = FALSE;
$data['requestTimestamp'] = $timestamp;

# [JSON]
if ( (isset( $_REQUEST['r'] )) && ( $_REQUEST['r'] == 'json' ) )
{
    $data['contentType'] = 'application/json';
    
    $data['statusCode'] = 200;
    
    if( isset($_REQUEST['do']) )
    {
        $data['validToken'] = TRUE;
        
		# DO:Register
        if ( $_REQUEST['do'] == 'Register' )
        {  
		   # Request Access Token
		   if ( $_REQUEST['a'] == 'ReqAT' )
		   {
			   $publicKey = $_REQUEST['publicKey'];
			   
			   $data['success'] = TRUE;
			   $data['data'] = TRUE;
			   
			   $data['accessToken'] = 'sf764383sdff385sdsdg4';
		   }
		   
		   # Post User Data
		   if ( $_REQUEST['a'] == 'PostUserData' )
		   {
			   $accessToken = $_REQUEST['accessToken'];
			   
			   $data['success'] = TRUE;
		   }
            
        } # DO:Register
		
		# DO:Auth
		if ( $_REQUEST['do'] == 'Auth' )
		{
			# Request Access Token
			if ( $_REQUEST['a'] == 'ReqAT' )
			{
			   $publicKey = $_REQUEST['publicKey'];
			   
			   $data['success'] = TRUE;
			   $data['data'] = TRUE;
			   
			   $data['accessToken'] = 'sf764383sdff385sdsdg4';
			}
		   
			# Auth User
			if ( $_REQUEST['1'] == 'UserAuth' )
			{
				$accessToken = $_REQUEST['accessToken'];
			 
			 	$user = $_REQUEST['usr'];
				$pwd = $_REQUEST['pw'];
			  
			    $data['success'] = TRUE;
			}
			
		} # DO:Auth
    }
        
    # header status
    $data['status'] = $status[$data['statusCode']];
    
    # headers again
    header('Content-Type: application/json');
    header("HTTP/1.1 " . $data['statusCode'] . " " . $data['status']);
    
    # return respond
    print json_encode($data);
}

// EOF.