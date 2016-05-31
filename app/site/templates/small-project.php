<?php snippet('header') ?>


  <main class="main small-project" role="main">

    <div class="infos">
      <img src="<?php echo $page->image($page->coverImage())->url() ?>" alt="<?php echo $page->title() ?>">
      <h1><?php echo $page->title() ?></h1>
      <p><?php echo $page->type() ?></p>
      <p><?php echo $page->technos() ?></p>
      <a href="<?php echo $page->directUrl() ?>" class="btn cta" target="_blank">Visit website</a>
    </div>
    
    <div class="gallery">
      <div class="scroller">
        <?php foreach($page->images()->not($page->coverImage()) as $img): ?>
          <img src="<?php echo $img->url() ?>" alt="<?php echo $page->projectLandingTitle() ?>" />
        <?php endforeach; ?>
      </div>
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


<?php snippet('footer') ?>