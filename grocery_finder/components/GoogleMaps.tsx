'use client';

import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export default function GoogleMaps() {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initializeMap = async () => {
            const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
            if (!apiKey) {
                console.error('Google Maps API key is not provided.');
                return;
            }

            const loader = new Loader({
                apiKey,
                libraries: ['places'],
            });

            const google = await loader.load();

            const map = new google.maps.Map(mapRef.current as HTMLDivElement, {
                center: { lat: 30.332184, lng: -81.655647 },
                zoom: 12,
                mapId: 'NEXT_MAPS_TUTS',
            });

            const searchBox = new google.maps.places.SearchBox(
                document.getElementById('search-box') as HTMLInputElement
            );

            map.controls[google.maps.ControlPosition.TOP_LEFT].push(
                document.getElementById('search-box-container') as HTMLElement
            );

            let markers: google.maps.Marker[] = [];

            searchBox.addListener('places_changed', async () => {
                const places = searchBox.getPlaces() as google.maps.places.PlaceResult[];

                if (places.length === 0) return;

                // Clear existing markers
                markers.forEach((marker) => {
                    marker.setMap(null);
                });
                markers = [];

                // For each place, add a marker to the map
                const bounds = new google.maps.LatLngBounds();

                places.forEach((place) => {
                    if (!place.geometry || !place.geometry.location) {
                        console.error('Returned place contains no geometry');
                        return;
                    }

                    const icon = {
                      url: place.icon as string,
                      size: new google.maps.Size(50, 50),
                      origin: new google.maps.Point(0, 0),
                      anchor: new google.maps.Point(17, 34),
                      scaledSize: new google.maps.Size(25, 25),
                    }

                    // Create a marker for the searched location
                    const marker = new google.maps.Marker({
                        map,
                        icon,
                        position: place.geometry.location,
                        title: place.name,
                    });

                    markers.push(marker);

                    // Extend the bounds to include the searched location
                    bounds.extend(place.geometry.location);

                    // Info window for Search Marker
                    const infowindow = new google.maps.InfoWindow({
                      content: '<strong>' + place.name + '</strong><br>' + place.vicinity,
                    });

                    // Open info window when marker is clicked
                    marker.addListener('click', () => {
                        infowindow.open(map, marker);
                    });
                  });

                // Search for grocery stores nearby
                const request: google.maps.places.PlaceSearchRequest = {
                    location: places[0].geometry!.location!,
                    radius: 5000, // 5km radius
                    keyword: 'grocery store',
                };

                const service = new google.maps.places.PlacesService(map);
                service.nearbySearch(request, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                      if (results){ 
                      results.forEach((place) => {

                            const icon = {
                              url: place.icon as string,
                              size: new google.maps.Size(50, 50),
                              origin: new google.maps.Point(0, 0),
                              anchor: new google.maps.Point(17, 34),
                              scaledSize: new google.maps.Size(25, 25),
                            }
                            const marker = new google.maps.Marker({
                                map,
                                icon,
                                position: place.geometry!.location!,
                                title: place.name,
                            });
                            markers.push(marker);
                            bounds.extend(place.geometry!.location!);
                            // Info window for grocery store markers
                            const infowindow = new google.maps.InfoWindow({
                              content: `
                                  <div>
                                      <strong>${place.name}</strong><br>
                                      ${place.vicinity}<br>
                                      <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name ?? '')}, ${encodeURIComponent(place.vicinity ?? '')}" target="_blank" style="color: blue; text-decoration: underline;">View on Google Maps</a>
                                  </div>
                              `,
                          });

                          // Open info window when marker is clicked
                          marker.addListener('click', () => {
                              infowindow.open(map, marker);
                          });
                        });
                        // Fit the map bounds to include both the searched location and nearby grocery stores
                        map.fitBounds(bounds);
                      }
                    } else {
                        console.error('Error fetching nearby places:', status);
                    }
                });
            });
        };

        initializeMap();
    }, []);

    return (
        <div className="h-[700px]">
            <div id="search-box-container" style={{ position: 'absolute', top: 10, left: 10 }}>
                <input
                    id="search-box"
                    type="text"
                    placeholder="Search for places"
                    style={{ width: '300px', padding: '6px' }}
                />
            </div>
            <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
        </div>
    );
}
