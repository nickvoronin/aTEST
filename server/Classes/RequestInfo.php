<?php
/**
 * Description of RequestInfo
 *
 * @author Dmitrii Lazucov positronbohemia.com
 * 
 * Requestinfo.php
 * 
 * License GNU
 */


class RequestInfo {
  public $method;
  public $query=array();
  public $request=array();
  public $ajax;
  
  
  public function __construct($server) {
    $this->method=$server['REQUEST_METHOD'];
    $this->ajax=($server['HTTP_X_REQUESTED_WITH']=='XMLHttpRequest')? true: false;
    $this->request =  $this->get_request();
    parse_str($server['QUERY_STRING'], $this->query);
  }
  
  
  public function get_request() {
    //$request=false;
    switch ($this->method) {
      case 'POST':$request=$_POST; break;
      case 'GET' :$request=$_GET; break;
      case 'PUT' :parse_str(file_get_contents('php://input'), $request); break;
      default    :$request=false; break;
    }
     /*
    if($this->method=='PUT') {
      parse_str(file_get_contents('php://input'), $request);
    } elseif ($this->method=='POST') {
        $request=$_POST;
      }
      * 
      */
    return $request;
  }
}

$RInfo=new RequestInfo($_SERVER);
$app=new App($RInfo);


?>