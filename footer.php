		<!-- footer -->
		<footer>
			<div class="container">
				<div class="col">
					<div class="logogob">

					</div>
				</div>
				<div class="col"></div>
				<div class="col">
					<div class="logolom">
						<img src="<?php bloginfo('template_url'); ?>/img/logolom.png" alt="">
					</div>
				</div>
				<div class="col"></div>
				<div class="col">
					<div class="row">
						<nav>
							<?php wp_nav_menu(array('menu' => 'Menu Superior')); ?>
						</nav>
					</div>
					<div class="row searchsocial">
						<div class="searchbox">
							<?php get_template_part('searchform'); ?>
						</div>
						<div class="social">
							<p>síguenos como @revistacarcaj</p>
							<a target="_blank" href="https://www.facebook.com/revistacarcaj/"><i class="fab fa-facebook-f"></i></a>
							<a target="_blank" href="https://www.instagram.com/revista.carcaj/"><i class="fab fa-instagram"></i></a>
						</div>
					</div>
					<div class="row">
						<?php the_field('texto_footer'); ?>
					</div>
				</div>
			</div>
		</footer>
		<!-- /footer -->

		<?php wp_footer(); ?>

		</body>

		</html>