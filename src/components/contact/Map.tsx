
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix the marker icon issue with webpack
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Location {
  name: string;
  address: string;
  coords: [number, number];
}

// Create a SetView component to handle setting map view
const SetViewOnInit = ({ coords }: { coords: [number, number] }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(coords, 5);
    
    // Disable scroll zoom through the map API
    map.scrollWheelZoom.disable();
  }, [map, coords]);
  
  return null;
};

const Map: React.FC = () => {
  const { t } = useTranslation();
  
  const locations: Location[] = [
    { 
      name: 'Paris', 
      address: 'Paris, France',
      coords: [48.8566, 2.3522] 
    },
    { 
      name: 'Marseille', 
      address: 'Marseille, France',
      coords: [43.2965, 5.3698] 
    },
    { 
      name: 'London', 
      address: 'London, UK',
      coords: [51.5074, -0.1278] 
    }
  ];
  
  // Get default center coordinates
  const defaultCenter: [number, number] = [48.8566, 2.3522];

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-md border border-border/50 relative">
      <MapContainer 
        className="h-full w-full z-0"
        style={{ height: '100%', width: '100%' }}
      >
        <SetViewOnInit coords={defaultCenter} />
        
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {locations.map((location, index) => (
          <Marker 
            key={index}
            position={location.coords}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-medium text-base">{location.name}</h3>
                <p className="text-sm text-muted-foreground">{location.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
