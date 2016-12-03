<a href="#" class="other"><span><?php echo $page->otherProjects()->html() ?></span></a>
<section class="other-projects">
  	<?php foreach(page('projects')->children()->visible()->slice(5) as $project): ?>
	<article>
    	<a href="<?php echo $project->url() ?>">
			<img src="<?php echo $project->image($project->coverImage())->url() ?>" alt="<?php echo $project->title() ?>">
			<h4><?php echo $project->title() ?></h4>
			<p><?php echo $project->type() ?></p>
			<p><?php echo $project->technos() ?></p>
		</a>
	</article>
	<?php endforeach ?>
</section>