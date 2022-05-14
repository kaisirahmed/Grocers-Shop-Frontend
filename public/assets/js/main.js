$(document).ready(function (i) {
    "use strict";
    var e;
    i.noConflict();
    for (
        var l = function () {},
            o = [
                "assert",
                "clear",
                "count",
                "debug",
                "dir",
                "dirxml",
                "error",
                "exception",
                "group",
                "groupCollapsed",
                "groupEnd",
                "info",
                "log",
                "markTimeline",
                "profile",
                "profileEnd",
                "table",
                "time",
                "timeEnd",
                "timeline",
                "timelineEnd",
                "timeStamp",
                "trace",
                "warn",
            ],
            s = o.length,
            t = (window.console = window.console || {});
        s--;

    )
        t[(e = o[s])] || (t[e] = l);
    i(window).scroll(function () {
        0 < i(this).scrollTop() ? i(".header").addClass("sticky") : i(".header").removeClass("sticky");
    }),
        i(".slide-right_cart").click(function (e) {
            e.preventDefault(), i("body").toggleClass("sidebar_right_js_open");
        }),
        i(".sidebar_right_close").click(function (e) {
            e.preventDefault(), i("body").toggleClass("sidebar_right_js_open");
        }),
        i(".sidebar_right_cart").click(function (e) {
            e.preventDefault(), i("body").toggleClass("sidebar_right_js_open");
        }),
        i("#sidebarCollapse , #menuOpen").on("click", function (e) {
            e.preventDefault(), i("nav").toggleClass("active");
        }),
        i(".sidebar li").on("click", function (e) {
            i(this).toggleClass("selected"), i(this).find("> ul").slideToggle(), i(this).siblings("li").children("ul").slideUp(), e.stopPropagation();
        }),
        i(function () {
            i(".sidebar li.selected").find(">ul").slideToggle(),
                i(".sidebar li.selected").siblings("li").children("ul").slideUp(),
                 // for level three 
                 i(".level_three_active").parents("li").addClass("sub_category_active active_bg_color"),
                 i(".level_three_active").parents("third_level").addClass("willDisplay"),

                i(".sub_category_active").parents(".sub_class").addClass("willDisplay"),
                i(".sub_category_active").find(">ul").addClass("willDisplay"),
                i(".sub_category_active").parents("li").removeClass("selected"),

                // level two will open 
                i(".initially_selected").find(">ul").addClass("willDisplay");
        }),
        i(".common-popoup-js").magnificPopup({ type: "inline", fixedContentPos: !1, fixedBgPos: !0, overflowY: "auto", closeBtnInside: !0, preloader: !1, midClick: !0, removalDelay: 300, mainClass: "my-mfp-zoom-in" }),
        i("input[name='payment-method']").click(function (e) {
            i(".payment-method .pay-box").hide(), i(this).parent(".payment-method").find(".pay-box").slideDown("100");
        }),
        i("#product_zoom").elevateZoom({ gallery: "product_small", zoomType: "inner", cursor: "crosshair", easing: !0, lensSize: 200, galleryActiveClass: "active" });
});
