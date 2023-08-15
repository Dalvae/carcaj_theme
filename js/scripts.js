// remap jQuery to $
(function($) {

    $(document).ready(function() {

        $("button#menuMore").click(function() {
            $("section.menu-desktop").slideToggle("fast", function() {});
            $("button#menuMore").find('i').toggleClass('fa-bars fa-times');
        });

        $("button#mobileNav").click(function() {
            $(".col.right").slideToggle("fast", function() {});
            $("button#mobileNav").find('i').toggleClass('fa-bars fa-times');
        });

        // HOME SLIDER
        $('.sliderHome').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            prevArrow: $('.prevArrow'),
            nextArrow: $('.nextArrow'),
        });


        // COMMENTS TRICKS

        $('.comment-notes, .logged-in-as, .comment-form-comment').wrapAll($('<div>').addClass('wrap-left'));

        $('.comment-form-author, .comment-form-email, .comment-form-url, .comment-form-cookies-consent, .form-submit').wrapAll($('<div>').addClass('wrap-right'));
        

    });

    $(window).scroll(function() {

    });

    $(window).load(function() {

    });

    $(window).resize(function() {

    });

})(window.jQuery);