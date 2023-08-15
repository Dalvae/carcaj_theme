<?php get_header(); ?>

	<main class="page container">
		<!-- section -->
		<section>
    <?php if (have_posts()): while (have_posts()) : the_post(); ?>
      <div class="topImg">
        <img src="<?php bloginfo('template_url'); ?>/img/foto07.jpg" alt="">
      </div>

      <div class="row">
        <div class="col">
          <h1 class="title"><?php the_title(); ?></h1>
          <span class="line"></span>
        </div>
        <div class="col">
          <?php the_content(); ?>
        </div>
      </div>	

		<?php endwhile; ?>

		<?php else: endif; ?>

		</section>
		<!-- /section -->
	</main>

<?php get_footer(); ?>