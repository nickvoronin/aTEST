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
              'topicId SMALLINT NOT NULL AUTO_INCREMENT,
              topicName VARCHAR(500),
              topicDescription VARCHAR(5000),
              topicLanguage VARCHAR(2),
              user VARCHAR(20),
              INDEX(topicName(20)),
              PRIMARY KEY (topicId)');
  
  createTable('users',
              'user VARCHAR(16),
              pass VARCHAR(16),
              INDEX(user(6))');
  
  createTable('tests',
              'testId SMALLINT NOT NULL AUTO_INCREMENT,
              topicsId VARCHAR(500),
              testDescription VARCHAR(5000),
              numberOfQuestions SMALLINT(3),
              testTimer SMALLINT(3),
              testIsActive VARCHAR(5),
              INDEX(testDescription(20)),
              PRIMARY KEY (testId)');
  
  createTable('cards', 
              'cardId SMALLINT NOT NULL AUTO_INCREMENT,
              parentTopicId SMALLINT (10),
              question VARCHAR(4096),
              cardPrice INT(1),
              PRIMARY KEY (cardId)');
  
  createTable('responses', 
              'parentCardId SMALLINT (10),
              answer VARCHAR(4096),
              isRight VARCHAR(5)');

?>

    <br>...done.
  </body>
</html>
