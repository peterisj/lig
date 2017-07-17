$(document).ready(function() {
    var $document = $(document),
        $window = $(window),
        $htmlBody = $('html, body'),
        $arrowToTop = $('.js-return-top'),
        $formInput = $('.js-check-input'),
        $formInfo = $('.js-form-message'),
        $section = $('.js-section');

    $('#fullpage').fullpage({
        menu: '#nav',
        lockAnchors: false,
        anchors:['about-us', 'activities', 'participation', 'team', 'contacts'],
        hybrid:true,
        fitToSection: false,
        verticalCentered: true,
        responsiveWidth: 780,
        responsiveHeight: 677
    });

    $('.js-burger').on('click', function (e) {
        e.preventDefault();
        var $this = $(this).find('.nav__burger-box'),
            $menu = $('.js-menu');

        if ($this.hasClass('nav__burger--open')) {
            $this.removeClass('nav__burger--open');
            $menu.removeClass('nav__list--active');
        } else {
            $this.addClass('nav__burger--open');
            $menu.addClass('nav__list--active');
        }
    });

    $('.js-form-submit').on('click', function (e) {
        e.preventDefault();

        var $userEmail = $('input[name=_replyto]'),
            successCount = 0;

        $.each($formInput, function () {
            var $this = $(this);

            if (!$this.val()) {
                $this.addClass('contacts__form-input--error');
                $formInfo.addClass('contacts__message--error');
            } else {
                successCount++;
            }
        });

        if( !(/(.+)@(.+){2,}\.(.+){2,}/.test($userEmail.val())) ) {
            $userEmail.addClass('contacts__form-input--error');
            $formInfo.addClass('contacts__message--error');
            successCount--;
        }

        if (successCount === 3) {
            $formInfo.addClass('contacts__message--success');
            $formInfo.removeClass('contacts__message--error');
        }

        $htmlBody.animate({ scrollTop: $('#contacts-info').offset().top }, 300);
    });

    $formInput.on('click, focus', function () {
       $(this).removeClass('contacts__form-input--error');

        if (!$formInput.hasClass('contacts__form-input--error')) {
            $formInfo.removeClass('contacts__message--error');
        }
    });

    $document.scroll(function() {
        if($window.scrollTop() >= 60) {
            $arrowToTop.addClass('return-top--active');
        } else {
            $arrowToTop.removeClass('return-top--active');
        }
    });

    $arrowToTop.on('click', function () {
        $htmlBody.animate({ scrollTop: 0 }, "fast");
        return false;
    });


    // action section conditions
    checkSectionOnResize();

    $window.resize(function(){
        checkSectionOnResize();
    });

    function checkSectionOnResize() {
        var $containerHeight = $window.height(),
            $containerWidth = $window.width(),
            heightDirection = false,
            squeeze = true;
        if ( ($containerHeight <= 799) && ($containerWidth >= 1200) ) {
            checkSection($section, heightDirection);
        } else if ( ($containerHeight <= 715) && ($containerWidth > 780 && $containerWidth < 1200) ) {
            checkSection($section, heightDirection, squeeze);
        } else {
            heightDirection = true;
            checkSection($section, heightDirection);
        }
    }

    function checkSection($section, heightDirection, squeeze) {
        $.each($section, function () {
            var $this = $(this);

            if ($this.hasClass('section--action')) {
                $this.addClass('fp-normal-scroll');

                if (heightDirection) {
                    $this.removeClass('fp-normal-scroll');
                }
            }

            if (squeeze) {
                $this.addClass('fp-normal-scroll');
            }
        });
    }
});