<?php get_header(); ?>

	<main class="page container">
		<!-- section -->
		<section>

			<h1 class="title red">Error 404</h1>

			<img src="<?php bloginfo('template_url'); ?>/img/404.png" alt="">

			<div class="texto-error">
				<p class="error">Página no encontrada.</p>
				<p class="error">Puedes volver a <a href="<?php echo get_option('home'); ?>">nuestra página de inicio</a> o <a href="<?php echo get_option('home'); ?>/busqueda">buscar en nuestro archivo</a>.</p>
			</div>

		</section>
		<!-- /section -->
	</main>

<?php get_footer(); ?>