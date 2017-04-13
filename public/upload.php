<?php
if ($_FILES) {

    $file = $_FILES['fileToUpload']['tmp_name'];

    $image_path = './upload/image.jpg';

    $img = imagecreatefromjpeg( $file );

    $img_x = imagesx($img);
    $img_y = imagesy($img);

    $ellipse_width = 250;
    $ellipse_height = 250;

    $ellipse_cx = ($ellipse_width / 2);
    $ellipse_cy = ($ellipse_height / 2);


    // choose a color for the ellipse
    $red = ImageColorAllocate($img, 255, 62, 0);
    //ImageFillToBorder($img, 0, 0, $white, $white);

    // draw the white ellipse
    imageellipse($img, $img_x / 2, $img_y / 2, $ellipse_width, $ellipse_height, $red);

    // output the picture
    header("Content-type: image/jpeg");
    imagejpeg($img , $image_path);

    imagedestroy($img);

    echo ($img ? 'true' : 'false');

}







