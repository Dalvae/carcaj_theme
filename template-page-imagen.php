<?php /* Template Name: Pagina con Imagen */ get_header(); ?>

	<main class="page container">
    
    <div class="breadcrumbs container" typeof="BreadcrumbList" vocab="https://schema.org/"><?php if(function_exists('bcn_display')){ bcn_display(); }?></div>

		<section>

		<h1 class="titleRed"><?php the_title(); ?></h1>

		<?php if (have_posts()): while (have_posts()) : the_post(); ?>

			<!-- article -->
			<article class="layout">

        <div class="content-empty"></div>
      
        <div class="content-text">
          <?php the_content(); ?>
        </div>

        <div class="content-img">
          <img src="<?php bloginfo('template_url'); ?>/img/carcaj-about.png" alt="">
        </div>
				
			</article>
			<!-- /article -->

		<?php endwhile; ?>

		<?php else: endif; ?>

		</section>
		<!-- /section -->
	</main>

<?php get_footer(); ?>