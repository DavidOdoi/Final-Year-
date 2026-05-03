import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'motion/react';
import { MapPin, Navigation, Truck } from 'lucide-react';

// Fix for default marker icon in Leaflet with React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom truck icon
const truckIcon = L.divIcon({
  html: `<div style="
    background: linear-gradient(135deg, #D4A373 0%, #4B2E2B 100%);
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    border: 3px solid white;
  ">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"/>
      <path d="M14 18h4a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2h-4"/>
      <circle cx="7" cy="18" r="2"/>
      <circle cx="17" cy="18" r="2"/>
    </svg>
  </div>`,
  className: 'truck-marker',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

// Custom start/end icons
const createColoredIcon = (color: string) => L.divIcon({
  html: `<div style="
    background: ${color};
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    border: 3px solid white;
  ">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  </div>`,
  className: 'colored-marker',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const startIcon = createColoredIcon('#4B2E2B');
const endIcon = createColoredIcon('#10B981');

export interface MapLocation {
  lat: number;
  lng: number;
  name?: string;
  address?: string;
}

interface InteractiveMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: MapLocation[];
  startLocation?: MapLocation;
  endLocation?: MapLocation;
  currentLocation?: MapLocation;
  onLocationSelect?: (location: MapLocation) => void;
  selectable?: boolean;
  showControls?: boolean;
  height?: string;
  className?: string;
  language?: 'sw' | 'en';
}

// Component to handle map clicks for location selection
function LocationSelector({ onLocationSelect }: { onLocationSelect?: (location: MapLocation) => void }) {
  const map = useMapEvents({
    click(e) {
      if (onLocationSelect) {
        onLocationSelect({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        });
      }
    },
  });
  return null;
}

// Draws a real road route between two points using OSRM (OpenStreetMap routing)
function RoutePolyline({ start, end }: { start: MapLocation; end: MapLocation }) {
  const [positions, setPositions] = useState<[number, number][]>([]);

  useEffect(() => {
    async function fetchRoute() {
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.routes?.[0]?.geometry?.coordinates) {
          setPositions(
            data.routes[0].geometry.coordinates.map(([lng, lat]: [number, number]) => [lat, lng])
          );
        } else {
          setPositions([[start.lat, start.lng], [end.lat, end.lng]]);
        }
      } catch {
        setPositions([[start.lat, start.lng], [end.lat, end.lng]]);
      }
    }
    fetchRoute();
  }, [start.lat, start.lng, end.lat, end.lng]);

  if (positions.length === 0) return null;
  return (
    <Polyline
      positions={positions}
      pathOptions={{ color: '#4B2E2B', weight: 4, opacity: 0.75, dashArray: '8, 6' }}
    />
  );
}

// Component to update map view
function MapController({ center, zoom }: { center?: [number, number]; zoom?: number }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || 13);
    }
  }, [center, zoom, map]);
  return null;
}

export function InteractiveMap({
  center = [0.3476, 32.5825], // Default to Kampala, Uganda
  zoom = 13,
  markers = [],
  startLocation,
  endLocation,
  currentLocation,
  onLocationSelect,
  selectable = false,
  showControls = true,
  height = '400px',
  className = '',
  language = 'en',
}: InteractiveMapProps) {
  const [selectedPoint, setSelectedPoint] = useState<MapLocation | null>(null);

  const handleLocationSelect = (location: MapLocation) => {
    setSelectedPoint(location);
    if (onLocationSelect) {
      onLocationSelect(location);
    }
  };

  const content = {
    sw: {
      pickup: 'Mahali pa Kuchukua',
      delivery: 'Mahali pa Kupeleka',
      current: 'Mahali pa Sasa',
      selected: 'Mahali Ulichochagua',
      clickToSelect: 'Bofya kwenye ramani kuchagua mahali',
    },
    en: {
      pickup: 'Pickup Location',
      delivery: 'Delivery Location',
      current: 'Current Location',
      selected: 'Selected Location',
      clickToSelect: 'Click on map to select location',
    },
  };

  const text = content[language];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-2xl overflow-hidden shadow-lg border-2 border-[#4B2E2B]/10 ${className}`}
      style={{ height }}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {selectable && onLocationSelect && (
          <LocationSelector onLocationSelect={handleLocationSelect} />
        )}

        <MapController center={center} zoom={zoom} />

        {startLocation && endLocation && (
          <RoutePolyline start={startLocation} end={endLocation} />
        )}

        {startLocation && (
          <Marker position={[startLocation.lat, startLocation.lng]} icon={startIcon}>
            <Popup>
              <div className="p-2">
                <div className="font-semibold text-[#4B2E2B]">{text.pickup}</div>
                {startLocation.name && <div className="text-sm text-gray-600">{startLocation.name}</div>}
                {startLocation.address && <div className="text-xs text-gray-500">{startLocation.address}</div>}
              </div>
            </Popup>
          </Marker>
        )}

        {endLocation && (
          <Marker position={[endLocation.lat, endLocation.lng]} icon={endIcon}>
            <Popup>
              <div className="p-2">
                <div className="font-semibold text-green-700">{text.delivery}</div>
                {endLocation.name && <div className="text-sm text-gray-600">{endLocation.name}</div>}
                {endLocation.address && <div className="text-xs text-gray-500">{endLocation.address}</div>}
              </div>
            </Popup>
          </Marker>
        )}

        {currentLocation && (
          <Marker position={[currentLocation.lat, currentLocation.lng]} icon={truckIcon}>
            <Popup>
              <div className="p-2">
                <div className="font-semibold text-[#D4A373] flex items-center gap-2">
                  <Truck size={16} />
                  {text.current}
                </div>
                {currentLocation.name && <div className="text-sm text-gray-600">{currentLocation.name}</div>}
              </div>
            </Popup>
          </Marker>
        )}

        {markers.map((marker, index) => (
          <Marker key={index} position={[marker.lat, marker.lng]}>
            {marker.name && (
              <Popup>
                <div className="p-2">
                  <div className="font-semibold">{marker.name}</div>
                  {marker.address && <div className="text-sm text-gray-500">{marker.address}</div>}
                </div>
              </Popup>
            )}
          </Marker>
        ))}

        {selectedPoint && (
          <Marker position={[selectedPoint.lat, selectedPoint.lng]}>
            <Popup>
              <div className="p-2">
                <div className="font-semibold text-[#4B2E2B]">{text.selected}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Lat: {selectedPoint.lat.toFixed(6)}, Lng: {selectedPoint.lng.toFixed(6)}
                </div>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {showControls && selectable && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-xs text-[#4B2E2B]">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-[#D4A373]" />
            {text.clickToSelect}
          </div>
        </div>
      )}

      {showControls && !selectable && (
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-[#4B2E2B]" />
              <span className="text-[#4B2E2B]">{text.pickup}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-[#4B2E2B]">{text.delivery}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#D4A373] to-[#4B2E2B]" />
              <span className="text-[#4B2E2B]">{text.current}</span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// Utility function to geocode address to coordinates (using Nominatim API)
export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number; display_name: string } | null> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
    );
    const data = await response.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        display_name: data[0].display_name,
      };
    }
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

// Utility function for reverse geocoding (coordinates to address)
export async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    return data.display_name || null;
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return null;
  }
}