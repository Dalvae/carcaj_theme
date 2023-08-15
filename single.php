<?php get_header(); ?>

	<main class="single">

	<div class="breadcrumbs container" typeof="BreadcrumbList" vocab="https://schema.org/"><?php if(function_exists('bcn_display')){ bcn_display(); }?></div>
	<!-- section -->
	<section>

	<?php if (have_posts()): while (have_posts()) : the_post(); ?>

		<!-- article -->
		<article class="container">

			<?php if (has_post_thumbnail()): ?>
				<div class="top-post">
					<?php the_post_thumbnail('large'); ?>
					<?php if(get_field('creditos_imagen')): ?>
						<p><?php the_field('creditos_imagen'); ?></p>
					<?php endif ?>					
				</div>
			<?php endif ?>

			<div class="content-post">
				<div class="top">
					<div class="date"><?php the_time('d'); ?> de <?php the_time('F Y'); ?></div>
					<div class="categories">
						<?php the_category(','); ?>
					</div>
				</div>

				<h1 class="title-post"><?php the_title(); ?></h1>

				<?php if(get_field('autores')): ?>
					<div class="authors"><?php the_field('autores'); ?></div>
				<?php endif ?>				
				
				<div class="content-full">
					<?php the_content(); // Dynamic Content ?>
				</div>				

				<?php if(function_exists('pf_show_link')){echo pf_show_link();} ?>

				<img class="firma" src="<?php bloginfo('template_url'); ?>/img/diana.svg" alt="">


			</div>

		</article>
		<!-- /article -->

		<div class="block-author">
			<div class="container">
				<h2><?php the_author_posts_link(); ?></h2>
				<div class="description">				
					<?php $authorDesc = the_author_meta('description'); echo $authorDesc; ?>
				</div>
			</div>
		</div>

		<?php get_template_part('include-related-posts'); ?>

		<?php comments_template(); ?>

		<script>
			document.getElementById("comment").placeholder = "Mensaje";
			document.getElementById("author").placeholder = "Nombre";
			document.getElementById("email").placeholder = "Email";
		</script>

	<?php endwhile; ?>

	<?php else: ?>

		<!-- article -->
		<article>

			<h1>Nada que mostrar</h1>

		</article>
		<!-- /article -->

	<?php endif; ?>

	</section>
	<!-- /section -->
	</main>

<?php get_footer(); ?>
