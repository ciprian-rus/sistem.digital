<?php
/**
 * Pagina de pornire — conținut demonstrativ, static. Într-un site real,
 * înlocuiește secțiunile de mai jos cu the_content() sau blocuri reale,
 * editate din Aspect → Editor sau din pagina statică asignată ca pornire.
 */

get_header();
?>

<div style="max-width: 42rem; margin: 3rem auto; padding: 0 1rem">
	<h1><?php esc_html_e( 'Întrebări frecvente', 'sistem-digital-starter' ); ?></h1>

	<section class="sd-alert sd-alert--info" aria-labelledby="starter-info">
		<div class="sd-alert__content">
			<strong class="sd-alert__title" id="starter-info"><?php esc_html_e( 'Acesta este un exemplu', 'sistem-digital-starter' ); ?></strong>
			<p><?php esc_html_e( 'Conținutul de mai jos e static — înlocuiește-l cu întrebările reale ale serviciului tău.', 'sistem-digital-starter' ); ?></p>
		</div>
	</section>

	<div class="sd-accordion" data-sd-accordion="single">
		<details open>
			<summary><?php esc_html_e( 'Cine poate depune o cerere?', 'sistem-digital-starter' ); ?></summary>
			<div class="sd-accordion__content">
				<p><?php esc_html_e( 'Persoana vizată sau reprezentantul ei legal.', 'sistem-digital-starter' ); ?></p>
			</div>
		</details>
		<details>
			<summary><?php esc_html_e( 'Cât durează procesarea?', 'sistem-digital-starter' ); ?></summary>
			<div class="sd-accordion__content">
				<p><?php esc_html_e( 'De obicei două zile lucrătoare.', 'sistem-digital-starter' ); ?></p>
			</div>
		</details>
	</div>

	<?php if ( have_posts() ) : ?>
		<?php
		while ( have_posts() ) :
			the_post();
			the_content();
		endwhile;
	endif;
	?>

	<h2><?php esc_html_e( 'Trimite o întrebare', 'sistem-digital-starter' ); ?></h2>

	<form>
		<div class="sd-form-group">
			<label class="sd-label" for="starter-name"><?php esc_html_e( 'Nume complet', 'sistem-digital-starter' ); ?></label>
			<input class="sd-input" id="starter-name" name="name" autocomplete="name">
		</div>

		<div class="sd-form-group">
			<label class="sd-label" for="starter-email"><?php esc_html_e( 'Adresă de e-mail', 'sistem-digital-starter' ); ?></label>
			<input class="sd-input" id="starter-email" name="email" type="email" autocomplete="email">
		</div>

		<fieldset class="sd-fieldset">
			<legend class="sd-legend"><?php esc_html_e( 'Cum preferi să primești răspunsul?', 'sistem-digital-starter' ); ?></legend>
			<label class="sd-choice">
				<input type="radio" name="delivery" value="digital" checked>
				<?php esc_html_e( 'Digital, pe e-mail', 'sistem-digital-starter' ); ?>
			</label>
			<label class="sd-choice">
				<input type="radio" name="delivery" value="hartie">
				<?php esc_html_e( 'Prin poștă, pe hârtie', 'sistem-digital-starter' ); ?>
			</label>
		</fieldset>

		<button class="sd-button sd-button--primary" type="submit"><?php esc_html_e( 'Trimite întrebarea', 'sistem-digital-starter' ); ?></button>
	</form>
</div>

<?php
get_footer();
