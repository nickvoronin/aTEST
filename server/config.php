<?php

/*
 * This file contains the following configurations:
 *
 * MySQL settings
 * Secret keys
 * Database table prefix
 * ABSPATH
 *
 *
 * @author Dmitrii Lazucov
 *
 *
 */


// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database*/
define('DB_NAME', 'aTEST');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '1');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/** Absolute path to the aTEST directory. */
if (!defined('ABSPATH')){
	define('ABSPATH', dirname(__FILE__) . '/');
}


?>