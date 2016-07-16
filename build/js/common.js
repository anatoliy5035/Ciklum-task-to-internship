$(document).ready(function () {

    //show,hide mobile menu

    $(".mobile-menu__button").click(function () {
        $(".nav-items").toggleClass("active");
    });

    //run script when window size <899px

    var windowsWidth = $(window).width();
    if (windowsWidth <= 899) {

    //mobile menu

    var item = $(".nav-item__inner");

    item.on('click', function (event) {
        event.preventDefault();
        $(this).parent()
            .siblings(".nav-item")
            .find(".dropdown-menu")
            .slideUp(300);
        $(this)
            .next()
            .slideToggle(300);
        });

    $(".dropdown-nest a").on('click', function (event) {
        event.preventDefault();
        $(this).parent()
            .siblings(".dropdown-nest")
            .find("ul")
            .slideUp(300);
        $(this).next().slideToggle(300);
        });

    //mobile search show,hide

    $(".mobile-search").on('click', function () {
        $(this).toggleClass("active");
        $(".search-panel-mobile").toggleClass("active");
        })
    }

    //run footer navigation when window size < 667px

    if (windowsWidth <= 667) {
        $(".footer-nav-title").on("click", function () {
            $(this).toggleClass("active");
            $(this).siblings(".footer-nav-list")
                .slideToggle(150);
        })
    }

    //on desctop menu equally size parent and child menu

    else {
        $(".nav-item__dropdown").on('click', function () {
            $(this).siblings(".nav-item__dropdown")
                .find(".dropdown-menu")
                .slideUp(300);
            $(this).find(".dropdown-menu").slideToggle(300);
        });
        $(".dropdown-nest").mouseenter(function () {
            var heightChildBlock = $(this).parent()
                .innerHeight();
            var heightParentBlock = $(this).find("ul")
                .innerHeight();
            if (heightParentBlock > heightChildBlock) {
                $(this).parent().innerHeight(+heightParentBlock);
            }
            else {
                $(this).find("ul").innerHeight(+heightChildBlock);
            }
        }).mouseleave(function () {
            $(this).parent().css("height", "auto");
        });
    }

    //subscribtions panel logic

    $(".subscription__form input").keypress(function () {
        $(this).siblings("label").css("display", "none");
    }).focusout(function () {
        if (!$(this).val()) {
            $(this).siblings("label").css({"display": "block", "opacity": "1"});
        }
    }).click(function () {
        $(this).siblings("label").css("opacity", "0.5");
    });

    //Jquery validation initialization

    $(".subscription__form").validate();
    $.validator.messages.required = '';
    $.validator.messages.email = '';

    // reload page on windows for reset active classes

    if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
        $(window).on("resize", function () {
            location.reload(true);
        });
    }
});