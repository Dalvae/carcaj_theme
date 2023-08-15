<?php get_header(); ?>

	<main class="archive container">
		<!-- section -->
		<section>

			<div class="breadcrumbs" typeof="BreadcrumbList" vocab="https://schema.org/">
				<?php if(function_exists('bcn_display')){ bcn_display(); }?>
			</div>

			<h1 class="search">Resultados para la búsqueda : <?php echo get_search_query(); ?></h1>

			<?php get_template_part('loop'); ?>

			<?php get_template_part('pagination'); ?>

		</section>
		<!-- /section -->
	</main>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
