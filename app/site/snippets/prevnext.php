<nav class="nextprev cf" role="navigation">
	<div class="blockprevnext">
		<?php if( $prev = $page->prevVisible() && $next = $page->nextVisible() ): ?>
		<div class="prev">
			<p>Previous project</p>
			<h4><?php echo $page->prev()->title() ?></h4>
			<a href="<?php echo $page->prev()->url() ?>"
    		style="background: url('<?php echo $page->prev()->image('cover.png')->url() ?>') no-repeat center center; background-size:cover; ">
			</a>
	  	</div>
		<div class="next">
			<p>Next project</p>
			<h4><?php echo $page->next()->title() ?></h4>
			<a href="<?php echo $page->next()->url() ?>"
    		style="background: url('<?php echo $page->next()->image('cover.png')->url() ?>') no-repeat center center; background-size:cover; ">
			</a>
	  	</div>
	 	<?php elseif( $prev = !$page->prevVisible() ):  ?>

		<div class="next full">
			<p>Next project</p>
			<h4><?php echo $page->next()->title() ?></h4>
			<a href="<?php echo $page->next()->url() ?>"
    		style="background: url('<?php echo $page->next()->image('cover.png')->url() ?>') no-repeat center center; background-size:cover; ">
			</a>
	  	</div>
		<?php elseif( $next = !$page->nextVisible() ): ?>

	  	<div class="prev full">
			<p>Previous project</p>
			<h4><?php echo $page->prev()->title() ?></h4>
			<a href="<?php echo $page->prev()->url() ?>"
    		style="background: url('<?php echo $page->prev()->image('cover.png')->url() ?>') no-repeat center center; background-size:cover; ">
			</a>
	  	</div>
		<?php endif; ?>
	</div>
</nav>