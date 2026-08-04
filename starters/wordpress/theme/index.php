<?php
/**
 * Șablon de bază (fallback), pentru orice conținut fără șablon mai specific.
 */

get_header();
?>

<div style="max-width: 42rem; margin: 3rem auto; padding: 0 1rem">
	<?php if ( have_posts() ) : ?>
		<?php
		while ( have_posts() ) :
			the_post();
			?>
			<article <?php post_class(); ?>>
				<?php if ( is_singular() ) : ?>
					<h1><?php the_title(); ?></h1>
					<?php the_content(); ?>
				<?php else : ?>
					<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
					<?php the_excerpt(); ?>
				<?php endif; ?>
			</article>
			<?php
		endwhile;
		the_posts_pagination();
	else :
		?>
		<p><?php esc_html_e( 'Nu există conținut de afișat.', 'sistem-digital-starter' ); ?></p>
	<?php endif; ?>
</div>

<?php
get_footer();
