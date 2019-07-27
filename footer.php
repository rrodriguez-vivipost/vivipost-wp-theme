<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package gestalabs-wp-theme
 */

?>
		</div><!-- #content -->

		<footer id="colophon" class="site-footer">
			<div class="flex-column container">
				<h4>Vivipost</h4>
				<div class="footer-row flex flex-row">
					<div class="col-2 footer-address footer-address-one">
						<?php if( get_theme_mod( 'footer-address-one' ) ) {
							echo nl2br(get_theme_mod( 'footer-address-one' ));
						} ?>
					</div>
					<div class="col-4">
						<?php wp_nav_menu(array('theme_location' => 'footer-menu', 'menu_id' => 'footer-menu')); ?>
					</div>
					<div class="flex-1"></div>
					<div class="col-3">
						<?php wp_nav_menu(array('theme_location' => 'social-menu', 'menu_id' => 'social-menu' )); ?>
					</div>
				</div>
			</div>
		</footer><!-- #colophon -->
	</div><!-- #page -->

	<?php wp_footer(); ?>

	</body>
</html>
