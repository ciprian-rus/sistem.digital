<?php
/**
 * Antetul temei: skip-link, official-banner și institution-header, cu
 * navigația principală înregistrată la locația `primary`.
 */
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a class="sd-skip-link" href="#continut"><?php esc_html_e( 'Sari la conținut', 'sistem-digital-starter' ); ?></a>

<section class="sd-official-banner" aria-label="<?php esc_attr_e( 'Informație despre autenticitate', 'sistem-digital-starter' ); ?>">
	<div class="sd-official-banner__inner">
		<span class="sd-official-banner__mark" aria-hidden="true">RO</span>
		<p><?php esc_html_e( 'Acesta este un exemplu local. Domeniul oficial se configurează per instituție.', 'sistem-digital-starter' ); ?></p>
	</div>
</section>

<header class="sd-header">
	<div class="sd-header__identity-row">
		<a class="sd-identity" href="<?php echo esc_url( home_url( '/' ) ); ?>">
			<span class="sd-identity__mark" aria-hidden="true"><?php echo esc_html( sistem_digital_starter_identity_mark() ); ?></span>
			<span class="sd-identity__text">
				<span class="sd-identity__name"><?php bloginfo( 'name' ); ?></span>
				<span class="sd-identity__service"><?php bloginfo( 'description' ); ?></span>
			</span>
		</a>
	</div>
	<nav class="sd-primary-navigation" aria-label="<?php esc_attr_e( 'Navigație principală', 'sistem-digital-starter' ); ?>">
		<?php
		wp_nav_menu(
			array(
				'theme_location' => 'primary',
				'container'      => false,
				'menu_class'     => 'sd-primary-navigation__list',
				'items_wrap'     => '<ul class="%2$s">%3$s</ul>',
				'fallback_cb'    => false,
			)
		);
		?>
	</nav>
</header>

<main id="continut" tabindex="-1">
