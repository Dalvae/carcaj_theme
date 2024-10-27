<?php /* Template Name: Especiales */ get_header(); ?>
<main class="page container">
  <div class="breadcrumbs container" typeof="BreadcrumbList" vocab="https://schema.org/"><?php if (function_exists('bcn_display')) {
                                                                                            bcn_display();
                                                                                          } ?></div>
  <section>
    <?php if (have_posts()): while (have_posts()) : the_post(); ?>
        <div class="topEspecial">
          <div class="thumb">
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
            <?php endif ?>
          </div>
          <?php if (get_field('creditos_imagen_superior')): ?>
            <p class="creditos-top"><?php the_field('creditos_imagen_superior'); ?></p>
          <?php endif ?>
          <div class="data">
            <h2><?php the_field('nombre_especial'); ?></h2>
            <h3><?php the_field('bajada_especial'); ?></h3>
            <p><?php the_field('descripcion'); ?></p>
          </div>
        </div>
        <div class="items-list archive-item">
          <?php
          $tax = get_field('posts_especial');
          $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

          $args = array(
            'post_type' => 'post',
            'posts_per_page' => 33,
            'paged' => $paged,
            'tax_query' => array(
              array(
                'taxonomy' => 'especiales',
                'field'    => 'id',
                'terms'    => $tax,
              ),
            ),
          );

          $query = new WP_Query($args);
          if ($query->have_posts()) : while ($query->have_posts()): $query->the_post(); ?>
              <div class="item">
                <div class="thumb">
                  <a href="<?php the_permalink(); ?>">
                    <?php if (has_post_thumbnail()): ?>
                      <?php the_post_thumbnail('420x250'); ?>
                    <?php else: ?>
                      <img src="https://unsplash.it/420/250" alt="">
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

            <!-- Añadimos la paginación -->
            <div class="pagination">
              <?php
              echo paginate_links(array(
                'base' => str_replace(999999999, '%#%', get_pagenum_url(999999999)),
                'format' => '?paged=%#%',
                'current' => max(1, $paged),
                'total' => $query->max_num_pages
              ));
              ?>
            </div>

          <?php wp_reset_postdata();
          endif; ?>
        </div>
      <?php endwhile; ?>
    <?php endif; ?>
  </section>
  <!-- /section -->
</main>
<?php get_footer(); ?>