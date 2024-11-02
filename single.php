<?php get_header(); ?>

<main class="single">

	<div class="breadcrumbs container" typeof="BreadcrumbList" vocab="https://schema.org/"><?php if (function_exists('bcn_display')) {
																								bcn_display();
																							} ?></div>
	<!-- section -->
	<section>

		<?php if (have_posts()): while (have_posts()) : the_post(); ?>

				<!-- article -->
				<article class="container">

					<?php if (has_post_thumbnail()): ?>
						<div class="top-post">
							<?php the_post_thumbnail('large'); ?>
							<?php if (get_field('creditos_imagen')): ?>
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

						<?php if (get_field('autores')): ?>
							<div class="authors"><?php the_field('autores'); ?></div>
						<?php endif ?>

						<div class="content-full">
							<?php the_content(); // Dynamic Content 
							?>
						</div>

						<?php if (function_exists('pf_show_link')) {
							echo pf_show_link();
						} ?>
						<div class="flex">
							<img class="firma" src="<?php bloginfo('template_url'); ?>/img/diana.svg" alt="">
							<div class="social-share">
								<svg class="icon-share" viewBox="0 0 24 24" width="24" height="24">
									<path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
								</svg>
								<div class="share-tooltip">
									<a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo get_permalink(); ?>" target="_blank">
										<svg class="icon">
											<use xlink:href="#icon-facebook"></use>
										</svg>
									</a>
									<a href="instagram://story?url=<?php echo urlencode(get_permalink()); ?>&media=<?php echo urlencode(get_the_post_thumbnail_url(get_the_ID(), 'large')); ?>"
										target="_blank"
										onclick="window.open('https://www.instagram.com', '_blank'); return false;">
										<svg class="icon">
											<use xlink:href="#icon-instagram"></use>
										</svg>
									</a>
								</div>
							</div>

						</div>

					</div>

				</article>
				<!-- /article -->

				<div class="block-author">
					<div class="container">
						<h2><?php the_author_posts_link(); ?></h2>
						<div class="description">
							<?php $authorDesc = the_author_meta('description');
							echo $authorDesc; ?>
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