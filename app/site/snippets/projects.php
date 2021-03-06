<h2 class="gallery-title"><?php echo $page->galleryTitle()->html() ?></h2>

<section id="projects-gallery">
  <?php foreach(page('projects')->children()->visible()->limit(5) as $project): ?>
  <article 
    class="project"
    style="background: url('<?php echo $project->image($project->coverImage())->url() ?>') no-repeat center center; background-size:cover; ">
    
    <div class="overlay">
      <a href="<?php echo $project->url() ?>" class="btn cta">View case study</a>
      <a href="<?php echo $project->directUrl() ?>" target="blank" class="btn cta">Visit website</a>
    </div>
    
    <div class="text top">
      <h3><?php echo $project->mainTitleLine1()->html() ?> </h3>
      <h3><?php echo $project->mainTitleLine2()->html() ?></h3>
    </div>
    <div class="text bottom">
      <p><?php echo $project->type()->html() ?></p>    
      <p><?php echo $project->period()->html() ?></p>    
      <div class="spacer"></div>
      <p><?php echo $project->role()->html() ?></p>
      <p><?php echo $project->technos()->html() ?></p>
    
      <p><a href="<?php echo $project->url() ?>" class="hide-desktop">View case study</a></p>
      <p><a href="<?php echo $project->directUrl() ?>" target="blank" class="hide-desktop">Visit website</a></p>
    </div>
  </article>
  <?php endforeach; ?>
</section>

<div class="dots-container"></div>
