<?php get_header(); ?>

	<main class="archive container">
		<!-- section -->
		<section>

			<h1 class="cat"><?php single_cat_title(); ?></h1>

			<?php get_template_part('loop'); ?>

			<?php get_template_part('pagination'); ?>

		</section>
		<!-- /section -->
	</main>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
