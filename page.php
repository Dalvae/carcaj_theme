<?php get_header(); ?>

	<main class="page container">
    
    <div class="breadcrumbs container" typeof="BreadcrumbList" vocab="https://schema.org/"><?php if(function_exists('bcn_display')){ bcn_display(); }?></div>

		<section>

		<h1 class="titleRed"><?php the_title(); ?></h1>

		<?php if (have_posts()): while (have_posts()) : the_post(); ?>

			<!-- article -->
			<article class="layout full">        
      
        <div class="content-text">
          <?php the_content(); ?>
        </div>        				
				
			</article>
			<!-- /article -->

		<?php endwhile; ?>

		<?php else: endif; ?>

		</section>
		<!-- /section -->
	</main>

<?php get_footer(); ?>