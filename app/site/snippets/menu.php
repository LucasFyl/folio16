<div class="menu-trigger">
	<span></span>
</div>

<div id="menu" >
	<div class="id">
		<p class="strong">Lucas Fayolle</p>
		<a href="phone:+33685686715">(+33) 6 85 68 67 15</a>
		<a href="mailto:contact@lucasfayolle.com">contact@lucasfayolle.com</a>
		<p>Skype: lucasfyl</p>
	</div>
	<nav role="navigation">
		<a  class="strong" <?php e($page->uid() == 'about', ' class="active strong"') ?> href="<?php echo page('about')->url() ?>"><span>About</span></a>
		<a  class="strong" <?php e($page->uid() == 'home', ' class="active strong"') ?> href="<?php echo page('home')->url() ?>"><span>Projects</span></a>
		<ul class="projects-subnav">
			<?php foreach(page('projects')->children()->visible()->limit(5) as $project): ?>
			<li><a href="<?php echo $project->url() ?>"><span><?php echo $project->title() ?></span></a></li>
			<?php endforeach; ?>
			<!-- <li><p>-</p></li> -->
			<?php foreach(page('projects')->children()->visible()->slice(5) as $project): ?>
			<li><a href="<?php echo $project->url() ?>"><span><?php echo $project->title() ?></span></a></li>
			<?php endforeach; ?>
		</ul>

		<a class="strong" href="mailto:contact@lucasfayolle.com">Contact</a>
	</nav>
</div>
	