<?php
/**
 * Regenerează theme/screenshot.png — o previzualizare schematică minimală,
 * cerută de WordPress pentru selectorul de teme din wp-admin. Nu e o
 * captură reală (nu există un WordPress viu în acest mediu de dezvoltare —
 * vezi README.md), doar o schiță fidelă paletei de culori Sistem Digital.
 *
 * Rulare: php scripts/generate-screenshot.php
 */

$width  = 1200;
$height = 900;
$image  = imagecreatetruecolor( $width, $height );

$page      = imagecolorallocate( $image, 0xf7, 0xf9, 0xfb );
$navy      = imagecolorallocate( $image, 0x00, 0x2a, 0x59 );
$blue      = imagecolorallocate( $image, 0x1d, 0x4e, 0xd8 );
$white     = imagecolorallocate( $image, 0xff, 0xff, 0xff );
$border    = imagecolorallocate( $image, 0xd1, 0xd5, 0xdb );
$textMuted = imagecolorallocate( $image, 0x6b, 0x72, 0x80 );

imagefilledrectangle( $image, 0, 0, $width, $height, $page );

// Official banner
imagefilledrectangle( $image, 0, 0, $width, 40, $white );
imagerectangle( $image, 0, 0, $width, 40, $border );

// Institution header
imagefilledrectangle( $image, 0, 40, $width, 140, $navy );
imagefilledellipse( $image, 60, 90, 44, 44, $white );
imagestring( $image, 5, 42, 82, 'SD', $navy );
imagestring( $image, 4, 100, 70, 'Institutia exemplu', $white );
imagestring( $image, 3, 100, 92, 'Serviciu digital', $white );

// Nav bar
imagefilledrectangle( $image, 0, 140, $width, 180, $navy );
imagestring( $image, 3, 30, 152, 'Servicii', $white );
imagestring( $image, 3, 140, 152, 'Despre institutie', $white );
imagestring( $image, 3, 320, 152, 'Contact', $white );

// Content column
$contentLeft  = 90;
$contentRight = 700;
imagestring( $image, 5, $contentLeft, 220, 'Intrebari frecvente', $navy );

imagefilledrectangle( $image, $contentLeft, 260, $contentRight, 340, $white );
imagerectangle( $image, $contentLeft, 260, $contentRight, 340, $blue );
imagestring( $image, 3, $contentLeft + 15, 275, 'Acesta este un exemplu', $blue );

imagefilledrectangle( $image, $contentLeft, 360, $contentRight, 410, $white );
imagerectangle( $image, $contentLeft, 360, $contentRight, 410, $border );
imagestring( $image, 3, $contentLeft + 15, 378, 'Cine poate depune o cerere?', $navy );

imagefilledrectangle( $image, $contentLeft, 420, $contentRight, 470, $white );
imagerectangle( $image, $contentLeft, 420, $contentRight, 470, $border );
imagestring( $image, 3, $contentLeft + 15, 438, 'Cat dureaza procesarea?', $navy );

// Form mock
imagestring( $image, 4, $contentLeft, 510, 'Trimite o intrebare', $navy );
imagefilledrectangle( $image, $contentLeft, 545, $contentRight, 580, $white );
imagerectangle( $image, $contentLeft, 545, $contentRight, 580, $border );
imagefilledrectangle( $image, $contentLeft, 600, $contentRight, 635, $white );
imagerectangle( $image, $contentLeft, 600, $contentRight, 635, $border );
imagefilledrectangle( $image, $contentLeft, 660, $contentLeft + 180, 695, $blue );
imagestring( $image, 3, $contentLeft + 20, 670, 'Trimite intrebarea', $white );

// Sidebar note
imagestring( $image, 3, 760, 260, 'Randat cu pachetele publicate', $textMuted );
imagestring( $image, 3, 760, 280, '@sistem-digital/tokens si', $textMuted );
imagestring( $image, 3, 760, 300, '@sistem-digital/components', $textMuted );

// Footer
imagefilledrectangle( $image, 0, $height - 100, $width, $height, $white );
imageline( $image, 0, $height - 100, $width, $height - 100, $blue );
imagestring( $image, 3, 30, $height - 70, 'Institutia exemplu', $navy );
imagestring( $image, 2, 30, $height - 50, 'Servicii digitale publice, construite cu Sistem Digital.', $textMuted );

$targetPath = __DIR__ . '/../theme/screenshot.png';
imagepng( $image, $targetPath );
imagedestroy( $image );

echo "Scris $targetPath\n";
