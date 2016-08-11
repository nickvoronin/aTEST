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
      $card=$row['topic_id'];
      $row['card']=  $this->view_cards($card);
      $topics_array[]=$row;
    }
    /* free result set */
    $tables->free();
    
    return $topics_array;

  }
  
  
  public function view_cards($topic_id) {
    $tables=queryMysql(
            "SELECT * FROM cards "
          . "WHERE parent_topic_id='$topic_id'"
            ); 
    /* fetch associative array */
    while ($row = $tables->fetch_assoc()) {
      $alt=array(
                'versions'=>explode('|', $row['versions']), 
                'answer'=>explode('|', $row['answer'])
                );
      $rows=array_replace($row, $alt);
      $cards_array[]=$rows;
    }
    
    /* free result set */
    $tables->free();
    
    return $cards_array;
  }
  

  public function add_topic($array) {
    $query_topic_name=$array['topic_name'];
    $query_topic_description=$array['topic_description'];
    $query_topic_language=$array['topic_language'];
    $query_topic_user=$array['user'];
    $check_topic = queryMysql(
            "SELECT * FROM topics "
          . "WHERE topic_name='$query_topic' "
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
    $query_topic_name=$array['topic_name'];
    $query_topic_description=$array['topic_description'];
    $query_topic_language=$array['topic_language'];
    $query_topic_id=$array['topic_id'];
    queryMysql(
            "UPDATE topics "
          . "SET topic_name='$query_topic_name',"
          . "topic_description='$query_topic_description',"
          . "topic_language='$query_topic_language'"
          . "WHERE topic_id='$query_topic_id'"
            );
    
    
    return $this->viewTopics;
  }
  
  
  public function delete_topic($topic_id) {
    queryMysql(
            "DELETE FROM topics"
          . "WHERE topic_id='$query_topic_id'"
            );
    
    return $this->viewTopics;
  }
  
  
  public function add_card($array) {
    $query_parent_topic_id=$array['topic_id'];
    $query_question=$array['question'];
    $query_versions=implode('|',$array['versions']);
    $query_answer=implode('|',$array['answer']);
    $query_card_price=$array['card_price'];
    $check_card=queryMysql(
            "SELECT * FROM cards "
          . "WHERE parent_topic_id='$query_parent_topic_id' "
          . "AND question='$query_question'"
            );
    
    if(!$check_card->num_rows){
      queryMysql(
              "INSERT INTO cards VALUES("
                                      . "NULL, '$query_parent_topic_id', "
                                      . "'$query_question', '$query_versions', "
                                      . "'$query_answer', '$query_card_price'"
                                      . ")"
              );
      
      return $this->viewTopics;
    } else {
        return $this->viewTopics;
      }
      
  }
  
  
  public function edit_card($array) {
    $query_card_id=$array['card_id'];
    $query_question=$array['question'];
    $query_versions=implode('|',$array['versions']);
    $query_answer=implode('|',$array['answer']);
    $query_card_price=$array['card_price'];
    queryMysql(
            "UPDATE cards "
          . "SET question='$query_question', "
          . "versions='$query_versions', "
          . "answer='$query_answer', "
          . "card_price='$query_card_price' "
          . "WHERE card_id='$query_card_id'"
            );
    
    return $this->viewTopics;
  }
  
  public function delete_card($card_id) {
    queryMysql(
            "DELETE FROM cards "
          . "WHERE card_id='$card_id'"
            );
    
    return $this->viewTopics;
  }

  
}
  ?>