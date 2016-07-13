
$(document).ready(function(){

    var windowsWidth = $(window).width();
    if (windowsWidth <= 800) {
        $(".mobile-menu__button").click(function(){
            $(".nav-items").toggleClass("active");
        });
        var item= $(".nav-item__inner");
        item.on('click', function(event) {
            event.preventDefault();
            $(this).parent().siblings(".nav-item").find(".dropdown-menu").slideUp(300);
            $(this).next().slideToggle(300);
        });

        $(".dropdown-nest a").on('click', function(event) {
            event.preventDefault();
            $(this).parent().siblings(".dropdown-nest").find("ul").slideUp(300);
            $(this).next().slideToggle(300);
        });
    }
    else{
        $(".nav-item__dropdown").on('click',function(event){
            $(this).siblings(".nav-item__dropdown").find(".dropdown-menu").slideUp(300);
            $(this).find(".dropdown-menu").slideToggle(300);
        })
    }
});