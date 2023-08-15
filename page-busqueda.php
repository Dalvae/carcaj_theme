<?php get_header(); ?>

	<main class="page container">
		<!-- section -->
		<section>
    <?php if (have_posts()): while (have_posts()) : the_post(); ?>
  
      <article class="busqueda">

        <div class="titleBar">
          <h1>Búsqueda</h1>
          <img src="<?php bloginfo('template_url'); ?>/img/search.png" alt="Search">
        </div>

        <div class="search-filters">

          <div class="block byTerm">
            <!-- search -->
            <form class="search" method="get" action="<?php echo home_url(); ?>" role="search">
              <input class="search-input" type="search" name="s" placeholder="Buscar por palabra...">
              <button class="search-submit" type="submit" role="button">Buscar</button>
            </form>
            <!-- /search -->
          </div>

          <div class="block byCat">
            <form id="category-select" class="category-select" action="<?php echo esc_url( home_url( '/' ) ); ?>" method="get">

            <?php
            $args = array(
                'show_option_none' => __( 'Categoría' ),
                'show_count'       => 0,
                'orderby'          => 'name',
                'name'             => 'cat',
                'echo'             => 0,
                'taxonomy'         => 'category',
                'value_field'      => 'id'
            );
            ?>

            <?php $select  = wp_dropdown_categories( $args ); ?>
            <?php $replace = "<select$1 onchange='return this.form.submit()'>"; ?>
            <?php $select  = preg_replace( '#<select([^>]*)>#', $replace, $select ); ?>

            <?php echo $select; ?>

            <noscript>
                <input type="submit" value="View" />
            </noscript>

            </form>
          </div>

          <div class="block byYear">
            <form id="year-select" class="year-select" action="<?php echo esc_url( home_url( '/' ) ); ?>" method="get">

              <?php
              $args = array(
                  'show_option_none' => __( 'Año' ),
                  'show_count'       => 0,
                  'orderby'          => 'name',
                  'name'             => 'anho',
                  'echo'             => 0,
                  'taxonomy'         => 'anho',
                  'value_field'      => 'slug'
              );
              ?>

              <?php $select  = wp_dropdown_categories( $args ); ?>
              <?php $replace = "<select$1 onchange='return this.form.submit()'>"; ?>
              <?php $select  = preg_replace( '#<select([^>]*)>#', $replace, $select ); ?>

              <?php echo $select; ?>

              <noscript>
                  <input type="submit" value="View" />
              </noscript>

            </form>
          </div>

          <div class="block byAuthor">
            <select name="author-dropdown" id="author-dropdown--1" onchange="document.location.href=this.options[this.selectedIndex].value;">
            <option value=""><?php echo esc_attr( __( 'Autor' ) ); ?></option> 
            <?php $users = get_users('role=author'); foreach ($users as $user) {
                if(count_user_posts( $user->id ) >0)
                {                
                  echo '<option value="'.get_author_posts_url( $user->id ).'">';               
                  echo $user->display_name;
                  echo '</option>'; 
                } 
              }
            ?>
            </select> 
          </div>
        </div>
      
      </article>

		<?php endwhile; ?>

		<?php else: endif; ?>

		</section>
		<!-- /section -->
	</main>

<?php get_footer(); ?>