<?php
/**
 * Description of App
 * 
 * This class defines the behavior of the administrative part of the program,
 * he is responsible for the addition of the topics and cards and their representation,
 * it uses an instance of Requestinfo.php class to process the request.
 *
 * @author Dmitrii Lazucov positronbohemia.com
 * App.php
 * 
 * License GNU
 */

require_once 'RequestInfo.php';
require_once '../server/functions.php';


class App {
  
  public $requestArray=array();
  public $viewTopics;




  public function __construct($requestinfo) {
    //forming an array of query from json string
    $this->requestArray=  jsonToArray($requestinfo->request['jsonData']);
    $this->viewTopics=  json_encode($this->view_topics('oxana'));
    //$this->viewTopics=  json_encode($this->view_topics($this->requestArray['user']));
    
  }
  
  public function view_topics($user) {
    $tables=queryMysql(
            "SELECT * FROM topics "
          . "WHERE user='$user'"
            ); 
    /* fetch associative array */
    while ($row = $tables->fetch_assoc()) {
      $card=$row['topicId'];
      $row['cards']=  $this->view_cards($card);
      $topics_array[]=$row;
    }
    /* free result set */
    $tables->free();
    
    return $topics_array;

  }
  
  
  public function view_cards($topic_id) {
    $tables=queryMysql(
            "SELECT * FROM cards "
          . "WHERE parentTopicId='$topic_id'"
            );
    /* fetch associative array */
    while ($row = $tables->fetch_assoc()) {
      $parent_card_id=$row['cardId'];
      $alt['responses']=$this->view_responses($parent_card_id);
      $rows=array_replace($row, $alt);
      $cards_array[]=$rows;
    }

    /* free result set */
    $tables->free();

    return $cards_array;
  }
  
  
  public function view_responses($card_id) {
    $tables=queryMysql(
            "SELECT * FROM responses "
          . "WHERE parentCardId ='$card_id'"
            );
    /* fetch associative array */
    while ($row = $tables->fetch_assoc()) {
      $responses_array[]=$row;
    }
    /* free result set */
    $tables->free();

    return $responses_array;

  }
  

  public function add_topic($array) {
    $query_topic_name=$array['topicName'];
    $query_topic_description=$array['topicDescription'];
    $query_topic_language=$array['topicLanguage'];
    $query_topic_user=$array['user'];
    $check_topic = queryMysql(
            "SELECT * FROM topics "
          . "WHERE topicName='$query_topic' "
          . "AND user='$query_topic_user'"
            );
    if (!$check_topic->num_rows) {
      queryMysql(
              "INSERT INTO topics VALUES("
                                   . "NULL,'$query_topic_name', "
                                   . "'$query_topic_description', "
                                   . "'$query_topic_language', "
                                   . "'$query_topic_user'"
                                   . ")"
              );

      return $this->viewTopics;
    } else {
        return $this->viewTopics;
      }
  }

  
  public function edit_topic($array) {
    $query_topic_name=$array['topicName'];
    $query_topic_description=$array['topicDescription'];
    $query_topic_language=$array['topicLanguage'];
    $query_topic_id=$array['topicId'];
    queryMysql(
            "UPDATE topics "
          . "SET topicName='$query_topic_name',"
          . "topicDescription='$query_topic_description',"
          . "topicLanguage='$query_topic_language'"
          . "WHERE topicId='$query_topic_id'"
            );
    
    
    return $this->viewTopics;
  }
  
  
  public function delete_topic($topic_id) {
    queryMysql(
            "DELETE FROM topics"
          . "WHERE topicId='$query_topic_id'"
            );
    
    return $this->viewTopics;
  }
  
  
  public function add_card($array) {
    $query_parent_topic_id=$array['topicId'];
    $query_question=$array['question'];
    $query_card_price=$array['cardPrice'];
    $query_responses=$array['responses'];
    $check_card=queryMysql(
            "SELECT * FROM cards "
          . "WHERE parentTopicId='$query_parent_topic_id' "
          . "AND question='$query_question'"
            );
    
    if(!$check_card->num_rows){
      queryMysql(
              "INSERT INTO cards VALUES("
                                      . "NULL, '$query_parent_topic_id', "
                                      . "'$query_question', '$query_card_price'"
                                      . ")"
              );
      
      $query_card_id=queryMysql(
            "SELECT cardId FROM cards "
          . "WHERE parentTopicId='$query_parent_topic_id' "
          . "AND question='$query_question'"
            );
      
            $this->add_responses($query_responses, $query_card_id);
      
      return $this->viewTopics;
    } else {
        return $this->viewTopics;
      }
      
  }
  
  
  public function add_responses($array, $card_id) {
    foreach ($array as $value) {
      $query_answer=$value['answer'];
      $query_is_right=$value['isRight'];
      queryMysql(
              "INSERT INTO rsponses VALUES("
                                        . "'$card_id', "
                                        . "'$query_answer', '$query_is_right'"
                                        . ")"
              );
    }
    
  }
  
  
  public function edit_card($array) {
    $query_card_id=$array['cardId'];
    $query_question=$array['question'];
    $query_card_price=$array['cardPrice'];
    $query_responses=$array['responses'];
    queryMysql(
            "UPDATE cards "
          . "SET question='$query_question', "
          . "cardPrice='$query_card_price' "
          . "WHERE cardId='$query_card_id'"
            );
    
            $this->edit_responses($query_responses, $query_card_id);
    
    return $this->viewTopics;
  }
  
  
  public function edit_responses($array, $card_id) {
    foreach ($array as $value) {
      $query_answer=$value['answer'];
      $query_is_right=$value['isRight'];
    queryMysql(
            "UPDATE rsponses "
          . "SET answer='$query_answer', "
          . "isRighte='$query_is_right' "
          . "WHERE parentCardId='$card_id'"
            );
    }
  }
  
  public function delete_card($card_id) {
    queryMysql(
            "DELETE FROM cards "
          . "WHERE cardId='$card_id'"
            );
    
    return $this->viewTopics;
  }

  
}
  ?>