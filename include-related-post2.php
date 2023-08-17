<section class="relatedPosts">
    <div class="container">
        <h2 class="title">Artículos Recomendados</h2>
        <div class="itemsList">
            <?php
            $postid = get_the_ID();
            $posttags = get_the_tags();
            $author_id = get_the_author_meta('ID');

            if ($posttags) {
                foreach ($posttags as $tag) {
                    $tagsRelated = $tag->name . ', ';
                }
            }
            ?>

            <?php
            // Obtener las categorías del post actual
            $categories = get_the_category($postid);
            $category_ids = array();
            foreach ($categories as $category) {
                $category_ids[] = $category->cat_ID;
            }

            // Argumentos para la consulta basada en el autor
            $args_author = array(
                'post_type' => 'post',
                'author' => $author_id,
                'posts_per_page' => 3,
                'orderby' => 'rand',
                'post__not_in' => array($postid),
            );

            // Consulta basada en el autor
            $query_author = new WP_Query($args_author);

            // Argumentos para la consulta basada en la categoría
            $args_category = array(
                'post_type' => 'post',
                'cat' => $category_ids,
                'posts_per_page' => 3,
                'orderby' => 'rand',
                'post__not_in' => array($postid),
            );

            // Consulta basada en la categoría
            $query_category = new WP_Query($args_category);

            // Combinar los resultados de ambas consultas
            $combined_query = new WP_Query();
            $combined_query->posts = array_merge($query_author->posts, $query_category->posts);
            $combined_query->post_count = count($combined_query->posts);

            // Mostrar resultados combinados
            if ($combined_query->have_posts()) :
                while ($combined_query->have_posts()) : $combined_query->the_post();
                // Tu código HTML para mostrar los artículos recomendados
                endwhile;
                wp_reset_postdata();
            endif;
            ?>
        </div>
    </div>
</section>