		<!-- footer -->
		<footer>
			<div class="container">
				<div class="col">
					<div class="logogob">
						<div class="logogob">
							<img src="<?php bloginfo('template_url'); ?>/img/logo_gobierno.png" alt="">
						</div>
					</div>
				</div>
				<div class="col">

				</div>
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
							<a target="_blank" href="https://www.facebook.com/revistacarcaj/">
								<svg class="icon">
									<use xlink:href="#icon-facebook" />
								</svg>
							</a>
							<a target="_blank" href="https://www.instagram.com/revista.carcaj/">
								<svg class="icon">
									<use xlink:href="#icon-instagram" />
								</svg>
							</a>
						</div>
					</div>
					<div class="row">
						<?php the_field('texto_footer'); ?>
					</div>
				</div>
			</div>
		</footer>
		<!-- /footer s-->

		<?php wp_footer(); ?>

		</body>

		</html>