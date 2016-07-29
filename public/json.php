<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
require_once 'functions.php';
//add_topic.php
$topic_qwery = array(
                     "user"=>"angela",
                     "name" =>"Topic name",
                     "description" =>"Sample description",
                     "language" =>"ru"
                );

$return= array("topic_id"=>12);
        
//add_question.php
$question_qwery = array(
                        "user"=>"angela",
                        "topic_id"=>12,
                        "question"=>"Is this a question?",
                        "versions"=>array("yes", "no", "maybe"),
                        "answer"  => array(0, 2),
                        "dificult" => 2
                  );


//add_test.php
$test_qwery=array(
                  "user"=>"angela",
                  "topics_id"=>12,
                  "number_of_questions"=>30,
                  "timer"=>30,
                  "is_active"=>true
            );





//edit_topic.php
$edit_topic_qwery=array(
                        "user"=>"angela",
                        "topic_id" => 12,
                        "data"=>array(
                                      "name"=>"Sample test",
                                      "description"=>"Sample description",
                                      "topic_language"=>"ru",
                                      "items"=>array(
                                                     "topic_id"=>12,
                                                     "question"=>"Is this a question?",
                                                     "versions"=>array("yes", "no", "maybe"),
                                      "answer"=>array(0, 2),
                                      "dificult"=>2
                                               )
                                )      
                  );
$json=json_encode($edit_topic_qwery);

  //echo json_encode($topic_qwery);
  //echo '<br>';
  //echo '<br>';
  //echo json_encode($question_qwery);
  //echo '<br>';
  //echo '<br>';
  //echo json_encode($test_qwery);
  //echo '<br>';
  //echo '<br>';
  //echo json_encode($edit_topic_qwery);


  //echo '<br>';
  $out=array(json_decode($json, true))[0];
  array_walk_recursive($out, 'efgt');
  function efgt(&$item, $key) {
    $item=  SanitizeString($item);
}


  //echo $out[0]['topic_id'];
  //print_r($ar);
$json_out=json_encode($out);
  echo $json_out;
 // echo '<br>';
  //echo '<br>';
  //print_r($out);
  // echo '<br>'; echo '<br>';
   
   //var_dump(getallheaders());
  
  //$headers = getallheaders();
    //echo $headers['User-Agent'];
    
        //header("fruit: apple");
    //var_dump(headers_list());
  ?>

