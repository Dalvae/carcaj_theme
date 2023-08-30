<section class="relatedPosts">
  <div class="container">
    <h2 class="title">Artículos Recomendados</h2>
    <div class="itemsList">
      <?php
      $postid = get_the_ID();
      $args = array(
        'post_type' => 'post',
        'author' => get_the_author_meta('ID'),
        'posts_per_page' => 3,
        'orderby' => 'rand',
        'post__not_in' => array($postid)
      );
      $query = new WP_Query($args);
      $post_count = $query->post_count;
      if ($query->have_posts()) : while ($query->have_posts()) : $query->the_post(); ?>
          <div class="item">
            <div class="thumb">
              <a href="<?php the_permalink(); ?>">
                <?php if (has_post_thumbnail()) : ?>
                  <?php the_post_thumbnail('medium'); ?>
                <?php else : ?>
                  <img src="<?php bloginfo('template_url'); ?>/img/thumb.png" alt="">
                <?php endif ?>
              </a>
            </div>
            <div class="data">
              <div class="date"><?php the_time('d') ?> de <?php the_time('F Y') ?></div>
              <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
              <div class="autor">por <?php the_author(); ?></div>
            </div>
          </div>
      <?php endwhile;
        wp_reset_postdata();
      endif; ?>
      <?php
      if ($post_count < 3) {
        $remaining_posts = 3 - $post_count;

        $args_last_20 = array(
          'post_type' => 'post',
          'posts_per_page' => 20,
          'orderby' => 'date',
          'order' => 'DESC',
          'post__not_in' => array($postid)
        );

        $last_20_query = new WP_Query($args_last_20);

        $ids = array();
        if ($last_20_query->have_posts()) {
          $ids = wp_list_pluck($last_20_query->posts, 'ID');
        }

        if ($remaining_posts == 1) {
          $random_id = array_rand($ids);
          $random_ids = array($ids[$random_id]);
        } else {
          $random_ids = (count($ids) > $remaining_posts) ? array_rand(array_flip($ids), $remaining_posts) : $ids;
        }

        $args_new = array(
          'post_type' => 'post',
          'post__in' => $random_ids,
          'orderby' => 'post__in',
        );

        $new_query = new WP_Query($args_new);

        if ($new_query->have_posts()) :
          while ($new_query->have_posts()) :
            $new_query->the_post(); ?>
            <div class="item">
              <div class="thumb">
                <a href="<?php the_permalink(); ?>">
                  <?php if (has_post_thumbnail()) : ?>
                    <?php the_post_thumbnail('medium'); ?>
                  <?php else : ?>
                    <img src="<?php bloginfo('template_url'); ?>/img/thumb.png" alt="">
                  <?php endif ?>
                </a>
              </div>
              <div class="data">
                <div class="date"><?php the_time('d') ?> de <?php the_time('F Y') ?></div>
                <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                <div class="autor">por <?php the_author(); ?></div>
              </div>
            </div>
      <?php endwhile;
          wp_reset_postdata();
        endif;
      }
      ?>
    </div>
  </div>
</section>