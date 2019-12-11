var map;
var place;
var autocomplete;
var infowindow = new google.maps.InfoWindow();

//variable for the marker used to create a new trail
var newMarker;

function initialization() {
    showAllReports();
    initAutocomplete();
    //onPlaceChanged();
}

function showAllReports(){
    $.ajax({
        url: 'HttpServlet',
        type: 'POST',
        data: { "tab_id": "1"},
        success: function(reports) {
            mapInitialization(reports);
            console.log(reports);
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
    };

    // Render the map within the empty div
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    console.log(reports);
    var bounds = new google.maps.LatLngBounds();

    $.each(reports, function (i, e) {
        var long = Number(e['longitude']);
        var lat = Number(e['latitude']);
        //Assign the icon variable
        var latlng = new google.maps.LatLng(lat, long);

        bounds.extend(latlng);

        /*        var active = {
                    "t": "Yes",
                    "f": "No"
                };*/

        //Create the infoWindow content
        var contentStr = '<h4>Fire Details</h4><hr>';
        contentStr += '<p><b>' + 'Fire Type' + ':</b>&nbsp' + e['fire_type'] + '</p>';
        contentStr += '<p><b>' + 'Burn Severity' + ':</b>&nbsp' + e['burn_type'] + '</p>';
/*
        contentStr += '<p><b>' + 'Reportor' + ':</b>&nbsp' + e['first_name'] + '&nbsp' + e['last_name'] + '</p>';
        contentStr = '<h4> Trail Review Information</h4><hr>';
        contentStr += '<p><b>' + 'Trail Name' + ':</b>&nbsp' + e['trail_name'] + '</p>';
        contentStr += '<p><b>' + 'Active' + ':</b>&nbsp' + active[e['active']] + '</p>';
        contentStr += '<p><b>' + 'Date Hiked' + ':</b>&nbsp' + e['date_added'] + '</p>';
        contentStr += '<p><b>' + 'Trail Rating' + ':</b>&nbsp' + e['rating'] + '</p>';
        contentStr += '<p><b>' + 'Review Comments' + ':</b>&nbsp' + e['comments'] + '</p>';
        if ('message' in e) {
            contentStr += '<p><b>' + 'Message' + ':</b>&nbsp' + e['message'] + '</p>';
        }*/

        var low_icon = {
            icon: 'img/Low_Fire.png'
        };

        var medium_icon = {
            icon: 'img/Medium_Fire.png'
        };

        var high_icon = {
            icon: 'img/High_Fire.png'
        };

        function MapMaker(feature) {
            //Select map maker based on report
            if (e['burn_type'] == 'low') {
                return low_icon
            }
            if (e['burn_type'] == 'medium') {
                return medium_icon
            }
            if (e['burn_type'] == 'high') {
                return high_icon
            } else {
                return high_icon
            }
            ;
        }

        /*    var icons = {
                low:{
                    icon:'img/Low_Fire.png'
                },
                medium:{
                    icon:'img/Medium_Fire.png'
                },
                large:{
                    icon:'img/High_Fire.png'
                },
                request: {
                    icon: 'img/sos.png'
                },
                review:{
                    icon:"img/review.png"
                },
                trailHead:{
                    icon:"img/trailHead.png"
                }
            };*/

        var marker = new google.maps.Marker({ // Set the marker
            position: latlng, // Position marker to coordinates
            map: map, // assign the marker to our map variable
            icon: MapMaker(),
            customInfo: contentStr,
        });

        // Add a Click Listener to the marker
        google.maps.event.addListener(marker, 'click', function () {
            // use 'customInfo' to customize infoWindow
            infowindow.setContent(marker['customInfo']);
            infowindow.open(map, marker); // Open InfoWindow
        });
    });
/*             google.maps.event.addListener(map, "click", function(event) {
            // get lat/lon of click
            var clickLat = event.latLng.lat();
            var clickLon = event.latLng.lng();

            // show in input box
            document.getElementById("lat").value = clickLat.toFixed(5);
            document.getElementById("lon").value = clickLon.toFixed(5);

            //check for existing marker
            if (newMarker && newMarker.setMap){
                newMarker.setMap(null);
            }

            //places the new marker
            newMarker = new google.maps.Marker({
                position: new google.maps.LatLng(clickLat, clickLon),
                icon: reviewIcon,
                map: map
            });*/

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
}
/*    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
        address = [
            (place.address_components[0] && place.address_components[0].short_name || ''),
            (place.address_components[1] && place.address_components[1].short_name || ''),
            (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
    }*/
//Execute our 'initialization' function once the page has loaded.
google.maps.event.addDomListener(window, 'load', initialization);