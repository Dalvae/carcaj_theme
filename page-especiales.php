<?php get_header(); ?>

<main class="home">

  <div class="breadcrumbs container" typeof="BreadcrumbList" vocab="https://schema.org/"><?php if (function_exists('bcn_display')) {
                                                                                            bcn_display();
                                                                                          } ?></div>

  <section class="articles">
    <div class="container">
      <h1 class="cat">Archivo de especiales</h1>

      <div class="items-list">
        <?php
        $args = array(
          'post_type' => 'page',
          'post_parent' => 7729,
          'posts_per_page' => 24,
        );
        $query = new WP_Query($args);

        if ($query->have_posts()) : while ($query->have_posts()): $query->the_post(); ?>

            <div class="item">
              <div class="thumb">
                <a href="<?php the_permalink(); ?>">
                  <?php
                  $image = get_field('imagen_superior');
                  if (!empty($image)):
                    // thumbnail
                    $size = 'large';
                    $thumb = $image['sizes'][$size];
                    $width = $image['sizes'][$size . '-width'];
                    $height = $image['sizes'][$size . '-height'];
                    if ($caption): ?>
                    <?php endif; ?>
                    <img src="<?php echo $thumb; ?>" alt="<?php echo $alt; ?>" width="<?php echo $width; ?>" height="<?php echo $height; ?>" />
                  <?php else: ?>

                  <?php endif ?>
                </a>
              </div>
              <div class="data center">
                <div class="date"><?php the_field('fecha_especial'); ?></div>
                <h2 class="center"><a href="<?php the_permalink(); ?>"><?php the_field('nombre_especial'); ?></a></h2>
                <p><?php the_field('bajada_especial'); ?></p>
              </div>
            </div>

        <?php endwhile;
          wp_reset_postdata();
        endif; ?>



      </div>
    </div>
  </section>

</main>

<?php get_footer(); ?>