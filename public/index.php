<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>aTest</title>
</head>
<body>

    <div class="app"></div>
    <div class="topic"></div>
    <div class="card"></div>

<script src="./main.js"></script>
</body>
</html> 


<?php

require_once '../server/functions.php';
require_once '../server/Classes/App.php';
require_once '../server/Classes/RequestInfo.php';



//var_dump(getallheaders());



if(isset($_SERVER['REQUEST_METHOD'])){
  require_once 'json.php';
  echo '<br>';
  echo $RInfo->method;
  //print_r($_SERVER);
  //var_dump(getallheaders());
  //echo 'da';
  
}
/*
echo $RInfo->method;
echo $_SERVER['QUERY_STRING'];
print_r($RInfo->request);

if(!$RInfo->ajax) {
echo 'rety';
}
 * 
 */
?>
