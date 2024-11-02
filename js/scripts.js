// remap jQuery to $
(function ($) {
  $(document).ready(function () {
    $("button#menuMore").click(function () {
      $("section.menu-desktop").slideToggle("fast");
    });

    $("button#mobileNav").click(function () {
      $(".col.right").slideToggle("fast");
      // Cambiar entre los iconos de barras y times
      var mobileNavButton = $(this);
      var currentIcon = mobileNavButton.find("use").attr("xlink:href");

      if (currentIcon === "#icon-bars") {
        mobileNavButton.find("use").attr("xlink:href", "#icon-times");
      } else {
        mobileNavButton.find("use").attr("xlink:href", "#icon-bars");
      }
    });

    // HOME SLIDER
    $(".sliderHome").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      prevArrow: $(".prevArrow"),
      nextArrow: $(".nextArrow"),
    });

    // COMMENTS TRICKS
    $(".comment-notes, .logged-in-as, .comment-form-comment").wrapAll(
      $("<div>").addClass("wrap-left")
    );
    $(
      ".comment-form-author, .comment-form-email, .comment-form-url, .comment-form-cookies-consent, .form-submit"
    ).wrapAll($("<div>").addClass("wrap-right"));
  });

  $(window).scroll(function () {});

  $(window).load(function () {});

  $(window).resize(function () {});
})(window.jQuery);
