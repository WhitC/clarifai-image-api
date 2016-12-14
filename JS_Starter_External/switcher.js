// function elevatePic() {
//   $("#img_preview").elevateZoom();
// }

$(document).ready(function() {
  var $imgPreview = $("#img_preview");

  $imgPreview.on("load", function() {
    $imgPreview.elevateZoom();
  });

  $(".firsttitle").on("click", function() {
      window.location.reload();
  });
});
