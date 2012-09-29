function selectSpot() {
    $('.slidePanel').animate({ width: '24%' });
    $('body').animate({ width: '75%' });
}

$(document).ready(function () {
    $('.slidePanel').click(function () {
        $('.slidePanel').animate({ width: '0%' });
        $('body').animate({ width: '100%' });
    });

    $('#logo').click(function () {
        var about = Windows.UI.Popups.MessageDialog('Developped by William Fortin, AFR Software');
        about.title = 'About Surf Forecast';
        about.showAsync();
    });
});
