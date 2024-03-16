<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Florida Grocery Stores Map</title>
    <style>
        #map-container {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        #map {
            height: 400px;
            width: 100%;
        }
        #store-list {
            width: 100%;
            max-width: 800px; /* Adjust max-width as needed */
            overflow-y: auto;
            margin-top: 20px; /* Add margin to separate the map and list */
        }
        .store-item {
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <h1>Florida Grocery Stores Map</h1>
    <div id="map-container">
        <div id="map"></div>
        <div id="store-list"></div>
    </div>

    <script>
        // Initialize and display the map
        function initMap() {
            var florida = { lat: 27.994402, lng: -81.760254 }; // Center map at Florida

            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 7,
                center: florida
            });

            service = new google.maps.places.PlacesService(map);

            // Listen for map movement events
            map.addListener('idle', function() {
                performSearch();
            });

            // Initial search
            performSearch();
        }
		
        // Perform a search for grocery stores
        function performSearch() {
            var bounds = map.getBounds();
            var ne = bounds.getNorthEast();
            var sw = bounds.getSouthWest();

            var request = {
                bounds: bounds,
                type: ['grocery_or_supermarket'] // Search for grocery stores
            };

            service.nearbySearch(request, callback);
        }		

        // Process the results from the Places API
        function callback(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                var storeList = document.getElementById('store-list');
                storeList.innerHTML = ''; // Clear previous results
                for (var i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                    addStoreToList(results[i].name);
                }
            }
        }

        // Create markers for each place found
        function createMarker(place) {
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
                title: place.name
            });

            var infowindow = new google.maps.InfoWindow({
                content: '<strong>' + place.name + '</strong><br>' + place.vicinity
            });

            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });
        }

        // Add store name to the list
        function addStoreToList(name) {
            var storeList = document.getElementById('store-list');
            var storeItem = document.createElement('div');
            storeItem.classList.add('store-item'); // Add a class for styling
            storeItem.textContent = name;
            storeList.appendChild(storeItem);
        }
    </script>
    <!-- Load the Google Maps JavaScript API with your API key -->
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBFU9LDbuTb6JYNZ6oe7PSPI1NzC5PUzlQ&libraries=places&callback=initMap" async defer></script>
</body>
</html>
