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
	    <div>
        <input type="text" id="address-input" placeholder="Enter address">
        <button onclick="searchAddress()">Search</button>
    </div>
	
        <div id="map"></div>
        <div id="store-list"></div>
    </div>

    <script>
        // Initialize and display the map
        function initMap() {
            var florida = { lat: 27.994402, lng: -81.760254 }; // Center map at Florida

            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                center: florida
            });

            service = new google.maps.places.PlacesService(map);
			
			var input = document.getElementById('address-input');
            var autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.bindTo('bounds', map);

            autocomplete.addListener('place_changed', function() {
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    window.alert("No details available for input: '" + place.name + "'");
                    return;
                }

                map.setCenter(place.geometry.location);
                map.setZoom(12);
            });
			
			// Trigger search on Enter key press
            input.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    searchAddress();
                }
            });

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
			var grocery_icon = {
				  url: place.icon,
				  size: new google.maps.Size(100, 100),
				  origin: new google.maps.Point(0, 0),
				  anchor: new google.maps.Point(17, 34),
				  scaledSize: new google.maps.Size(50, 50),
                   };
					
            var marker = new google.maps.Marker({
                map: map,
				icon: grocery_icon,
                position: place.geometry.location,
                title: place.name
            });

            const content_str = "<div><strong>" +place.name + "</strong><br>"+place.vicinity+"<br>"+ "<a href='https://www.google.com/maps/search/?api=1&query==" + place.name + ", "+ place.vicinity + "' target='_blank' style='color: blue; text-decoration: underline;'>View on Google Maps</a> </div>"            
            // <a href="https://www.google.com/maps/search/?api=1&query=${place.name}, ${place.vicinity}" target="_blank" style="color: blue; text-decoration: underline;">View on Google Maps</a>            

            var infowindow = new google.maps.InfoWindow({
                content: content_str
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

    <script>
        // Function to fetch API key from server
        function fetchApiKey(callback) {
            fetch('config.json')
                .then(response => response.json())
                .then(data => {
                    const apiKey = data.GOOGLE_MAPS_API_KEY;
                    callback(apiKey);
                })
                .catch(error => {
                    console.error('Error fetching API key:', error);
                    callback(null);
                });
        }

        // Function to load Google Maps JavaScript API with API key
        function loadGoogleMaps(apiKey) {
            if (!apiKey) {
                console.error('API key not found.');
                return;
            }

            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
            document.head.appendChild(script);
        }

        // Call fetchApiKey and loadGoogleMaps when DOM content is loaded
        document.addEventListener('DOMContentLoaded', function() {
            fetchApiKey(loadGoogleMaps);
        });
    </script>	


	
	
</body>
</html>
