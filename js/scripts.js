(function ($) {
  $(document).ready(function () {
    // Menú móvil
    $("button#menuMore").click(function () {
      $("section.menu-desktop").slideToggle("fast");
    });

    $("button#mobileNav").click(function () {
      $(".col.right").slideToggle("fast");
      var mobileNavButton = $(this);
      var currentIcon = mobileNavButton.find("use").attr("xlink:href");
      if (currentIcon === "#icon-bars") {
        mobileNavButton.find("use").attr("xlink:href", "#icon-times");
      } else {
        mobileNavButton.find("use").attr("xlink:href", "#icon-bars");
      }
    });

    // Slider
    $(".sliderHome").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      prevArrow: $(".prevArrow"),
      nextArrow: $(".nextArrow"),
    });

    // Comments
    $(".comment-notes, .logged-in-as, .comment-form-comment").wrapAll(
      $("<div>").addClass("wrap-left")
    );
    $(
      ".comment-form-author, .comment-form-email, .comment-form-url, .comment-form-cookies-consent, .form-submit"
    ).wrapAll($("<div>").addClass("wrap-right"));

    // Share tooltip
    $(".icon-share").click(function (e) {
      e.stopPropagation();
      $(".social-share").toggleClass("active");
    });

    $(document).click(function (e) {
      if (!$(e.target).closest(".social-share").length) {
        $(".social-share").removeClass("active");
      }
    });
  });
})(jQuery);
