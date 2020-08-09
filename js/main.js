////// THEME ///////
// Set theme on page load
$(document).ready(function () {
    initTheme(); // on page load, if user has already selected a specific theme -> apply it
});

// Check local storage for any theme attribute and apply it
function initTheme() {
    var darkThemeSelected = (localStorage.getItem('theme') !== null && localStorage.getItem('theme') === 'dark');

    // update body data-theme attribute
    if (darkThemeSelected) {
        document.body.setAttribute('data-theme', 'dark');
        $('#darkThemeSwitch').addClass('active');
        $('.icon-dark.theme-switcher__btn').hide();
        $("meta[name='theme-color']").attr('content', '#222222');
    }
    else {
        document.body.removeAttribute('data-theme');
        $('#lightThemeSwitch').addClass('active');
        $('.icon-sun.theme-switcher__btn').hide();
        $("meta[name='theme-color']").attr('content', '#f6f6f6');
    }
};

// Update theme and set the local storage attribute and browser theme color 
$('.theme-switcher__label').click(function () {
    var themeOption = $(this).data("theme-option");
    $('.theme-switcher__label').removeClass('active');
    $('.theme-switcher__btn').hide();
    if (themeOption === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        $(this).addClass('active');
        $('.theme-switcher__btn.icon-sun').show();
        $("meta[name='theme-color']").attr('content', '#222222');
        localStorage.setItem('theme', 'dark'); // save theme selection 
    }
    else {
        document.body.removeAttribute('data-theme');
        $(this).addClass('active');
        $('.theme-switcher__btn.icon-dark').show();
        $("meta[name='theme-color']").attr('content', '#f6f6f6');
        localStorage.removeItem('theme'); // reset theme selection 
    }
});

$('.theme-switcher__btn').click(function () {
    var themeOption = $(this).data("theme-option");
    $('.theme-switcher__label').removeClass('active');
    $('.theme-switcher__btn').hide();
    if (themeOption === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        $('#darkThemeSwitch').addClass('active');
        $('.theme-switcher__btn.icon-sun').show();
        $("meta[name='theme-color']").attr('content', '#222222');
        localStorage.setItem('theme', 'dark'); // save theme selection 
    }
    else {
        document.body.removeAttribute('data-theme');
        $('#lightThemeSwitch').addClass('active');
        $('.theme-switcher__btn.icon-dark').show();
        $("meta[name='theme-color']").attr('content', '#f6f6f6');
        localStorage.removeItem('theme'); // reset theme selection 
    }
});




////// DRIBBBLE ///////
// Set the Access Token
var accessToken = "2d96d6d6600a9161ccb7991e27df3bd04002432cb9e34244ace4480cba6574b5"

// Call Dribble v2 API
$.ajax({
    url: 'https://api.dribbble.com/v2/user/shots?access_token=' + accessToken,
    dataType: 'json',
    type: 'GET',
    success: function (data) {
        if (data.length > 0) {
            $.each(data.reverse(), function (i, val) {
                $('#dribbbleShots').prepend(
                    '<a class="shot" target="_blank" href="' + val.html_url + '" title="' + val.title + '" rel="noopener"><div class="title">' + val.title + '</div><img src="' + val.images.hidpi + '" loading="lazy" alt="' + val.title + '"/></a>'
                )
            })
        }
        else {
            $('#dribbbleShots').append('<p>Sorry, No shots yet</p>');
        }
    },
    complete: function () {
        $('#dribbbleLoader').hide();
    }
});

