var map;
var place;
var autocomplete;
var infowindow = new google.maps.InfoWindow();

function initialization() {
    initAutocomplete();
    initMap();
}

function initMap(){
    $.ajax({
        url: 'HttpServlet',
        type: 'POST',
        data: { "tab_id": "1"},
        success: function(reports) {
            mapInitialization(reports);
        },
        error: function(xhr, status, error) {
            alert("An AJAX error occured: " + status + "\nError: " + error);
        }
    });
}

function mapInitialization(reports) {
    var mapOptions = {
        mapTypeId: google.maps.MapTypeId.ROADMAP, // Set the type of Map
        center: {lat:37.386, lng:-119.956},
        zoom: 8
        //CANT GET THIS TO WORK
    };

    // Render the map within the empty div
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var bounds = new google.maps.LatLngBounds();

    var icons = {
        low:{
            icon:'img/Low_Fire.png'
        },
        medium:{
            icon:'img/Medium_Fire.png'
        },
        large:{
            icon:'img/High_Fire.png'
        },
        damage: {
            icon: 'img/damage1.png'
        },
        request: {
            icon: 'img/sos.png'
        }
    };

    $.each(reports, function (i, e) {
        var long = Number(e['longitude']);
        var lat = Number(e['latitude']);
        //Assign the icon variable
        var report_type = e['report_type'];
        var latlng = new google.maps.LatLng(lat, long);


        bounds.extend(latlng);
        // Create the infoWindow content
        var contentStr = '<h4>Fire Details</h4><hr>';

        //used the line below to test if the request type was coming through.
        //contentStr += '<p><b>' + icons[report_type].icon + '</b></p>';

        //STILL NEED TO UPDATE
        contentStr += '<p><b>' + 'Fire Type' + ':</b>&nbsp' + e['fire_type'] + '</p>';
        contentStr += '<p><b>' + 'Fire Severity' + ':</b>&nbsp' + e['fire_severity'] +
            '</p>';
        contentStr += '<p><b>' + 'Reportor' + ':</b>&nbsp' + e['first_name'] + '&nbsp' + e['last_name'] + '</p>';
        contentStr += '<p><b>' + 'Timestamp' + ':</b>&nbsp' +
            e['time_stamp'].substring(0, 19) + '</p>';

        contentStr = '<h4> Trail Review Information</h4><hr>';
        contentStr += '<p><b>' + 'Trail Name' + ':</b>&nbsp' + e['trail_name'] + '</p>';
        contentStr += '<p><b>' + 'Active' + ':</b>&nbsp' + active[e['active']] + '</p>';
        contentStr += '<p><b>' + 'Date Hiked' + ':</b>&nbsp' + e['date_added'] + '</p>';
        contentStr += '<p><b>' + 'Trail Rating' + ':</b>&nbsp' + e['rating'] + '</p>';
        contentStr += '<p><b>' + 'Review Comments' + ':</b>&nbsp' + e['comments'] + '</p>';

        if ('message' in e) {
            contentStr += '<p><b>' + 'Message' + ':</b>&nbsp' + e['message'] + '</p>';
        }

        var marker = new google.maps.Marker({ // Set the marker
            position: latlng, // Position marker to coordinates
            icon: icons[report_type].icon,
            map: map, // assign the marker to our map variable
            customInfo: contentStr,
        });

        // Add a Click Listener to the marker
        google.maps.event.addListener(marker, 'click', function () {
            // use 'customInfo' to customize infoWindow
            infowindow.setContent(marker['customInfo']);
            infowindow.open(map, marker); // Open InfoWindow
        });
    });

    map.fitBounds(bounds);

}

function initAutocomplete() {
    // Create the autocomplete object
    autocomplete = new google.maps.places.Autocomplete(document
        .getElementById('autocomplete'));

    // When the user selects an address from the dropdown, show the place selected
    autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged() {
//// QUESTION #3
    place = autocomplete.getPlace();
    if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
    }
    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
    } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
        address = [
            (place.address_components[0] && place.address_components[0].short_name || ''),
            (place.address_components[1] && place.address_components[1].short_name || ''),
            (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
    }
}

//Execute our 'initialization' function once the page has loaded.
google.maps.event.addDomListener(window, 'load', initialization);
