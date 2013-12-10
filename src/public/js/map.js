function initialize() {
    var markers = {};
    var infowindow = new google.maps.InfoWindow();
    var map_canvas = document.getElementById('map');
    var map_options = {
          center: new google.maps.LatLng(50.450072, 30.523453),
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(map_canvas, map_options);

    function createHandler(content, map, marker) {
        return function() {
            infowindow.setContent(content);
            infowindow.open(map, marker);
        };
    }

    // Add markers
    var events = JSON.parse($("#map").attr("data-locations"));
    console.log(events);
    for (var i in events) {
        var ev = events[i];
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(ev.latitude, ev.longitude),
            map: map,
            title: ev.text
        });

        var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h3 id="firstHeading" class="firstHeading">' + ev.title + '</h3>'+
            '<div id="bodyContent"><p>'+ ev.description + '</p>' +
            '<small>' + ev.address + '</small>' +
            '</div>'+
            '</div>';

        var handler = createHandler(contentString, map, marker);
        google.maps.event.addListener(marker, 'click', handler);

        markers[ev._id] = handler;
    }

    $(".event").click(function(e) {
        var handler = markers[$(this).attr("data-index")];
        handler();
    });
}

google.maps.event.addDomListener(window, 'load', initialize);