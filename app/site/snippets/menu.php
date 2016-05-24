<div class="menu-trigger">
	<span></span>
</div>
<?php echo $page->uid() ?>
<div id="menu" >
	<nav role="navigation">
		<a <?php e($page->uid() == 'about', ' class="active"') ?> href="<?php echo page('about')->url() ?>"><span>About</span></a>
		<a <?php e($page->uid() == 'home', ' class="active"') ?> href="<?php echo page('home')->url() ?>"><span>Projects</span></a>
	</nav>
</div>
	