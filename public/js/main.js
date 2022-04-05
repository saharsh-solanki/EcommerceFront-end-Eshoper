(function($) {
  "use strict";

  // Dropdown on mouse hover
  $(document).ready(function() {
    function toggleNavbarMethod() {
      if ($(window).width() > 992) {
        $(".navbar .dropdown")
          .on("mouseover", function() {
            $(".dropdown-toggle", this).trigger("click");
          })
          .on("mouseout", function() {
            $(".dropdown-toggle", this)
              .trigger("click")
              .blur();
          });
      } else {
        $(".navbar .dropdown")
          .off("mouseover")
          .off("mouseout");
      }
    }
    toggleNavbarMethod();
    $(window).resize(toggleNavbarMethod);
    // Toggle the side navigation
    $("#sidebarToggle, #sidebarToggleTop").on("click", function(e) {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
      if ($(".sidebar").hasClass("toggled")) {
        $(".sidebar .collapse").collapse("hide");
      }
    });

    // Close any open menu accordions when window is resized below 768px
    $(window).resize(function() {
      if ($(window).width() < 768) {
        $(".sidebar .collapse").collapse("hide");
      }
    });

    // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
    $("body.fixed-nav .sidebar").on("mousewheel DOMMouseScroll wheel", function(
      e
    ) {
      if ($(window).width() > 768) {
        var e0 = e.originalEvent,
          delta = e0.wheelDelta || -e0.detail;
        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
      }
    });

    // Scroll to top button appear
    $(document).on("scroll", function() {
      var scrollDistance = $(this).scrollTop();
      if (scrollDistance > 100) {
        $(".scroll-to-top").fadeIn();
      } else {
        $(".scroll-to-top").fadeOut();
      }
    });

    // Smooth scrolling using jQuery easing
    $(document).on("click", "a.scroll-to-top", function(e) {
      var $anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top,
          },
          1000,
          "easeInOutExpo"
        );
      e.preventDefault();
    });

    //

    $("#dataTable").DataTable();
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function() {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Vendor carousel
  $(".vendor-carousel").owlCarousel({
    loop: true,
    margin: 29,
    nav: false,
    autoplay: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 2,
      },
      576: {
        items: 3,
      },
      768: {
        items: 4,
      },
      992: {
        items: 5,
      },
      1200: {
        items: 6,
      },
    },
  });

  // Related carousel
  $(".related-carousel").owlCarousel({
    loop: true,
    margin: 29,
    nav: false,
    autoplay: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      992: {
        items: 4,
      },
    },
  });

  // Product Quantity
  $(".quantity button").on("click", function() {
    var button = $(this);
    var oldValue = button
      .parent()
      .parent()
      .find("input")
      .val();
    if (button.hasClass("btn-plus")) {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 0;
      }
    }
    button
      .parent()
      .parent()
      .find("input")
      .val(newVal);
  });
})(jQuery);
// Modal Javascript

$(document).ready(function() {
  $("#myBtn").click(function() {
    $(".modal").modal("show");
  });

  $("#modalLong").click(function() {
    $(".modal").modal("show");
  });

  $("#modalScroll").click(function() {
    $(".modal").modal("show");
  });

  $("#modalCenter").click(function() {
    $(".modal").modal("show");
  });
});

// Popover Javascript

$(function() {
  $('[data-toggle="popover"]').popover();
});
$(".popover-dismiss").popover({
  trigger: "focus",
});
