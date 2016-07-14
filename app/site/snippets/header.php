<!DOCTYPE html>
<html lang="en">
<head>

  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title><?php echo $site->title()->html() ?> | <?php echo $page->title()->html() ?></title>
  <meta name="description" content="<?php echo $site->description()->html() ?>">
  <meta name="keywords" content="<?php echo $site->keywords()->html() ?>">
  
  <link rel="icon" type="ico" href="favicon.ico" />
  <link rel="icon" type="image/png" href="/assets/images/favicon.png" />

  <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.css"/>
  <?php echo css('/assets/styles/main.css') ?>

</head>
<body>
  <div class="isMobile"></div>

  <?php snippet('loader') ?>

  <?php snippet('menu') ?>

  <?php snippet('languages') ?>
