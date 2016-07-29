<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of RequestInfo
 *
 * @author dima
 * 
 * Requestinfo.php
 */
class RequestInfo {
  public $method;
  public $query=[];
  public $request=[];
  public $ajax;
  public $content=[];
  
  public function __construct($server) {
    $this->method=$server['REQUEST_METHOD'];
    $this->ajax=($server['HTTP_X_REQUESTED_WITH']=='XMLHttpRequest')? true: false;
    $this->request =  $this->get_request();
    //$query;
    parse_str($server['QUERY_STRING'], $this->query);
  }
  
  public function get_request() {
    $request=false;
    /*
    switch ($this->method) {
      case 'POST':$request=$server[''];
        break;
      case 'GET':$request=$_GET;
        break;
      case 'PUT':parse_str(file_get_contents('php://input'), $request);
        break;
      case 'DELETE':$request=$_DELETE;
      default:$request=false;
        break;
    }
     * 
     */
    if($this->method=='PUT') {
      parse_str(file_get_contents('php://input'), $request);
    } elseif ($this->method=='POST') {
        $request=$_POST;
      }
    return $request;
  }
}

$RInfo=new RequestInfo($_SERVER);
//$app=new App($RInfo);


?>