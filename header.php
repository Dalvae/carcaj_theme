<!doctype html>
<html <?php language_attributes(); ?> class="no-js">
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-142230775-1"></script>
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());

	  gtag('config', 'UA-142230775-1');
	</script>
	<head>
		<meta charset="<?php bloginfo('charset'); ?>">
		<title><?php wp_title(''); ?><?php if(wp_title('', false)) { echo ' : '; } ?><?php bloginfo('name'); ?></title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta charset="<?php bloginfo('charset'); ?>">

		<!-- FAVICONS -->
		<link rel="apple-touch-icon" sizes="180x180" href="<?php bloginfo('template_url'); ?>/img/icons/apple-touch-icon.png">
		<link rel="icon" type="image/png" sizes="32x32" href="<?php bloginfo('template_url'); ?>/img/icons/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="16x16" href="<?php bloginfo('template_url'); ?>/img/icons/favicon-16x16.png">
		<link rel="manifest" href="<?php bloginfo('template_url'); ?>/img/icons/manifest.json">
		<meta name="theme-color" content="#ffffff">

		<link href="https://fonts.googleapis.com/css?family=Alegreya+Sans:400,500,700,800|Alegreya:400,500,500i,700i,800i,700,800" rel="stylesheet">

		<?php wp_head(); ?>

	</head>
	<body <?php body_class(); ?>>

	<!-- header -->
	<header>				
		<div class="container">
			<div class="col">
				<a href="<?php echo get_option('home'); ?>" class="logo">
					<img src="<?php bloginfo('template_url'); ?>/img/logo.svg" alt="">
				</a>
			</div>

			<button id="mobileNav" class="mobilebutton"><i class="fas fa-bars"></i></button>

			<div class="col right">				
				<nav>
					<?php wp_nav_menu(array('menu' => 'Menú Superior')); ?>
				</nav>
				<div class="searchbox">
					<?php get_template_part('searchform'); ?>
				</div>
				<div class="social">
					<a target="_blank" href="https://www.facebook.com/revistacarcaj/"><i class="fab fa-facebook-f"></i></a>
					<a target="_blank" href="https://www.instagram.com/revista.carcaj/"><i class="fab fa-instagram"></i></a>					
				</div>					
			</div>
			
		</div>
	</header>
	<!-- /header -->