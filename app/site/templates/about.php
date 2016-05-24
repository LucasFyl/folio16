<?php snippet('header') ?>

<main class="main about" role="main" >

	<h1><?php echo $page->mainTitle()->html() ?></h1>
	<h2><?php echo $page->subTitle()->html() ?></h2>
	
	<div class="text first">
		<?php echo $page->text1()->kirbytext() ?>
	</div>
	<div class="text second">
		<?php echo $page->text2()->kirbytext() ?>
	</div>
	<div class="text third">
		<?php echo $page->text3()->kirbytext() ?>
	</div>

	<div class="links-wrap">
		<a href="<?php echo $page->linkedInLink() ?>" target="blank" ><span>LinkedIn</span></a>
		<?php if($file = $page->file('CV-2016-LucasFayolle.pdf')): ?>
		<a href="<?php echo $file->url() ?>" target="blank" ><span>Resume</span></a>
		<?php endif; ?>
		<a href="mailto:<?php echo $page->contactLink() ?>"><span>Contact</span></a>
	</div>

</main>

<?php snippet('footer') ?>