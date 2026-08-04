<?php
/**
 * Configurare temă și înregistrare active Sistem Digital.
 *
 * Activele CSS/JS din theme/assets/vendor sunt copiate din pachetele
 * publicate @sistem-digital/tokens și @sistem-digital/components prin
 * `npm run assets:sync` — nu sunt scrise manual și nu duplică sursa
 * componentelor. Vezi README.md pentru instalare și actualizare.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'SISTEM_DIGITAL_STARTER_VENDOR_DIR', get_template_directory() . '/assets/vendor' );
define( 'SISTEM_DIGITAL_STARTER_VENDOR_URI', get_template_directory_uri() . '/assets/vendor' );

/**
 * Monogramă de două litere pentru identitatea din header, derivată din
 * numele site-ului (setat din Setări → General).
 */
function sistem_digital_starter_identity_mark() {
	$name = wp_strip_all_tags( get_bloginfo( 'name' ) );
	$mark = mb_strtoupper( mb_substr( trim( $name ), 0, 2 ) );
	return '' !== $mark ? $mark : 'SD';
}

/**
 * Suportul de bază al temei.
 */
function sistem_digital_starter_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support(
		'html5',
		array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' )
	);

	register_nav_menus(
		array(
			'primary' => __( 'Meniu principal', 'sistem-digital-starter' ),
			'footer'  => __( 'Resurse din footer', 'sistem-digital-starter' ),
		)
	);
}
add_action( 'after_setup_theme', 'sistem_digital_starter_setup' );

/**
 * Versiunea unui asset, pentru invalidarea cache-ului browserului la fiecare
 * `assets:sync`. Returnează null dacă fișierul lipsește din versiunea
 * pachetului instalat (unele fișiere, ex. icons.css, au fost adăugate după
 * prima versiune publicată).
 */
function sistem_digital_starter_asset_version( $relative_path ) {
	$path = SISTEM_DIGITAL_STARTER_VENDOR_DIR . '/' . $relative_path;
	return file_exists( $path ) ? (string) filemtime( $path ) : null;
}

/**
 * Inițializarea temei (light/dark/contrast înalt) trebuie să ruleze înainte
 * de primul paint, ca să evite un „flash” vizual — de aceea e inline în
 * <head>, nu un fișier enqueued separat, la fel ca în starterele HTML și
 * Next.js din acest monorepo.
 */
function sistem_digital_starter_theme_init_inline() {
	$path = SISTEM_DIGITAL_STARTER_VENDOR_DIR . '/tokens/theme-init.js';
	if ( ! file_exists( $path ) ) {
		return;
	}
	echo '<script>' . file_get_contents( $path ) . '</script>' . "\n"; // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
}
add_action( 'wp_head', 'sistem_digital_starter_theme_init_inline', 1 );

/**
 * Foile de stil publicate, în ordinea cerută de @layer-ele din
 * @sistem-digital/tokens și @sistem-digital/components.
 */
function sistem_digital_starter_enqueue_styles() {
	$stylesheets = array(
		'sistem-digital-tokens'      => 'tokens/tokens.css',
		'sistem-digital-themes'      => 'tokens/themes.css',
		'sistem-digital-navigation'  => 'components/navigation.css',
		'sistem-digital-forms'       => 'components/forms.css',
		'sistem-digital-content'     => 'components/content.css',
		'sistem-digital-interactive' => 'components/interactive.css',
	);

	$previous_handle = null;
	foreach ( $stylesheets as $handle => $relative_path ) {
		$version = sistem_digital_starter_asset_version( $relative_path );
		if ( null === $version ) {
			continue;
		}
		$deps = $previous_handle ? array( $previous_handle ) : array();
		wp_enqueue_style(
			$handle,
			SISTEM_DIGITAL_STARTER_VENDOR_URI . '/' . $relative_path,
			$deps,
			$version
		);
		$previous_handle = $handle;
	}

	wp_enqueue_style( 'sistem-digital-starter-style', get_stylesheet_uri(), array(), '0.1.0' );
}
add_action( 'wp_enqueue_scripts', 'sistem_digital_starter_enqueue_styles' );

/**
 * Enhancement-ul JavaScript progresiv (accordion, dialog, tabs ș.a.), din
 * pachetul publicat, apelat printr-un import dinamic de modul ES. Fără
 * JavaScript, toate componentele rămân complet funcționale — vezi
 * starters/html/README.md. Un singur <script type="module"> inline, în
 * footer — nu există motiv să înregistrăm modulul ca handle enqueued și
 * să-l mai importăm o dată dinamic peste el.
 */
function sistem_digital_starter_print_enhancements() {
	$relative_path = 'components/index.js';
	$version       = sistem_digital_starter_asset_version( $relative_path );
	if ( null === $version ) {
		return;
	}

	$module_url = SISTEM_DIGITAL_STARTER_VENDOR_URI . '/' . $relative_path . '?ver=' . $version;
	echo '<script type="module">import("' . esc_js( $module_url ) . '").then((m) => m.enhanceInteractiveComponents && m.enhanceInteractiveComponents());</script>' . "\n";
}
add_action( 'wp_footer', 'sistem_digital_starter_print_enhancements' );

/**
 * Afișat doar dacă niciun meniu nu e asignat locației `footer` din
 * Aspect → Meniuri — dispare automat după prima configurare reală.
 */
function sistem_digital_starter_default_footer_links() {
	echo '<ul class="sd-footer__list">';
	echo '<li><a href="https://sistem.digital">Sistem Digital</a></li>';
	echo '<li><a href="https://github.com/ciprian-rus/sistem.digital">' . esc_html__( 'Cod sursă', 'sistem-digital-starter' ) . '</a></li>';
	echo '</ul>';
}
