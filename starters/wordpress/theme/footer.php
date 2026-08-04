<?php
/**
 * Subsolul temei: footer instituțional cu resurse, plus wp_footer() —
 * necesar pentru enhancement-ul JavaScript din functions.php.
 */
?>
</main>

<footer class="sd-footer">
	<div class="sd-footer__main">
		<section>
			<h2 class="sd-footer__heading"><?php bloginfo( 'name' ); ?></h2>
			<p><?php esc_html_e( 'Servicii digitale publice, construite cu Sistem Digital.', 'sistem-digital-starter' ); ?></p>
		</section>
		<nav aria-label="<?php esc_attr_e( 'Resurse', 'sistem-digital-starter' ); ?>">
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'footer',
					'container'      => false,
					'menu_class'     => 'sd-footer__list',
					'items_wrap'     => '<ul class="%2$s">%3$s</ul>',
					'fallback_cb'    => 'sistem_digital_starter_default_footer_links',
				)
			);
			?>
		</nav>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
