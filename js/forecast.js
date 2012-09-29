function forecastUpdate() {
    $.get("http://magicseaweed.com/syndicate/rss/index.php?id=365&unit=uk",
        function (xml) {
            var xmlDoc = $.parseXML(xml);
            var $xml = $(xmlDoc);
            var i = 0;
            $xml.find('item').each(function () {
                var forecast = {
                    day: getDay(this),
                    description: getDescription(this),
                    rating: getRating(this),
                    swell: getSwell(this),
                    period: getPeriod(this),
                    wind: getWind(this),
                    direction: getDirection(this)
                }
                updateView(i, forecast);
                i++;
            });
        });
}

function updateView(i, forecast) {
    $('#day_' + i).text(forecast.day);
    $('.swell_' + i).text(forecast.swell);
    $('.period_' + i).text(forecast.period);
    $('.rating_' + i).children().attr('src', '/images/stars/' + forecast.rating + '.png');
    $('.wind_' + i).text(forecast.wind);
    $('.direction_' + i).text(forecast.direction);
}

function getDay(item) {
    return $(item).find('title').text().substring(0, 3);
};

function getDescription(item) {
    return $(item).find('description').text().split('::');
}

function getRating(item) {
    var description = getDescription(item);
    var rating = description[1].substring(1, 2);
    return rating.replace(' Stars. Swell', '');
}

function getSwell(item) {
    var description = getDescription(item);
    var swell = description[2].substring(1, 5);
    return swell = swell.replace('ft', '');
}

function getPeriod(item) {
    var description = getDescription(item);
    var period = description[2].split('@');
    return period[1].substring(1, 3);
}

function getWind(item) {
    var description = getDescription(item);
    var wind = description[3].substring(1, 3);
    wind = wind.replace('m', '');
    wind = wind.replace('mp', '');
    wind = wind.replace('mph', '');
    return wind;
}

function getDirection(item) {
    var description = getDescription(item);
    var direction = description[3].split(' ');
    return direction[2];
}