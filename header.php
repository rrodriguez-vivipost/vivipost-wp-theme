<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package gestalabs-wp-theme
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'gestalabs-wp-theme' ); ?></a>

	<header id="masthead" class="site-header">
		<div class="site-branding">
			<?php
				$logo_url = wp_get_attachment_image_src( get_theme_mod( 'custom_logo' ) , 'full', false );
			if ( is_front_page() && is_home() ) : ?>
				<h1 class="site-title">
					<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
						<img class="custom-logo" src="<?= esc_url($logo_url[0]) ?>" alt="<?= bloginfo( 'name' ); ?>">
					</a>
				</h1>
				<?php
			else : ?>
				<p class="site-title">
					<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
						<img class="custom-logo" src="<?= esc_url($logo_url[0]) ?>" alt="<?= bloginfo( 'name' ); ?>">
					</a>
				</p>
			<?php endif; ?>
			
		</div><!-- .site-branding -->

	</header><!-- #masthead -->

	<div id="content" class="site-content">
