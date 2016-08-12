<?php 
/*
 * This function file, this file cillect function for mysql query, 
 * transfom json string to array, sanitize query string, check users.
 * 
 * @author Dmitrii Lazucov
 * 
 */
require_once 'config.php';


$connection = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
if ($connection->connect_error) {
  die($connection->connect_error);
}


function createTable($name, $query) {
  queryMysql("CREATE TABLE IF NOT EXISTS $name($query)");
  echo "Table '$name' created or already exists.<br>";
}


function queryMysql($query) {
  global $connection;
  $result = $connection->query($query);
  if (!$result) die($connection->error);
  return $result;
}


function destroySession() {
  $_SESSION=array();

  if (session_id() != "" || isset($_COOKIE[session_name()])) {
      setcookie(session_name(), '', time()-2592000, '/');
  }
  session_destroy();
}


function sanitizeString($var) {
  global $connection;
  $var = strip_tags($var);
  $var = stripslashes($var);
  return $connection->real_escape_string($var);
}

function showProfile($user) {
  if (file_exists("$user.jpg")) {
    echo "<img src='$user.jpg' style='float:left;'>";
  }
  $result = queryMysql("SELECT * FROM profiles WHERE user='$user'");

  if ($result->num_rows) {
    $row = $result->fetch_array(MYSQLI_ASSOC);
    echo stripslashes($row['text']) . "<br style='clear:left;'><br>";
  }
}


function jsonToArray($jason_str) {
    $array_request=array(json_decode($jason_str, true));
    array_walk_recursive($array_request, 'cleaner');
    
    return $array_request;
}

function cleaner(&$item, $key) {
    $item=  sanitizeString($item);
}

?>
