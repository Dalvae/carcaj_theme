<?php get_header(); ?>

<main class="home">
  <section class="destacados">
    <div class="sliderHome">
      <?php if (have_rows('slider')) : ?>
        <?php while (have_rows('slider')) : the_row(); ?>
          <div class="row">
            <div class="thumb">
              <a href="<?php the_sub_field('enlace'); ?>">
                <?php
                $image = get_sub_field('imagen');
                if (!empty($image)) :
                  // thumbnail
                  $size = 'large';
                  $thumb = $image['sizes'][$size];
                  $width = $image['sizes'][$size . '-width'];
                  $height = $image['sizes'][$size . '-height'];
                  if ($caption) : ?>
                  <?php endif; ?>
                  <img src="<?php echo $thumb; ?>" alt="<?php echo $alt; ?>" width="<?php echo $width; ?>" height="<?php echo $height; ?>" />
                <?php else : ?>
                  <img src="<?php bloginfo('template_url'); ?>/img/thumb.png" alt="">
                <?php endif ?>
              </a>
            </div>
            <div class="data">
              <h2><a href="<?php the_sub_field('enlace'); ?>"><?php the_sub_field('titulo'); ?></a></h2>
              <div class="extracto">
                <p><?php the_sub_field('bajada'); ?></p>
              </div>
              <div class="date"><?php the_sub_field('fecha'); ?></div>
            </div>
          </div>
        <?php endwhile; // while( has_sub_field('to-do_lists') ): 
        ?>
      <?php endif; // if( get_field('to-do_lists') ): 
      ?>
    </div>
    <div class="customArrow prevArrow"><i class="fas fa-chevron-left"></i></div>
    <div class="customArrow nextArrow"><i class="fas fa-chevron-right"></i></div>
  </section>

  <section class="articles">
    <div class="container">
      <div class="items-list">
        <?php
        $args = array(
          'post_type' => 'post',
          'post_per_page' => 12
        );
        $query = new WP_Query($args);

        if ($query->have_posts()) : while ($query->have_posts()) : $query->the_post(); ?>

            <div class="item">
              <div class="thumb">
                <a href="<?php the_permalink(); ?>">
                  <?php if (has_post_thumbnail()) : ?>
                    <?php the_post_thumbnail('medium'); ?>
                  <?php else : ?>
                    <img src="<?php bloginfo('template_url'); ?>/img/thumb.png" alt="">
                  <?php endif ?>
                  <div class="categories">
                    <?php the_category(','); ?>
                  </div>
                </a>
              </div>
              <div class="data">
                <div class="date"><?php the_time('d') ?> de <?php the_time('F Y') ?></div>
                <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                <div class="autor">por <?php the_author_posts_link(); ?></div>
                <div class="extracto"><?php html5wp_excerpt('html5wp_index'); ?></div>
              </div>
            </div>

        <?php endwhile;
          wp_reset_postdata();
        endif; ?>
      </div>
      <a href="<?php echo get_option('home'); ?>/all-posts" class="readmore">Ver más artículos</a>
    </div>
  </section>

  <section class="categorias">
    <div class="container">
      <nav>
        <?php wp_nav_menu(array('menu' => 'Categorías')); ?>
      </nav>
    </div>
  </section>

  <section class="newsletter">
    <div class="container">
      <p>Suscríbete y recibe actualizaciones en tu correo electrónico</p>
      <form>
        <input type="" placeholder="Tu email">
        <button>Enviar</button>
      </form>
    </div>
  </section>

</main>

<?php get_footer(); ?>