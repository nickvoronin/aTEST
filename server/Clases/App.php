<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of App
 *
 * @author dima
 * App.php
 */

require_once 'Requestinfo.php';
require_once 'functions.php';


class App {
  
  public $AddTopic=[];
  public $AddQuestion=[];
  public $view;
  public $EditTopic=[];
  public $EditQuestion=[];
  public $Delet=[];
  public $checkuser;
  public $URL;




  public function __construct($param) {
    $this->AddTopic= $this->add_topic($RInfo->request);
    $this->AddQuestion= $this->add_question($RInfo->request);
    $this->EditTopic=  $this->edit_topic($RInfo->request);
  }
  
  public function checkuser($param) {
    $user;
  }
  
  public function start($URLstr) {
    $user;
  }
  
  public function add_topic($RInfoArry) {
    $qwery_topic=$RInfoArry['name'];
    $user='Default';
    $qwery_language=$RInfoArry['language'];
    $check_topic = queryMysql("SELECT * FROM topics WHERE topic='$qwery_topic'");
    if (!$check_topic->num_rows) {
      queryMysql("INSERT INTO topics VALUES(NULL,'$qwery_topic', '$qwery_language','$user' 1)");
    
      //set questions table
      $id_qwery = queryMysql("SELECT id FROM topics WHERE topic='$qwery_topic'");
      $id = $id_qwery->fetch_assoc();
      createTable($id['id'].'_', 
                  'id SMALLINT NOT NULL AUTO_INCREMENT,
                  question VARCHAR(4096) NOT NULL,
                  versions VARCHAR(4096) NOT NULL,
                  answer VARCHAR(4096) NOT NULL,
                  dificult INT(1),
                  state INT(1),
                  PRIMARY KEY (id)');
    } else {
        $id_qwery = queryMysql("SELECT id FROM topics WHERE topic='$qwery_topic'");
        $id = $id_qwery->fetch_assoc();
      }
    return $id;
  }
  
  public function add_question($RInfoArry) {
    $qwery_topic=$RInfoArry['topic_id'].'_';
    $qwery_question=$RInfoArry['question'];
    $qwery_versions=$RInfoArry['versions'];
    $qwery_answer=$RInfoArry['answer'];
    $qwery_price=$RInfoArry['dificult'];
    queryMysql("INSERT INTO $qwery_topic VALUES(NULL,'$qwery_question', '$qwery_versions', '$qwery_answer', '$qwery_price', 1)");
    
    $show_question=queryMysql("SELECT * FROM '$qwery_topic' WHERE question='$qwery_question'");
    
    return $show_question->fetch_assoc();
  }
  
  public function edit_topic($param) {
    
  }

  public function view($HTMLstr) {
    $user;
    echo $HTMLstr;
  }
  
  public function JsonToArray($jason_str) {
    $array_request=array(json_decode($jason_str, true))[0];
    array_walk_recursive($array_request, 'cleaner');
    
    return $array_request;
    
  }
  
  private function cleaner(&$item, $key) {
    $item=  SanitizeString($item);
  }
  
  public function ArraToJson($array) {
    $json_str=json_encode($array);
    
    return $json_str;
  }
}


?>