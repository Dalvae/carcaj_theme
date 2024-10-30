<?php get_header(); ?>

<main class="home">
  <section class="destacados">
    <div class="sliderHome">
      <?php for ($i = 1; $i <= 5; $i++) { ?>
        <div class="row">
          <div class="thumb">
            <a href="#">
              <img src="https://unsplash.it/930/400" alt="">
            </a>
          </div>
          <div class="data">
            <h2><a href="#">El título destacado, puede tener hasta tres líneas, con 42/54 pts</a></h2>
            <div class="extracto">
              <p>Este es un texto resumen de la entrada que ha sido destacado, comple la función de simular las cuatro líneas de extensión. 26/36pt</p>
            </div>
            <div class="date">16 de junio, 2019</div>
          </div>
        </div>
      <?php } ?>
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
          'post_per_page' => 9
        );
        $query = new WP_Query($args);

        if ($query->have_posts()) : while ($query->have_posts()): $query->the_post(); ?>

            <div class="item">
              <div class="thumb">
                <a href="<?php the_permalink(); ?>">
                  <?php if (has_post_thumbnail()): ?>
                    <?php the_post_thumbnail('medium'); ?>
                  <?php else: ?>
                    <img src="https://unsplash.it/420/250" alt="">
                  <?php endif ?>
                </a>
              </div>
              <div class="data">
                <div class="date"><?php the_time('d') ?> de <?php the_time('F Y') ?></div>
                <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                <div class="autor">por <?php the_author(); ?></div>
                <div class="extracto"><?php the_excerpt(); ?></div>
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