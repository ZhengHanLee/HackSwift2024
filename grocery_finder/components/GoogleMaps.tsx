'use client';

import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export default function GoogleMaps() {
	const mapRef = React.useRef<HTMLDivElement>(null);

	useEffect(() => {
		const initializeMap = async () => {
      // Check if API key exists
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      if (!apiKey) {
          console.error('Google Maps API key is not provided.');
          return;
      }
			const loader = new Loader({
				apiKey,
        libraries: ['places'],
			});

			const { Map } = await loader.importLibrary('maps');

			const locationInMap = {
				lat: 30.332184,
				lng: -81.655647,
			};

			// MARKER
			const { Marker } = (await loader.importLibrary(
				'marker'
			)) as google.maps.MarkerLibrary;

			const options: google.maps.MapOptions = {
				center: locationInMap,
				zoom: 12,
				mapId: 'NEXT_MAPS_TUTS',
			};

			const map = new Map(mapRef.current as HTMLDivElement, options);

			// add the marker in the map
			const marker = new Marker({
				map: map,
				position: locationInMap,
			});
		};

		initializeMap();
	}, []);

	return <div className="h-[600px]" ref={mapRef} />;
}