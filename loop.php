<div class="items-list archive-item">
<?php if (have_posts()): while (have_posts()) : the_post(); ?>

<div class="item">
	<div class="thumb">
		<a href="<?php the_permalink(); ?>">			
			<?php if (has_post_thumbnail()): ?>
				<?php the_post_thumbnail('420x250'); ?>
			<?php else: ?>
				<img src="<?php bloginfo('template_url'); ?>/img/thumb.png" alt="">
			<?php endif ?>
		</a>
	</div>
	<div class="data">
		<div class="date"><?php the_time('d') ?> de <?php the_time('F Y') ?></div>
		<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
		<div class="autor">por <?php the_author_posts_link(); ?></div>
		<div class="extracto"><?php html5wp_excerpt('html5wp_index'); ?></div>
	</div>
</div>

<?php endwhile; ?>
<?php else: ?>

<?php endif; ?>
</div>