<!DOCTYPE html>
<html lang="en">
<head>

  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title><?php echo $site->title()->html() ?> | <?php echo $page->title()->html() ?></title>
  <meta name="description" content="<?php echo $site->description()->html() ?>">
  <meta name="keywords" content="<?php echo $site->keywords()->html() ?>">

  <?php echo css('assets/styles/main.css') ?>

</head>
<body>

  <?php snippet('loader') ?>

  <?php snippet('menu') ?>

  <div class="language">
    <ul>
      <li class="active"><a href="#">fr</a></li>
      <li><a href="#">en</a></li>
    </ul>
  </div>