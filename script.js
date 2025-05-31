$(document).ready(function () {
    $("a").on("click", function (event) {
      if (this.hash !== "") {
        event.preventDefault();
  
        var hash = this.hash;
        $("html, body").animate(
          {
            scrollTop: $(hash).offset().top,
          },
          800,
          function () {
            window.location.hash = hash;
          }
        );
      }
    });
  });
  
  $(".menu-items a").click(function () {
    $("#checkbox").prop("checked", false);
  });
  
  //-- 23 oct 2024 --//
  $(function() {
    // Owl Carousel
    var owl = $(".owl-carousel");
    owl.owlCarousel({
      items: 3,
      margin: 10,
      loop: true,
      nav: true
    });
  });



  jQuery("#carousel").owlCarousel({
    autoplay: true,
    rewind: false, /* use rewind if you don't want loop */
    margin: 20,
    loop: true,
     /*
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    */
    responsiveClass: true,
    autoHeight: true,
    autoplayTimeout: 7000,
    smartSpeed: 800,
    nav: true,
    navText: [
      '<svg width="30" height="30"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>',
      '<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>'],
    responsive: {
      0: {
        items: 1
      },
  
      600: {
        items: 3
      },
  
      1024: {
        items: 4
      },
  
      1366: {
        items: 4
      }
    }
  });  

  
  $(document).ready(function() {
    var bigimage = $("#big");
    var thumbs = $("#thumbs");
    //var totalslides = 10;
    var syncedSecondary = true;
  
    bigimage
      .owlCarousel({
      items: 1,
      slideSpeed: 2000,
      nav: true,
      autoplay: true,
      dots: false,
      loop: true,
      responsiveRefreshRate: 200,
      navText: [
        
      ]
    })
      .on("changed.owl.carousel", syncPosition);
  
    thumbs
      .on("initialized.owl.carousel", function() {
      thumbs
        .find(".owl-item")
        .eq(0)
        .addClass("current");
    })
      .owlCarousel({
      items: 4,
      dots: true,
      nav: true,
      navText: [
        '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
        '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
      ],
      smartSpeed: 200,
      slideSpeed: 500,
      slideBy: 4,
      responsiveRefreshRate: 100
    })
      .on("changed.owl.carousel", syncPosition2);
  
    function syncPosition(el) {
      //if loop is set to false, then you have to uncomment the next line
      //var current = el.item.index;
  
      //to disable loop, comment this block
      var count = el.item.count - 1;
      var current = Math.round(el.item.index - el.item.count / 2 - 0.5);
  
      if (current < 0) {
        current = count;
      }
      if (current > count) {
        current = 0;
      }
      //to this
      thumbs
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
      var onscreen = thumbs.find(".owl-item.active").length - 1;
      var start = thumbs
      .find(".owl-item.active")
      .first()
      .index();
      var end = thumbs
      .find(".owl-item.active")
      .last()
      .index();
  
      if (current > end) {
        thumbs.data("owl.carousel").to(current, 100, true);
      }
      if (current < start) {
        thumbs.data("owl.carousel").to(current - onscreen, 100, true);
      }
    }
  
    function syncPosition2(el) {
      if (syncedSecondary) {
        var number = el.item.index;
        bigimage.data("owl.carousel").to(number, 100, true);
      }
    }
  
    thumbs.on("click", ".owl-item", function(e) {
      e.preventDefault();
      var number = $(this).index();
      bigimage.data("owl.carousel").to(number, 300, true);
    });
  });
  

// Slider configuration
var config = {
  speed: 6000,
  auto: true, // true or false
  arrows: true, // true or false
  nav: true, // true or false
  navStyle: 'default' // square,rectangle, default
};

// Slider core
var slides = $('.slide');
var totalSlides = slides.length;
var currentIndex = 0;

function setSlides() {
  var currentSlide = slides.eq(currentIndex);
  slides.hide();
  currentSlide.fadeIn(1500);
};
setSlides();

// autoplay
if (config.auto) {
  var autoSlide = setInterval(function() {
    currentIndex += 1;
    if (currentIndex > totalSlides - 1) {
      currentIndex = 0;
    }
    setSlides();
    navigation();
  }, config.speed);
};

// navigation arrows
if (config.arrows) {
  $('.arrow').addClass('active');
  $('.prev').click(function() {
    clearInterval(autoSlide);
    currentIndex -= 1;
    if (currentIndex < 0) {
      currentIndex = totalSlides - 1;
    }
    navigation();
    setSlides();
  });
  $('.next').click(function() {
    clearInterval(autoSlide);
    currentIndex += 1;
    if (currentIndex > totalSlides - 1) {
      currentIndex = 0;
    }
    navigation();
    setSlides();
  });
};

// navigation
if (config.nav) {
	for (i = 0; i < slides.length; i+=1) {
  	$('<li/>').attr( {'class': 'nav-item','id': i}).appendTo('.slide-nav');
	};
  $('.nav-item').first().addClass('item-active');
  switch(config.navStyle) { // navigation style
    case 'square':
        $('.nav-item').addClass('square');
        break;
    case 'rectangle':
        $('.nav-item').addClass('rectangle');
        break;
    default:
        $('.nav-item').addClass('dot');
  };
  function navigation() {
    $('.nav-item').removeClass('item-active');
    $('.nav-item').eq(currentIndex).addClass('item-active');
  };
	$('.nav-item').click(function() {
  	clearInterval(autoSlide);
  	var navNumb =  $(this).attr('id');
  	currentIndex = navNumb;
  	navigation();
  	setSlides();
  });
};

$(".custom-carousel").owlCarousel({
  autoWidth: true,
  loop: true
});
$(document).ready(function () {
  $(".custom-carousel .item").click(function () {
    $(".custom-carousel .item").not($(this)).removeClass("active");
    $(this).toggleClass("active");
  });
});

function showPopup() {
  const overlay = document.getElementById("overlay");
  const popup = document.getElementById("popup");
  overlay.style.display = "block";
  setTimeout(() => {
    popup.classList.add("active");
  }, 10);
}

function hidePopup() {
  const overlay = document.getElementById("overlay");
  const popup = document.getElementById("popup");
  popup.classList.remove("active");
  setTimeout(() => {
    overlay.style.display = "none";
  }, 300);
}

function handleSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  // Here you would typically send the data to your server
  console.log("Form submitted:", { name, email });

  // Show success message (in production, you'd want to wait for server response)
  alert(
    "Thank you for subscribing! Your discount code will be sent to your email."
  );
  hidePopup();
}

// Optional: Show popup after X seconds
// setTimeout(showPopup, 5000);

/**.tab */

 // tabbed content
    // http://www.entheosweb.com/tutorials/css/tabs.asp
    $(".tab_content").hide();
    $(".tab_content:first").show();

  /* if in tab mode */
    $("ul.tabs li").click(function() {
		
      $(".tab_content").hide();
      var activeTab = $(this).attr("rel"); 
      $("#"+activeTab).fadeIn();		
		
      $("ul.tabs li").removeClass("active");
      $(this).addClass("active");

	  $(".tab_drawer_heading").removeClass("d_active");
	  $(".tab_drawer_heading[rel^='"+activeTab+"']").addClass("d_active");
	  
    /*$(".tabs").css("margin-top", function(){ 
       return ($(".tab_container").outerHeight() - $(".tabs").outerHeight() ) / 2;
    });*/
    });
    $(".tab_container").css("min-height", function(){ 
      return $(".tabs").outerHeight() + 50;
    });
	/* if in drawer mode */
	$(".tab_drawer_heading").click(function() {
      
      $(".tab_content").hide();
      var d_activeTab = $(this).attr("rel"); 
      $("#"+d_activeTab).fadeIn();
	  
	  $(".tab_drawer_heading").removeClass("d_active");
      $(this).addClass("d_active");
	  
	  $("ul.tabs li").removeClass("active");
	  $("ul.tabs li[rel^='"+d_activeTab+"']").addClass("active");
    });
	
	
    $('.owl-carousel').owlCarousel({
      loop:false,
    stagePadding: 15,
      margin:10,
      nav:true,
    navText : ['<span class="uk-margin-small-right uk-icon" uk-icon="icon: chevron-left"></span>','<span class="uk-margin-small-left uk-icon" uk-icon="icon: chevron-right"></span>'],
      responsive:{
          0:{
              items:1
          },
          300:{
            items:2
        },
        0:{
          items:1
      },
          450:{
              items:3
          },
        960:{
              items:4
          },
          1200:{
              items:5
          }
      }
  })
  
$(document).ready(function(){ 
  $(window).scroll(function(){ 
      if ($(this).scrollTop() > 100) { 
          $('#scroll').fadeIn(); 
      } else { 
          $('#scroll').fadeOut(); 
      } 
  }); 
  $('#scroll').click(function(){ 
      $("html, body").animate({ scrollTop: 0 }, 600); 
      return false; 
  }); 
});
$(".hover").mouseleave(
  function () {
    $(this).removeClass("hover");
  }
);


$(document).ready(function () {
  var itemsMainDiv = ('.MultiCarousel');
  var itemsDiv = ('.MultiCarousel-inner');
  var itemWidth = "";

  $('.leftLst, .rightLst').click(function () {
      var condition = $(this).hasClass("leftLst");
      if (condition)
          click(0, this);
      else
          click(1, this)
  });

 ResCarouselSize();




  $(window).resize(function () {
      ResCarouselSize();
  });

  //this function define the size of the items
  function ResCarouselSize() {
      var incno = 0;
      var dataItems = ("data-items");
      var itemClass = ('.item');
      var id = 0;
      var btnParentSb = '';
      var itemsSplit = '';
      var sampwidth = $(itemsMainDiv).width();
      var bodyWidth = $('body').width();
      $(itemsDiv).each(function () {
          id = id + 1;
          var itemNumbers = $(this).find(itemClass).length;
          btnParentSb = $(this).parent().attr(dataItems);
          itemsSplit = btnParentSb.split(',');
          $(this).parent().attr("id", "MultiCarousel" + id);


          if (bodyWidth >= 1200) {
              incno = itemsSplit[3];
              itemWidth = sampwidth / incno;
          }
          else if (bodyWidth >= 992) {
              incno = itemsSplit[2];
              itemWidth = sampwidth / incno;
          }
          else if (bodyWidth >= 768) {
              incno = itemsSplit[1];
              itemWidth = sampwidth / incno;
          }
          else {
              incno = itemsSplit[0];
              itemWidth = sampwidth / incno;
          }
          $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
          $(this).find(itemClass).each(function () {
              $(this).outerWidth(itemWidth);
          });

          $(".leftLst").addClass("over");
          $(".rightLst").removeClass("over");

      });
  }


  //this function used to move the items
  function ResCarousel(e, el, s) {
      var leftBtn = ('.leftLst');
      var rightBtn = ('.rightLst');
      var translateXval = '';
      var divStyle = $(el + ' ' + itemsDiv).css('transform');
      var values = divStyle.match(/-?[\d\.]+/g);
      var xds = Math.abs(values[4]);
      if (e == 0) {
          translateXval = parseInt(xds) - parseInt(itemWidth * s);
          $(el + ' ' + rightBtn).removeClass("over");

          if (translateXval <= itemWidth / 2) {
              translateXval = 0;
              $(el + ' ' + leftBtn).addClass("over");
          }
      }
      else if (e == 1) {
          var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
          translateXval = parseInt(xds) + parseInt(itemWidth * s);
          $(el + ' ' + leftBtn).removeClass("over");

          if (translateXval >= itemsCondition - itemWidth / 2) {
              translateXval = itemsCondition;
              $(el + ' ' + rightBtn).addClass("over");
          }
      }
      $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
  }

  //It is used to get some elements from btn
  function click(ell, ee) {
      var Parent = "#" + $(ee).parent().attr("id");
      var slide = $(Parent).attr("data-slide");
      ResCarousel(ell, Parent, slide);
  }

});
const tabList = document.querySelector(".tab-list");
const tabItems = tabList.querySelectorAll("li");
const firstTabListItem = tabList.querySelector("li:first-child");
const lastTabListItem = tabList.querySelector("li:last-child");
const tabLinks = tabList.querySelectorAll("a");
const tabPanelsList = document.querySelector(".tab-panels");
const tabPanels = tabPanelsList.querySelectorAll("li");
const mqSm = window.matchMedia("(max-width: 700px)");
const mqLg = window.matchMedia("(min-width: 701px)");
const ACTIVE_CLASS = "active";

for (const tabLink of tabLinks) {
  tabLink.addEventListener("click", function (e) {
    e.preventDefault();
    tabList.querySelector(`li.${ACTIVE_CLASS}`).classList.remove(ACTIVE_CLASS);
    tabPanelsList
      .querySelector(`li.${ACTIVE_CLASS}`)
      .classList.remove(ACTIVE_CLASS);

    const parent = tabLink.parentElement;
    let parentIndex = Array.from(tabItems).indexOf(parent);
    parent.classList.add(ACTIVE_CLASS);
    tabPanelsList
      .querySelector(`li:nth-child(${++parentIndex})`)
      .classList.add(ACTIVE_CLASS);
  });
}

// keyboard navigation
tabList.addEventListener("keyup", function (e) {
  const activeTabListItem = tabList.querySelector(`li.${ACTIVE_CLASS}`);

  if (
    e.key === "ArrowUp" ||
    e.key === "ArrowDown" ||
    e.key === "ArrowLeft" ||
    e.key === "ArrowRight"
  ) {
    if (
      (mqSm.matches && (e.key === "ArrowUp" || e.key === "ArrowDown")) ||
      (mqLg.matches && (e.key === "ArrowLeft" || e.key === "ArrowRight"))
    ) {
      return;
    }

    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      const prevActiveTabListItem = activeTabListItem.previousElementSibling
        ? activeTabListItem.previousElementSibling
        : lastTabListItem;
      prevActiveTabListItem.querySelector("a").click();
    } else {
      const nextActiveTabListItem = activeTabListItem.nextElementSibling
        ? activeTabListItem.nextElementSibling
        : firstTabListItem;
      nextActiveTabListItem.querySelector("a").click();
    }
  }
});


$.fn.jQuerySimpleCounter = function( options ) {
  var settings = $.extend({
      start:  0,
      end:    100,
      easing: 'swing',
      duration: 400,
      complete: ''
  }, options );

  var thisElement = $(this);

  $({count: settings.start}).animate({count: settings.end}, {
  duration: settings.duration,
  easing: settings.easing,
  step: function() {
    var mathCount = Math.ceil(this.count);
    thisElement.text(mathCount);
  },
  complete: settings.complete
});
};


$('#number1').jQuerySimpleCounter({end: 12,duration: 3000});
$('#number2').jQuerySimpleCounter({end: 55,duration: 3000});
$('#number3').jQuerySimpleCounter({end: 359,duration: 2000});
$('#number4').jQuerySimpleCounter({end: 246,duration: 2500});






