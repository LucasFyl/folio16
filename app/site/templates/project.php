<?php snippet('header') ?>

  <div class="landing"
      style="background: url('<?php echo $page->image($page->coverImage())->url() ?>') no-repeat center center; background-size:cover; ">
    <div class="title">
      <h1><?php echo $page->projectLandingTitle()->html() ?></h1>
      <h2><?php echo $page->projectLandingSubTitle()->html() ?></h2>
    </div>
    <div class="text">
      <?php echo $page->projectLandingText()->kirbytext() ?>
    </div>
  </div>

  <main class="main case-study" role="main">

    <header>
      <div>
        <h4>Type de projet</h4>
        <h3><?php echo $page->projectType()->html() ?></h3>
      </div>
      <div>
        <h4>Période</h4>
        <h3><?php echo $page->projectPeriod()->html() ?></h3>
      </div>
      <div>
        <h4>Client</h4>
        <h3><?php echo $page->projectClient()->html() ?></h3>
      </div>
      <div>
        <h4>rôle</h4>
        <h3><?php echo $page->projectRole()->html() ?></h3>
      </div>
    </header>
    
    <div class="gallery">
      <?php foreach($page->images()->not($page->coverImage()) as $img): ?>
        <img src="<?php echo $img->url() ?>" alt="<?php echo $page->projectLandingTitle() ?>" />
      <?php endforeach; ?>
    </div>
      
    <div class="grid">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>

  </main>

  <?php snippet('prevnext') ?>

<?php snippet('footer') ?>