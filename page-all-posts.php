<?php get_header(); ?>

  <main class="home">    
    <section class="articles">
      <div class="container">

        <h1 class="cat">Todos los artículos</h1>

        <div class="items-list">          
            <?php
            $args = array(
              'post_type' => 'post',
              'posts_per_page' => -1
            );
            $query = new WP_Query($args);

            if($query->have_posts()) : while($query->have_posts()): $query->the_post(); ?>

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

            <?php endwhile; wp_reset_postdata(); endif; ?>        
                      
            
            
        </div>        
      </div>
    </section>

  </main>

<?php get_footer(); ?>