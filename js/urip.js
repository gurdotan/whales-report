$(document).ready(function(){


	$('body')
		.css('overflow', 'hidden')
		.on('mousewheel.landing DOMMouseScroll.landing', function(event) {
			return false;
		});


	/* =========================
	   ScrollReveal
	   (on scroll fade animations)
	============================*/
	var revealConfig = { vFactor: 0.20 }
	window.sr = new scrollReveal(revealConfig);


	/* =========================
	   Detect Mobile Device
	============================*/
	var isMobile = {
	    Android: function() {
	        return navigator.userAgent.match(/Android/i);
	    },
	    BlackBerry: function() {
	        return navigator.userAgent.match(/BlackBerry/i);
	    },
	    iOS: function() {
	        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	    },
	    Opera: function() {
	        return navigator.userAgent.match(/Opera Mini/i);
	    },
	    Windows: function() {
	        return navigator.userAgent.match(/IEMobile/i);
	    },
	    any: function() {
	        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	    }
	};


	/* ===========================
	   jQuery One Page Navigation
	==============================*/
	$('#main-nav').onePageNav({
	    filter: ':not(.external)'
	});


	/* ===========================
	   Custom Smooth Scroll For an Anchor
	==============================*/
	$(function() {
	  $('a.scroll-to[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top - 50
	        }, 1000);
	        return false;
	      }
	    }
	  });
	});


	/* ===========================
	   Headhesive JS
	   (sticky header on scroll)
	==============================*/

	// Set headhesive options
    var options = {
        classes: {
            clone:   'header-clone',
            stick:   'header-stick',
            unstick: 'header-unstick'
        }
    };
	//var headhesive = new Headhesive('.the-header', options);

	// Remove class of the clone header
	// so we can distinguish between the original and the clone header.
	$('.header-clone').removeClass('the-origin-header');


	/* ==========================
	   Progress Bar Animation
	=============================*/
	var skillbar = $('#skillbar').waypoint({
		handler: function() {
			$('.progress-bar').each(function(){
				$(this).animate({
					width:$(this).attr('data-percent')
				},500)
			})
		},
		offset: '150%'
	});


	/* =================================
	   Swipebox JS
	   (Lightbox for Video & Portfolio)
	====================================*/

	// Swipebox Video
	$( '.swipebox-video' ).swipebox();

	// Swipebox Gallery
	$( '.swipebox' ).swipebox();


	/* =================================
	   CounterUp JS
	====================================*/
    $('.counter').counterUp({
	    delay: 10,
	    time: 1000
	});

	/* =================================
	   AjaxChimp JS
	   (Integrate subscribe form w/ Mailchimp)
	====================================*/
	$('.the-subscribe-form').ajaxChimp({
		callback: mailchimpCallback,
	    url: 'http://worksofwisnu.us6.list-manage.com/subscribe/post?u=b57b4e6ae38c92ac22d92a234&amp;id=17754c49aa'
	    // Replace the URL above with your mailchimp URL (put your URL inside '').
	});

	// callback function when the form submitted, show the notification box
	function mailchimpCallback(resp) {
        if (resp.result === 'success') {
            $('#subscribe-success-notification').addClass('show-up');
        }
        else if (resp.result === 'error') {
             $('#subscribe-error-notification').addClass('show-up');
        }
    }


	/* =================================
	   Add Custom Class to Open Toggle Panel
	====================================*/
	$('.panel-heading a').click(function() {

		var clickElement = $(this);

		if (clickElement.parents('.panel-heading').is('.panel-active')) {
			$('.panel-heading').removeClass('panel-active');
		} else {
			$('.panel-heading').removeClass('panel-active');
			clickElement.parents('.panel-heading').addClass('panel-active');
		}
	});


	/* ==================================
	   Quicksand JS
	   (Filter team photo and portfolio)
	=====================================*/

	// Filter team photo
	var $teamClone = $("#team_grid").clone();

	$(".filter a").click(function(e){
		$(".filter li").removeClass("current");

		var $filterClass = $(this).parent().attr("class");

		if ($filterClass == "all") {
			var $filteredTeam = $teamClone.find("li");
		} else {
			var $filteredTeam = $teamClone.find("li[data-type~="+$filterClass+"]");
		}

		$("#team_grid").quicksand( $filteredTeam, {
			easing: "easeOutSine",
			adjustHeight: "dynamic",
			duration: 500,
			useScaling: true
		});

		$(this).parent().addClass("current");

		e.preventDefault();
	})

	// Filter Portfolio Gallery
	var $portfolioClone = $("#portfolio_grid").clone();

	$(".portfolio-filter a").click(function(e){
		$(".portfolio-filter li").removeClass("current");

		var $filterClass = $(this).parent().attr("class");

		if ($filterClass == "all") {
			var $filteredPortfolio = $portfolioClone.find("li");
		} else {
			var $filteredPortfolio = $portfolioClone.find("li[data-type~="+$filterClass+"]");
		}

		$("#portfolio_grid").quicksand( $filteredPortfolio, {
			easing: "easeOutSine",
			adjustHeight: "dynamic",
			duration: 500,
			useScaling: true
		});

		$(this).parent().addClass("current");

		e.preventDefault();
	})

	// Mobile Select Filter
	$("#mobile-team-filter").click(function(){
		$(this).toggleClass("select-active");
		$("ul.filter").toggleClass("filter-active");
	});

	$("#mobile-portfolio-filter").click(function(){
		$(this).toggleClass("select-active");
		$("ul.portfolio-filter").toggleClass("filter-active");
	});


	/* ==================================
	   Contact Overlay
	   (works with multiple buttons)
	=====================================*/
	var triggerBttn = document.querySelectorAll( '.contact-trigger' );

	var	overlay = document.querySelector( 'div.contact-overlay' ),
		closeBttn = overlay.querySelector( 'a.overlay-close' );
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = { transitions : Modernizr.csstransitions };

	function toggleOverlay() {
		if( classie.has( overlay, 'open' ) ) {
			classie.remove( overlay, 'open' );
			classie.add( overlay, 'close' );
			$('body').removeClass('overlay-on');
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( overlay, 'close' );
			};
			if( support.transitions ) {
				overlay.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( overlay, 'close' ) ) {
			$("body").addClass('overlay-on');
			classie.add( overlay, 'open' );
		}
		classie.remove(overlay, 'close');
	}

	var i;
	for (i = 0; i < triggerBttn.length; i++) {
		triggerBttn[i].addEventListener( 'click', toggleOverlay );
	}
	closeBttn.addEventListener( 'click', toggleOverlay );


	/* ==================================
	   Contact Form Validation
	=====================================*/
    $('#submit').click(function(e){

        // Stop form submission & check the validation
        e.preventDefault();

        // Variable declaration
        var error = false;
        var fname = $('#fname').val();
        var email = $('#email').val();
        var subject = $('#subject').val();
        var message = $('#message').val();

     	// Form field validation
        if(fname.length == 0){
            var error = true;
            $('#fname').parent('div').addClass('field-error');
        }else{
            $('#fname').parent('div').removeClass('field-error');
        }
        if(email.length == 0 || email.indexOf('@') == '-1'){
            var error = true;
            $('#email').parent('div').addClass('field-error');
        }else{
            $('#email').parent('div').removeClass('field-error');
        }
        if(subject.length == 0){
            var error = true;
            $('#subject').parent('div').addClass('field-error');
        }else{
            $('#subject').parent('div').removeClass('field-error');
        }
        if(message.length == 0){
            var error = true;
            $('#message').parent('div').addClass('field-error');
        }else{
            $('#message').parent('div').removeClass('field-error');
        }

        if(error == true){
        	$('#error-notification').addClass('show-up');
        }else{
           $('#error-notification').removeClass('show-up');
        }

        if(error == false){
            $.post("contact.php", $("#contact-form").serialize(),function(result){
                if(result == 'sent'){
                    $('#success-notification').addClass('show-up');
                    $('.submit-btn').addClass('disabled');
                }
            });
        }
    });

    /* ==================================
	   Hero Form Validation
	=====================================*/
	$('#hero-submit').click(function(e){

        // Stop form submission & check the validation
        e.preventDefault();

        // Variable declaration
        var error = false;
        var name = $('#hero-name').val();
        var email = $('#hero-email').val();
        var studio = $('#hero-studio').val();
        var dau = $('#hero-dau').val();
        var employees = $('#hero-employees').val();

     	// Form field validation
        if(name.length == 0){
            var error = true;
            $('#hero-name').parent('div').addClass('field-error');
        }else{
            $('#hero-name').parent('div').removeClass('field-error');
        }
        if(email.length == 0 || email.indexOf('@') == '-1'){
            var error = true;
            $('#hero-email').parent('div').addClass('field-error');
        }else{
            $('#hero-email').parent('div').removeClass('field-error');
        }
        if(studio.length == 0){
            var error = true;
            $('#hero-studio').parent('div').addClass('field-error');
        }else{
            $('#hero-studio').parent('div').removeClass('field-error');
        }

        if(dau == ''){
            var error = true;
            $('#hero-dau').parent('div').addClass('field-error');
        }else{
            $('#hero-dau').parent('div').removeClass('field-error');
        }

        if(employees == ''){
            var error = true;
            $('#hero-employees').parent('div').addClass('field-error');
        }else{
            $('#hero-employees').parent('div').removeClass('field-error');
        }
		error = false;
        if(error == true){
        	$('#hero-error-notification').addClass('show-up');
        }else{
           $('#hero-error-notification').removeClass('show-up');
        }

        if(error == false){
					var request = $.Deferred();
					$('.submit-btn').addClass('disabled');
					$('.submit-btn .spinner').removeClass('hide');
					$('.submit-btn .spinner > div').addClass('spinner-active');

					setTimeout(function() {
						$('.submit-btn').removeClass('disabled');
						$('.submit-btn .spinner').addClass('hide');
						$('.submit-btn .spinner > div').removeClass('spinner-active');
						request.resolve();
					}, 1000);

					// TODO: Protect with a minimum of 2 seconds
					request.done(function() {

						// Cancel body scrolling
						$('body').css('overflow', '').off('.landing');

						// TODO: Use Modernizr to find which transition to use
						$('.hero-form-wrapper').one('transitionend', function() {
							$('.hero-form-wrapper').remove();

							$('.hero-success-wrapper').removeClass('hidden');
							$('.hero-success-wrapper')[0].offsetWidth;
							$('.hero-success-wrapper').css('opacity', 1);

						}).addClass('transition-out');

					});

					//$.post("hero-form.php", $("#register-form").serialize(),function(result){
           //     if(result == 'sent'){
           //         $('#hero-success-notification').addClass('show-up');
           //         $('#hero-submit').addClass('disabled');
           //     }
           // });
        }
    });


	// Function to close the Notification
    $('a.notification-close').click(function(){
	    $(this).parent('div').fadeOut(200);
    });


	/* ==========================
	   Custom Popover
	   (for Language Selection)
	=============================*/
    $("[data-toggle=popover]").popover();


	/* ==============================
	   Change Footer Background
	   (when Social Icons hovered)
	=================================*/
	if(!isMobile.any()){
		$(".footer-social .icon-facebook-with-circle").hover(function(){$("#main-footer").toggleClass("footer-facebook-hovered")});
		$(".footer-social .icon-twitter-with-circle").hover(function(){$("#main-footer").toggleClass("footer-twitter-hovered")});
		$(".footer-social .icon-linkedin-with-circle").hover(function(){$("#main-footer").toggleClass("footer-linkedin-hovered")});
		$(".footer-social .icon-instagram-with-circle").hover(function(){$("#main-footer").toggleClass("footer-instagram-hovered")});
		$(".footer-social .icon-google-with-circle").hover(function(){$("#main-footer").toggleClass("footer-google-hovered")});
		$(".footer-social .icon-dribbble-with-circle").hover(function(){$("#main-footer").toggleClass("footer-dribbble-hovered")});
		$(".footer-social .icon-pinterest-with-circle").hover(function(){$("#main-footer").toggleClass("footer-pinterest-hovered")});
		$(".footer-social .icon-vimeo-with-circle").hover(function(){$("#main-footer").toggleClass("footer-vimeo-hovered")});
	}

});



