<html>
<head>
<style type="text/css"> 
  { 
  margin:0px;
  width:194px; 
  border:1px solid #A5ACB2;
  ;
  }
#txt1
  { 
  
  margin:0px;
  } 
</style>
<title><?php echo $title; ?> </title>
</head>

<body>11111111111111111
    <?php //phpinfo(); ?>
<h1><?php echo $heading ?> </h1>

<ol>

<?php foreach($todo as $item): ?>
<li><?php echo $item ?></li>
<?php endforeach; ?>

</ol>
</body>
</html>
