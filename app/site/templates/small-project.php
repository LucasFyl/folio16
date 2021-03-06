<?php snippet('header') ?>


  <main class="main small-project" role="main">

    <div class="infos">
      <img src="<?php echo $page->image($page->coverImage())->url() ?>" alt="<?php echo $page->title() ?>">
      <h1><?php echo $page->title() ?></h1>
      <p><?php echo $page->type() ?></p>
      <p><?php echo $page->technos() ?></p>
      <a href="<?php echo $page->directUrl() ?>" class="btn cta" target="_blank">Visit website</a>

      <div class="small-prevnext hide-mobile">
        <?php if( $prev = $page->prevVisible() ):  ?>
          <a href="<?php echo $prev->url() ?>" class="prev"><span>Previous project</span></a>
        <?php endif; ?>
        <?php if( $next = $page->nextVisible() ):  ?>
          <a href="<?php echo $next->url() ?>" class="next"><span>Next project</span></a>
        <?php endif; ?>
      </div>
    </div>
    
    <div class="gallery">
      <div class="scroller">
        <?php foreach($page->images()->not($page->coverImage()) as $img): ?>
          <img src="<?php echo $img->url() ?>" alt="<?php echo $page->projectLandingTitle() ?>" />
        <?php endforeach; ?>
      </div>

      <div class="small-prevnext hide-desktop">
        <?php if( $prev = $page->prevVisible() ):  ?>
          <a href="<?php echo $prev->url() ?>" class="prev"><span>Previous project</span></a>
        <?php endif; ?>
        <?php if( $next = $page->nextVisible() ):  ?>
          <a href="<?php echo $next->url() ?>" class="next"><span>Next project</span></a>
        <?php endif; ?>
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

  <div class="modal-overlay modal-fade-screen">
    <div id="controls">
      <a href="#" class="arrow prev">Prev</a>
      <a href="#" class="arrow next">Next</a>
      <div class="closeModal"></div>
    </div>
    <div class="scroller">
      <!-- <div class="modal"> -->
          <div class="modal-gallery"></div>
      <!-- </div> -->
    </div>
  </div>


<?php snippet('footer') ?>