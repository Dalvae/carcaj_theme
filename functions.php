<?php

/* NED FUNCTIONS */

/*------------------------------------*\
	Theme Support
\*------------------------------------*/

if (!isset($content_width)) {
	$content_width = 900;
}

if (function_exists('add_theme_support')) {
	// Add Menu Support
	add_theme_support('menus');

	// Add Thumbnail Theme Support
	add_theme_support('post-thumbnails');
	add_image_size('large', 700, '', true); // Large Thumbnail
	add_image_size('medium', 250, '', true); // Medium Thumbnail
	add_image_size('small', 120, '', true); // Small Thumbnail
	add_image_size('custom-size', 700, 200, true); // Custom Thumbnail Size call using the_post_thumbnail('custom-size');

	// Enables post and comment RSS feed links to head
	add_theme_support('automatic-feed-links');

	// Localisation Support
	load_theme_textdomain('html5blank', get_template_directory() . '/languages');
}

/*------------------------------------*\
	Functions
\*------------------------------------*/

// HTML5 Blank navigation
function html5blank_nav()
{
	wp_nav_menu(
		array(
			'theme_location'  => 'header-menu',
			'menu'            => '',
			'container'       => 'div',
			'container_class' => 'menu-{menu slug}-container',
			'container_id'    => '',
			'menu_class'      => 'menu',
			'menu_id'         => '',
			'echo'            => true,
			'fallback_cb'     => 'wp_page_menu',
			'before'          => '',
			'after'           => '',
			'link_before'     => '',
			'link_after'      => '',
			'items_wrap'      => '<ul>%3$s</ul>',
			'depth'           => 0,
			'walker'          => ''
		)
	);
}


function nedwp_enqueue_assets()
{
	// Definir si estamos en desarrollo
	$is_development = defined('WP_DEBUG') && WP_DEBUG;

	// Obtener la versión del tema
	$theme_version = wp_get_theme()->get('Version');

	// Timestamp para cache busting en desarrollo
	$version = $is_development ? time() : $theme_version;

	// CSS principal
	if ($is_development) {
		wp_enqueue_style(
			'theme-styles',
			get_template_directory_uri() . '/css/main.css',
			array(),
			$version
		);
	} else {
		wp_enqueue_style(
			'theme-styles',
			get_template_directory_uri() . '/css/main.min.css',
			array(),
			$theme_version
		);
	}

	// Slick CSS
	wp_enqueue_style(
		'slick-styles',
		get_template_directory_uri() . '/css/lib/slick.css',
		array(),
		'1.8.1'
	);

	// jQuery
	wp_enqueue_script('jquery');

	// Slick JS
	wp_enqueue_script(
		'slick',
		get_template_directory_uri() . '/js/lib/slick.min.js',
		array('jquery'),
		'1.8.1',
		true
	);

	// JavaScript principal
	wp_enqueue_script(
		'theme-scripts',
		get_template_directory_uri() . '/js/' . ($is_development ? 'main.js' : 'main.min.js'),
		array('jquery', 'slick'),
		$version,
		true
	);

	// Variables globales para JavaScript
	wp_localize_script(
		'theme-scripts',
		'themeVars',
		array(
			'ajaxUrl' => admin_url('admin-ajax.php'),
			'nonce' => wp_create_nonce('theme_nonce'),
			'isDev' => $is_development
		)
	);
}

add_action('wp_enqueue_scripts', 'nedwp_enqueue_assets');

// Opcional: Función helper para determinar el ambiente
function is_development()
{
	return defined('WP_DEBUG') && WP_DEBUG;
}

// REMOVE SHORTLINK
add_filter('get_shortlink', 'disable_stuff');
function disable_stuff($data)
{
	return false;
}

// Remove the <div> surrounding the dynamic navigation to cleanup markup
function my_wp_nav_menu_args($args = '')
{
	$args['container'] = false;
	return $args;
}

// Remove Injected classes, ID's and Page ID's from Navigation <li> items
function my_css_attributes_filter($var)
{
	return is_array($var) ? array() : '';
}

// Remove invalid rel attribute values in the categorylist
function remove_category_rel_from_category_list($thelist)
{
	return str_replace('rel="category tag"', 'rel="tag"', $thelist);
}

// Add page slug to body class, love this - Credit: Starkers Wordpress Theme
function add_slug_to_body_class($classes)
{
	global $post;
	if (is_home()) {
		$key = array_search('blog', $classes);
		if ($key > -1) {
			unset($classes[$key]);
		}
	} elseif (is_page()) {
		$classes[] = sanitize_html_class($post->post_name);
	} elseif (is_singular()) {
		$classes[] = sanitize_html_class($post->post_name);
	}

	return $classes;
}

// Remove wp_head() injected Recent Comment styles
function my_remove_recent_comments_style()
{
	global $wp_widget_factory;
	remove_action('wp_head', array(
		$wp_widget_factory->widgets['WP_Widget_Recent_Comments'],
		'recent_comments_style'
	));
}

// Pagination for paged posts, Page 1, Page 2, Page 3, with Next and Previous Links, No plugin
function html5wp_pagination()
{
	global $wp_query;
	$big = 999999999;
	echo paginate_links(array(
		'base' => str_replace($big, '%#%', get_pagenum_link($big)),
		'format' => '?paged=%#%',
		'current' => max(1, get_query_var('paged')),
		'total' => $wp_query->max_num_pages
	));
}

// Custom Excerpts
function html5wp_index($length) // Create 20 Word Callback for Index page Excerpts, call using html5wp_excerpt('html5wp_index');
{
	return 20;
}

// Create 40 Word Callback for Custom Post Excerpts, call using html5wp_excerpt('html5wp_custom_post');
function html5wp_custom_post($length)
{
	return 40;
}

// Create the Custom Excerpts callback
function html5wp_excerpt($length_callback = '', $more_callback = '')
{
	global $post;
	if (function_exists($length_callback)) {
		add_filter('excerpt_length', $length_callback);
	}
	if (function_exists($more_callback)) {
		add_filter('excerpt_more', $more_callback);
	}
	$output = get_the_excerpt();
	$output = apply_filters('wptexturize', $output);
	$output = apply_filters('convert_chars', $output);
	$output = '<p>' . $output . '</p>';
	echo $output;
}

// Custom View Article link to Post
function html5_blank_view_article($more)
{
	global $post;
	return '...';
}

// Remove Admin bar
function remove_admin_bar()
{
	return false;
}

// Remove 'text/css' from our enqueued stylesheet
function html5_style_remove($tag)
{
	return preg_replace('~\s+type=["\'][^"\']++["\']~', '', $tag);
}

// Remove thumbnail width and height dimensions that prevent fluid images in the_thumbnail
function remove_thumbnail_dimensions($html)
{
	$html = preg_replace('/(width|height)=\"\d*\"\s/', "", $html);
	return $html;
}

// Custom Gravatar in Settings > Discussion
function html5blankgravatar($avatar_defaults)
{
	$myavatar = get_template_directory_uri() . '/img/gravatar.jpg';
	$avatar_defaults[$myavatar] = "Custom Gravatar";
	return $avatar_defaults;
}

// Threaded Comments
function enable_threaded_comments()
{
	if (!is_admin()) {
		if (is_singular() and comments_open() and (get_option('thread_comments') == 1)) {
			wp_enqueue_script('comment-reply');
		}
	}
}

// Custom Comments Callback
function html5blankcomments($comment, $args, $depth)
{
	$GLOBALS['comment'] = $comment;
	extract($args, EXTR_SKIP);

	if ('div' == $args['style']) {
		$tag = 'div';
		$add_below = 'comment';
	} else {
		$tag = 'li';
		$add_below = 'div-comment';
	}
?>
	<!-- heads up: starting < for the html tag (li or div) in the next line: -->
	<<?php echo $tag ?> <?php comment_class(empty($args['has_children']) ? '' : 'parent') ?> id="comment-<?php comment_ID() ?>">
		<?php if ('div' != $args['style']) : ?>
			<div id="div-comment-<?php comment_ID() ?>" class="comment-body">
			<?php endif; ?>

			<div class="comment-text">
				<?php comment_text() ?>
			</div>

			<div class="comment-author vcard">
				<?php printf(__('<cite class="fn">%s</cite>'), get_comment_author_link()) ?>

				<div class="comment-meta commentmetadata"><a href="<?php echo htmlspecialchars(get_comment_link($comment->comment_ID)) ?>">
						<?php
						printf(__('%1$s at %2$s'), get_comment_date(),  get_comment_time()) ?></a><?php edit_comment_link(__('(Edit)'), '  ', '');
																									?>
				</div>
			</div>
			<?php if ($comment->comment_approved == '0') : ?>
				<em class="comment-awaiting-moderation"><?php _e('Your comment is awaiting moderation.') ?></em>
				<br />
			<?php endif; ?>


			<div class="reply">
				<?php // comment_reply_link(array_merge( $args, array('add_below' => $add_below, 'depth' => $depth, 'max_depth' => $args['max_depth']))) 
				?>
			</div>
			<?php if ('div' != $args['style']) : ?>
			</div>
		<?php endif; ?>
	<?php }

/*------------------------------------*\
	Actions + Filters + ShortCodes
\*------------------------------------*/

// Add Actions
//add_action('get_header', 'enable_threaded_comments'); // Enable Threaded Comments
add_action('wp_enqueue_scripts', 'nedwp_enqueue_assets');
add_action('widgets_init', 'my_remove_recent_comments_style'); // Remove inline Recent Comment Styles from wp_head()
add_action('init', 'html5wp_pagination'); // Add our HTML5 Pagination

// Remove Actions
remove_action('wp_head', 'feed_links_extra', 3); // Display the links to the extra feeds such as category feeds
remove_action('wp_head', 'feed_links', 2); // Display the links to the general feeds: Post and Comment Feed
remove_action('wp_head', 'rsd_link'); // Display the link to the Really Simple Discovery service endpoint, EditURI link
remove_action('wp_head', 'wlwmanifest_link'); // Display the link to the Windows Live Writer manifest file.
remove_action('wp_head', 'index_rel_link'); // Index link
remove_action('wp_head', 'parent_post_rel_link', 10, 0); // Prev link
remove_action('wp_head', 'start_post_rel_link', 10, 0); // Start link
remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0); // Display relational links for the posts adjacent to the current post.
remove_action('wp_head', 'wp_generator'); // Display the XHTML generator that is generated on the wp_head hook, WP version
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
remove_action('wp_head', 'rel_canonical');
remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);

// Add Filters
add_filter('avatar_defaults', 'html5blankgravatar'); // Custom Gravatar in Settings > Discussion
add_filter('body_class', 'add_slug_to_body_class'); // Add slug to body class (Starkers build)
add_filter('widget_text', 'do_shortcode'); // Allow shortcodes in Dynamic Sidebar
add_filter('widget_text', 'shortcode_unautop'); // Remove <p> tags in Dynamic Sidebars (better!)
add_filter('wp_nav_menu_args', 'my_wp_nav_menu_args'); // Remove surrounding <div> from WP Navigation
// add_filter('nav_menu_css_class', 'my_css_attributes_filter', 100, 1); // Remove Navigation <li> injected classes (Commented out by default)
// add_filter('nav_menu_item_id', 'my_css_attributes_filter', 100, 1); // Remove Navigation <li> injected ID (Commented out by default)
// add_filter('page_css_class', 'my_css_attributes_filter', 100, 1); // Remove Navigation <li> Page ID's (Commented out by default)
add_filter('the_category', 'remove_category_rel_from_category_list'); // Remove invalid rel attribute
add_filter('the_excerpt', 'shortcode_unautop'); // Remove auto <p> tags in Excerpt (Manual Excerpts only)
add_filter('the_excerpt', 'do_shortcode'); // Allows Shortcodes to be executed in Excerpt (Manual Excerpts only)
add_filter('excerpt_more', 'html5_blank_view_article'); // Add 'View Article' button instead of [...] for Excerpts
add_filter('style_loader_tag', 'html5_style_remove'); // Remove 'text/css' from enqueued stylesheet
add_filter('post_thumbnail_html', 'remove_thumbnail_dimensions', 10); // Remove width and height dynamic attributes to thumbnails
add_filter('image_send_to_editor', 'remove_thumbnail_dimensions', 10); // Remove width and height dynamic attributes to post images
add_filter('user_can_richedit', '__return_true');

// Remove Filters
remove_filter('the_excerpt', 'wpautop'); // Remove <p> tags from Excerpt altogether

// Register Custom Taxonomy
function especiales()
{

	$labels = array(
		'name'                       => _x('Especiales', 'Taxonomy General Name', 'especiales'),
		'singular_name'              => _x('Especial', 'Taxonomy Singular Name', 'especiales'),
		'menu_name'                  => __('Especiales', 'especiales'),
		'all_items'                  => __('All Items', 'especiales'),
		'parent_item'                => __('Parent Item', 'especiales'),
		'parent_item_colon'          => __('Parent Item:', 'especiales'),
		'new_item_name'              => __('Nuevo especial', 'especiales'),
		'add_new_item'               => __('Agregar', 'especiales'),
		'edit_item'                  => __('Edit Item', 'especiales'),
		'update_item'                => __('Update Item', 'especiales'),
		'view_item'                  => __('View Item', 'especiales'),
		'separate_items_with_commas' => __('Separate items with commas', 'especiales'),
		'add_or_remove_items'        => __('Add or remove items', 'especiales'),
		'choose_from_most_used'      => __('Choose from the most used', 'especiales'),
		'popular_items'              => __('Popular Items', 'especiales'),
		'search_items'               => __('Search Items', 'especiales'),
		'not_found'                  => __('Not Found', 'especiales'),
		'no_terms'                   => __('No items', 'especiales'),
		'items_list'                 => __('Items list', 'especiales'),
		'items_list_navigation'      => __('Items list navigation', 'especiales'),
	);
	$args = array(
		'labels'                     => $labels,
		'hierarchical'               => true,
		'public'                     => true,
		'show_ui'                    => true,
		'show_admin_column'          => true,
		'show_in_nav_menus'          => true,
		'show_tagcloud'              => true,
		'show_in_rest'               => true,
	);
	register_taxonomy('especiales', array('post'), $args);
}
add_action('init', 'especiales', 0);

// Register Custom Taxonomy
function year_post()
{

	$labels = array(
		'name'                       => _x('Año', 'Taxonomy General Name', 'year_post'),
		'singular_name'              => _x('Año', 'Taxonomy Singular Name', 'year_post'),
		'menu_name'                  => __('Año', 'year_post'),
		'all_items'                  => __('Todos los Años', 'year_post'),
		'parent_item'                => __('Parent Item', 'year_post'),
		'parent_item_colon'          => __('Parent Item:', 'year_post'),
		'new_item_name'              => __('Nuevo Año', 'year_post'),
		'add_new_item'               => __('Agregar año', 'year_post'),
		'edit_item'                  => __('Edit Item', 'year_post'),
		'update_item'                => __('Update Item', 'year_post'),
		'view_item'                  => __('View Item', 'year_post'),
		'separate_items_with_commas' => __('Separate items with commas', 'year_post'),
		'add_or_remove_items'        => __('Add or remove items', 'year_post'),
		'choose_from_most_used'      => __('Choose from the most used', 'year_post'),
		'popular_items'              => __('Popular Items', 'year_post'),
		'search_items'               => __('Search Items', 'year_post'),
		'not_found'                  => __('Not Found', 'year_post'),
		'no_terms'                   => __('No items', 'year_post'),
		'items_list'                 => __('Items list', 'year_post'),
		'items_list_navigation'      => __('Items list navigation', 'year_post'),
	);
	$args = array(
		'labels'                     => $labels,
		'hierarchical'               => true,
		'public'                     => true,
		'show_ui'                    => true,
		'show_admin_column'          => true,
		'show_in_nav_menus'          => true,
		'show_tagcloud'              => true,
		'show_in_rest'               => true,
	);
	register_taxonomy('anho', array('post'), $args);
}
add_action('init', 'year_post', 0);

	?>