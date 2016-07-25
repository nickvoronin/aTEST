<!DOCTYPE html>
<html>
  <head>
    <title>Setting up database</title>
  </head>
  <body>

    <h3>Setting up...</h3>

<?php // Example 26-3: setup.php
  require_once 'functions.php';

  createTable('topics',
              'id SMALLINT NOT NULL AUTO_INCREMENT,
              topic VARCHAR(500),
              language VARCHAR(2),
              user VARCHAR(20),
              state INT(1),
              INDEX(topic(20)),
              PRIMARY KEY (id)');
/*
  createTable('tests', 
              'id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
              auth VARCHAR(16),
              recip VARCHAR(16),
              pm CHAR(1),
              time INT UNSIGNED,
              message VARCHAR(4096),
              INDEX(auth(6)),
              INDEX(recip(6))');

  createTable("topic",
              'user VARCHAR(16),
              friend VARCHAR(16),
              INDEX(user(6)),
              INDEX(friend(6))');

  createTable('profiles',
              'user VARCHAR(16),
              text VARCHAR(4096),
              INDEX(user(6))');
 * 
 */
?>

    <br>...done.
  </body>
</html>
