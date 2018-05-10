<?php

/**
 * PHP/MySQL PDO Database Class
 * @_thinkholic | 2014
**/

class Database 
{
    private static $dbName = '<DB NAME>' ; 
    private static $dbHost = '<HOST NAME>' ;
    private static $dbUsername = '<DB USER NAME>';
    private static $dbUserPassword = '<DB PWD>';

    private static $cont  = null;

    public function __construct() 
    {
        die('Init function is not allowed');
    }

    public static function connect()
    {
       // One connection through whole application
       if ( null == self::$cont )
       {
           try
            {
                self::$cont =  new PDO( "mysql:host=".self::$dbHost.";"."dbname=".self::$dbName, self::$dbUsername, self::$dbUserPassword);  
            }
            catch(PDOException $e) 
            {
                die($e->getMessage());  
            }
       } 

       return self::$cont;
    }

    public static function disconnect()
    {
        self::$cont = null;
    }
}

// EOF.
