	
	<div class="grid">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
	
	<?= js('/bower_components/jquery/dist/jquery.js') ?>
	<?= js('/bower_components/gsap/src/minified/TweenMax.min.js') ?>
	<?= js('/bower_components/gsap/src/minified/plugins/ScrollToPlugin.min.js') ?>
	<?= js('/bower_components/gsap/src/minified/plugins/CSSRulePlugin.min.js') ?>
	<?= js('/bower_components/gsap/src/minified/plugins/CSSPlugin.min.js') ?>
	<?= js('/bower_components/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js') ?>
	<?= js('/bower_components/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js') ?>

	<?= js('/assets/scripts/custom-slick.js') ?>
	<?= js('/assets/scripts/modal.js') ?>
	<?= js('/assets/scripts/main.js') ?>


    <script type="text/javascript">
      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-40894794-1']);
      _gaq.push(['_trackPageview']);

      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
    </script>

</body>
</html>