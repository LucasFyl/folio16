<h2 class="gallery-title">Latest projects</h2>

<section id="projects-gallery">
  <?php foreach(page('projects')->children()->visible() as $project): ?>
  <article 
    class="project"
    style="background: url('<?php echo $project->image($project->coverImage())->url() ?>') no-repeat center center; background-size:cover; ">
    <div class="overlay">
      <a href="<?php echo $project->directUrl() ?>" target="blank" class="btn cta">Visit website</a>
    </div>
    <div class="text top">
      <h3><?php echo $project->mainTitleLine1()->html() ?> </h3>
      <h3><?php echo $project->mainTitleLine2()->html() ?></h3>
      <p><?php echo $project->type()->html() ?></p>    
      <p><?php echo $project->period()->html() ?></p>    
    </div>
    <div class="text bottom">
      <p><?php echo $project->role()->html() ?></p>
      <p><?php echo $project->technos()->html() ?></p>
    </div>
  </article>
  <?php endforeach ?>
</section>

<div class="dots-container"></div>
