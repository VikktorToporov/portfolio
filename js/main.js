jQuery(function () {
    //check if element is on screen
    jQuery.expr.pseudos.offscreen = function (el) {
        let rect = el.getBoundingClientRect();
        return (
            (rect.x + rect.width) < 0 ||
            (rect.y + rect.height) < 0 ||
            (rect.x > window.innerWidth || rect.y > window.innerHeight)
        );
    };

    //color the header if below landing
    function colorHeader() {
        if ($('#landing').is(':offscreen'))
            $('header').css("background", "rgba(40,55,82,0.94)");
        else
            $('header').css("background", "none");
    }

    colorHeader();
    $(window).on('scroll', function () {
        colorHeader();
    });

    //update animations
    function updateAnimations() {
        //landing
        if (!$('#landing').is(':offscreen'))
            $('#landingText').addClass('animate__lightSpeedInLeft');
        //skills
        if (!$('#skills').is(':offscreen'))
            $('.skill').addClass('animate__zoomInDown');
        //projects
        if (!$('#projects').is(':offscreen'))
            $('#projects').addClass('animate__fadeInUp');
        //past
        if (!$('#pastGrid').is(':offscreen'))
            $('.pastImg').addClass('animate__backInRight');
        if (!$('#pastGrid').is(':offscreen'))
            $('.pastPos').addClass('animate__fadeInLeft');
        if (!$('#pastGrid').is(':offscreen'))
            $('.pastTime').addClass('animate__fadeInUp');
        if (!$('#pastGrid').is(':offscreen'))
            $('.pastInfo').addClass('animate__fadeInRight');
        //story
        if (!$('#storyImg').is(':offscreen'))
            $('#storyImg').addClass('animate__fadeInLeft');
        if (!$('#storyText').is(':offscreen'))
            $('#storyText span, #storyText h2, #storyText div').addClass('animate__fadeInUp');
        //contact
        if (!$('#contactForm').is(':offscreen'))
            $('#contact h1').addClass('animate__headShake');
        if (!$('#contactForm').is(':offscreen'))
            $('#contactFirstFix').addClass('animate__fadeInLeft');
        if (!$('#contactForm').is(':offscreen'))
            $('.contactImg').addClass('animate__backInRight');
    }

    //animate header only once
    if (!$('#landing').is(':offscreen'))
        $('header').addClass('animate__slideInDown');
    //update animations on load
    updateAnimations();
    //update animations on scroll
    document.addEventListener('scroll', function (e) {
        updateAnimations();
    });
    //NAV
    $('#hamburger').on("click", function () {
        $('.mobileNav').addClass('showMobile');
    });
    $('#closeMobile, main, .mobileNav *').on("click", function () {
        $('.mobileNav').removeClass('showMobile');
    });
    //toggle front and back sides of projects
    $('.flip').on("click", function () {
        //show back of clicked el
        $(this).children('.front').toggleClass('frontToggle');
        $(this).children('.back').toggleClass('backToggle').css('z-index', '1');
        //remove back from all others
        $('.front').not($(this).children()).removeClass('frontToggle');
        $('.back').not($(this).children()).removeClass('backToggle');

        //fix to look better
        let thisElBack = $(this).children('.back');
        if (!thisElBack.hasClass('backToggle'))
            setTimeout(function () {
                thisElBack.css('z-index', '-1');
            }, 500);
    });
    //FORM
    $('#contactBtn').on("click", function () {
        $('#contactForm input').css('border-color', '#bdbdbd');
        $('#contactForm textarea').css('border-color', '#bdbdbd');
        let email = $('#contactForm input').val(),
            msg = $('#contactForm textarea').val();
        if (email.length > 100 || email.length < 4) {
            $('#contactForm input').css('border-color', 'red');
            alert("Your email is incorrect.");
        } else {
            if (msg.length > 1000) {
                $('#contactForm textarea').css('border-color', 'red');
                alert("Sorry, the message limit is 1000 characters. You have entered " + msg.length);
            } else if (msg.length < 10) {
                $('#contactForm textarea').css('border-color', 'red');
                alert("Write at least 11 characters...");
            } else {
                //go
                alert('Feature coming soon!');
            }
        }
    });
    //Smooth Scroll
    $("a").on('click', function (event) {
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {

                window.location.hash = hash;
            });
        } // End if
    });
});
