# OpenStreetMap Integration Guide

## Overview
I've successfully integrated OpenStreetMap with Leaflet into your logistics application. This provides real interactive maps for tracking shipments, selecting locations, and visualizing routes.

## What Was Added

### 1. New Dependencies
```json
{
  "leaflet": "^1.9.4",
  "react-leaflet": "^4.2.1",
  "@types/leaflet": "^1.9.8"
}
```

### 2. New Reusable Map Component
**File:** `src/app/components/ui/InteractiveMap.tsx`

This component provides:
- Real OpenStreetMap tiles
- Custom markers for pickup, delivery, and current truck location
- Clickable map for location selection
- Geocoding and reverse geocoding utilities
- Bilingual support (Swahili/English)
- Custom styled markers matching your brand colors

#### Features:
- **Pickup Marker** (Brown): Shows the pickup location
- **Delivery Marker** (Green): Shows the delivery location
- **Truck Marker** (Gradient): Shows current truck position
- **Selectable Mode**: Click on map to select coordinates
- **Legend**: Shows marker meanings

### 3. Updated TrackingMap Component
**File:** `src/app/components/trader/TrackingMap.tsx`

The tracking map now uses real OpenStreetMap instead of a static SVG. It:
- Geocodes pickup and delivery locations to coordinates
- Displays real map with markers
- Shows the route between locations
- Auto-centers on the shipment route

## Usage Examples

### Basic Map Display
```tsx
import { InteractiveMap } from './components/ui/InteractiveMap';

<InteractiveMap
  center={[0.3476, 32.5825]}  // Kampala coordinates
  zoom={13}
  height="400px"
  language="en"
/>
```

### Map with Pickup and Delivery
```tsx
<InteractiveMap
  startLocation={{
    lat: 0.3476,
    lng: 32.5825,
    name: 'Kampala Warehouse',
    address: 'Kampala, Uganda'
  }}
  endLocation={{
    lat: 0.4125,
    lng: 33.2041,
    name: 'Jinja Distribution Center',
    address: 'Jinja, Uganda'
  }}
  currentLocation={{
    lat: 0.3800,
    lng: 32.9000,
    name: 'Truck #234'
  }}
  height="300px"
  language="en"
/>
```

### Selectable Map (for location picking)
```tsx
const [selectedLocation, setSelectedLocation] = useState(null);

<InteractiveMap
  selectable={true}
  onLocationSelect={(location) => {
    setSelectedLocation(location);
    console.log('Selected:', location.lat, location.lng);
  }}
  height="400px"
  language="en"
/>
```

### Geocoding Addresses
```tsx
import { geocodeAddress, reverseGeocode } from './components/ui/InteractiveMap';

// Address to coordinates
const result = await geocodeAddress('Kampala, Uganda');
console.log(result); // { lat: 0.3476, lng: 32.5825, display_name: '...' }

// Coordinates to address
const address = await reverseGeocode(0.3476, 32.5825);
console.log(address); // 'Kampala, Central Region, Uganda'
```

## Integration Points

### 1. Trader Dashboard - Shipment Tracking
The `TrackingMap` component in the trader dashboard now shows real maps with:
- Pickup location marker
- Delivery location marker
- Automatic geocoding of location names
- Real OpenStreetMap tiles

### 2. Post Load - Location Selection (Recommended Next Step)
You can add interactive maps to the `PostLoad` page to let users:
- Click on map to select pickup location
- Click on map to select delivery location
- See the route visualization
- Get automatic address suggestions

### 3. Truck Marketplace - Map View (Recommended Next Step)
The `TruckMarketplace` page already has a "Map View" toggle. You can replace the placeholder with:
- Real map showing all available trucks
- Markers for each truck's current location
- Click on marker to see truck details
- Filter trucks by location radius

### 4. Driver Dashboard - Current Location
Show driver's current location on a map with:
- Real-time GPS tracking
- Nearby loads visualization
- Route optimization display

## Customization

### Marker Colors
Edit the `createColoredIcon` function in `InteractiveMap.tsx`:
```tsx
const startIcon = createColoredIcon('#4B2E2B');  // Change pickup color
const endIcon = createColoredIcon('#10B981');    // Change delivery color
```

### Truck Icon
Edit the `truckIcon` definition to change the truck marker appearance.

### Map Center & Zoom
Default is Kampala, Uganda. Change in the component props:
```tsx
center={[0.3476, 32.5825]}  // [latitude, longitude]
zoom={13}  // 1-18 (higher = more zoomed in)
```

## API Usage Notes

### Nominatim Geocoding API
The geocoding functions use OpenStreetMap's Nominatim API:
- **Free to use** - No API key required
- **Rate limited** - Max 1 request per second
- **Attribution required** - Already included in map tiles

For production with heavy usage, consider:
1. Adding caching to reduce API calls
2. Using a paid geocoding service for higher limits
3. Implementing batch geocoding for multiple addresses

### Usage Guidelines
```tsx
// Good: Cache results
const cache = new Map();
async function geocodeWithCache(address: string) {
  if (cache.has(address)) return cache.get(address);
  const result = await geocodeAddress(address);
  cache.set(address, result);
  return result;
}

// Good: Debounce user input
const debouncedGeocode = debounce((address) => {
  geocodeAddress(address).then(setResult);
}, 500);
```

## Browser Compatibility
- Works in all modern browsers
- Requires JavaScript enabled
- CSS imports Leaflet styles automatically

## Performance Tips
1. **Lazy load** the map component only when needed
2. **Limit markers** - Don't show more than 100 markers at once
3. **Use clustering** for many markers (consider leaflet.markercluster)
4. **Cache geocoding** results to reduce API calls
5. **Debounce** map interactions for smoother experience

## Troubleshooting

### Map not showing
- Check that Leaflet CSS is loaded (automatic with import)
- Ensure container has a defined height
- Check browser console for errors

### Geocoding not working
- Check internet connection
- Verify address format
- Add country name for better results (e.g., "Kampala, Uganda")

### Markers not appearing
- Verify coordinates are valid numbers
- Check that lat is between -90 and 90
- Check that lng is between -180 and 180

## Next Steps

### Immediate (Recommended)
1. Add map to PostLoad for location selection
2. Add map view to TruckMarketplace
3. Add real-time tracking to DriverDashboard

### Future Enhancements
1. **Route polyline** - Draw actual driving routes
2. **Distance calculation** - Show km between points
3. **ETA calculation** - Estimate delivery time
4. **Geofencing** - Alert when entering/leaving areas
5. **Offline maps** - Cache map tiles for offline use
6. **Traffic layer** - Show traffic conditions
7. **Weather overlay** - Show weather on routes

## Files Modified/Created

1. **Created:** `src/app/components/ui/InteractiveMap.tsx` - Main map component
2. **Updated:** `src/app/components/trader/TrackingMap.tsx` - Integrated real maps
3. **Installed:** leaflet, react-leaflet, @types/leaflet

## Testing

To test the map integration:
1. Start the app: `npm run dev`
2. Go to Trader Dashboard
3. View a shipment with tracking
4. You should see a real interactive map with markers

The map should:
- Load OpenStreetMap tiles
- Show pickup marker (brown)
- Show delivery marker (green)
- Allow panning and zooming
- Show popups on marker click