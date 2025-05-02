"use client";

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Replace with your Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

interface MapboxProps {
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    coordinates: [number, number];
    title: string;
    description: string;
  }>;
}

export default function Mapbox({ 
  center = [78.9629, 20.5937], // Default to India's center
  zoom = 4,
  markers = []
}: MapboxProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: center,
      zoom: zoom
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers if provided
    markers.forEach(marker => {
      new mapboxgl.Marker()
        .setLngLat(marker.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<h3>${marker.title}</h3><p>${marker.description}</p>`))
        .addTo(map.current!);
    });

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [center, zoom, markers]);

  return (
    <div 
      ref={mapContainer} 
      className="w-full h-[700px] rounded-lg shadow-lg"
    />
  );
} 