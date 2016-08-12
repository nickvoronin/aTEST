<!DOCTYPE html>
<html>
  <head>
    <title>Setting up database</title>
  </head>
  <body>

    <h3>Setting up...</h3>

<?php 
/*
 * this is setup file, must run first, this script create db tabales for users,
 * topics, cards, tests.
 * 
 * @author Dmitrii Lazucov
 * 
 */
  require_once 'functions.php';

  createTable('topics',
              'topic_id SMALLINT NOT NULL AUTO_INCREMENT,
              topic_name VARCHAR(500),
              topic_description VARCHAR(5000),
              topic_language VARCHAR(2),
              user VARCHAR(20),
              INDEX(topic_name(20)),
              PRIMARY KEY (topic_id)');
  
  createTable('users',
              'user VARCHAR(16),
              pass VARCHAR(16),
              INDEX(user(6))');
  
  createTable('tests',
              'test_id SMALLINT NOT NULL AUTO_INCREMENT,
              topics_id VARCHAR(500),
              test_description VARCHAR(5000),
              number_of_questions SMALLINT(3),
              test_timer SMALLINT(3),
              test_is_active VARCHAR(5),
              INDEX(test_description(20)),
              PRIMARY KEY (test_id)');
  
  createTable('cards', 
              'card_id SMALLINT NOT NULL AUTO_INCREMENT,
              parent_topic_id SMALLINT (10),
              question VARCHAR(4096),
              versions VARCHAR(4096),
              answer VARCHAR(4096),
              card_price INT(1),
              PRIMARY KEY (card_id)');

?>

    <br>...done.
  </body>
</html>
