(function ($) {
  "use strict";

  var windowOn = $(window);

      
    // dropdown icon for mobile
    var header__navigation = $('.mobile-menu-active > ul');
    header__navigation.each(function () {
        var _that = $(this);
        var _sub_menu = _that.find('.sub-menu');
        var a = _that.find('li.has-dropdown  > a');
        a.after('<a class="menu-btn-more" href="#">+</a>');
        var span = _that.find('li.has-dropdown  > .menu-btn-more');
        span.click(function (e) {
            e.preventDefault();
            $(this).next().slideToggle();
        });
    });
    
     // mobile menu 
     var tpMenuWrap = $('.mobile-menu-active > ul').clone();
     var tpSideMenu = $('.offcanvas-menu nav');

     if (tpSideMenu.children('ul').length === 0) {
       tpSideMenu.append(tpMenuWrap);
     }
     if ($(tpSideMenu).find('.sub-menu').length != 0) {
       $(tpSideMenu).find('.sub-menu').parent().append('<button class="menu-close"><i class="fas fa-chevron-right"></i></button>');
     }
 
     var sideMenuList = $('.offcanvas-menu nav > ul > li button.menu-close, .offcanvas-menu nav > ul li.has-dropdown > a');
     $(sideMenuList).on('click', function (e) {
       console.log(e);
       e.preventDefault();
       if (!($(this).parent().hasClass('active'))) {
         $(this).parent().addClass('active');
         $(this).siblings('.sub-menu').slideDown();
       } else {
         $(this).siblings('.sub-menu').slideUp();
         $(this).parent().removeClass('active');
       }
     });
  
//  Counter up
  $('.counter').counterUp({
    delay: 10,
    time: 1000
  });


  /* ----------------------------------------------------------- */
  /*  Fixed header
  /* ----------------------------------------------------------- */

   // sticky js 
   windowOn.on('scroll', function () {
    var scroll = windowOn.scrollTop();
    if (scroll < 100) {
      $("#menu-header-sticky").removeClass("header-sticky");
    } else {
      $("#menu-header-sticky").addClass("header-sticky");
    }
  });

  
  // One page Nav

  $(document).on('ready', function () {
    $(".navbar-nav a,.js-scroll-trigger").on('click', function (event) {
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function () {
          window.location.hash = hash;
        });
      } // End if

    });
  });

    //  Back to top===================
    
    var calcScrollValue = function () {
      let scrollProgress = document.getElementById("progress");
      let progressValue = document.getElementById("progress-value");
    
      let pos = document.documentElement.scrollTop;
    
      let calcHeight =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
    
      let scrollValue = Math.round((pos * 100) / calcHeight);
    
      if (pos > 100) {
          scrollProgress.style.display = "grid";
      } else {
          scrollProgress.style.display = "none";
      }
      scrollProgress.addEventListener("click", () => {
          document.documentElement.scrollTop = 0;
      });
      scrollProgress.style.background = `conic-gradient(#9490e3 ${scrollValue}%, #FFF ${scrollValue}%)`;
    };
    
    window.onscroll = calcScrollValue;
    window.onload = calcScrollValue;
    



    // offcanvas bar 
    $(".header-offcanvas-toogle").on('click', function(){
      $(".offcanvas").addClass("header-offcanvas-open");
      $(".header-offcanvas-overlay").addClass("header-offcanvas-overlay-open");
    });
    $(".offcanvas-close-toggle,.header-offcanvas-overlay").on('click', function(){
      $(".offcanvas").removeClass("header-offcanvas-open");
      $(".header-offcanvas-overlay").removeClass("header-offcanvas-overlay-open");
    });
    $(".offcanvas-menu a[href^='#']").on('click', function(e){
      var targetHash = $(this).attr('href');
      var target = $(targetHash);

      if (target.length) {
        e.preventDefault();

        $(".offcanvas").removeClass("header-offcanvas-open");
        $(".header-offcanvas-overlay").removeClass("header-offcanvas-overlay-open");

        $('html, body').animate({
          scrollTop: target.offset().top
        }, 450);

        if (window.history && window.history.pushState) {
          var cleanPath = window.location.pathname.replace(/index\.html$/, '');
          window.history.pushState(null, '', cleanPath + targetHash);
        } else {
          window.location.hash = targetHash;
        }
      }
    });

      // // preloader 
      windowOn.on('load',function() {
        $("#loading").fadeOut(500);
      })
  

    // Testimonial Slider
  $('.testimonials-slides').owlCarousel({
    loop: true,
    dots: true,
    nav: false,
    center: true,
    autoplayHoverPause: true,
    autoplay: true,
    autoplayTimeout: 6000,
    responsiveClass: true,
    margin: 10,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 1
      },
      768: {
        items: 1
      },
      1000: {
        items: 1
      },
      1200: {
        items: 3
      }
    }
  });

  function toggleIcon(e) {
    $(e.target).prev('.panel-heading').find(".more-less").toggleClass('fa-minus fa-plus');
  }

  $('.panel-group').on('hidden.bs.collapse', toggleIcon);
  $('.panel-group').on('shown.bs.collapse', toggleIcon);


  /* ---------------------------------------------
         Contact Form
  --------------------------------------------- */

  var form = $('.contact__form'),
      message = $('.contact__msg'),
      form_data; // Success function

  function done_func(response) {
    message.fadeIn().removeClass('alert-danger').addClass('alert-success');
    message.text(response);
    setTimeout(function () {
      message.fadeOut();
    }, 2000);
    form.find('input:not([type="submit"]), textarea').val('');
  } // fail function


  function fail_func(data) {
    message.fadeIn().removeClass('alert-success').addClass('alert-success');
    message.text(data.responseText);
    setTimeout(function () {
      message.fadeOut();
    }, 2000);
  }

  form.submit(function (e) {
    e.preventDefault();
    form_data = $(this).serialize();
    $.ajax({
      type: 'POST',
      url: form.attr('action'),
      data: form_data
    }).done(done_func).fail(fail_func);
  });

  
})(jQuery);
