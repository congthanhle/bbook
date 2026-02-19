import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { AutoComplete, Button } from 'antd';
import { useState, useRef } from 'react';
import { MdMyLocation } from 'react-icons/md';

const searchCourtsAPI = async (searchTerm) => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const allCourts = [
    {
      id: 1,
      name: 'Sân Cầu Lông Q1',
      lat: 10.7765,
      lng: 106.7009,
      address: 'Quận 1, TP.HCM',
    },
    {
      id: 2,
      name: 'Sân Cầu Lông Q3',
      lat: 10.812799783195931,
      lng: 106.6663073207576,
      address: 'Quận 3, TP.HCM',
    },
  ];
  if (!searchTerm) return allCourts;
  return allCourts.filter(court =>
    court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    court.address.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

const MapController = ({ center, zoom }) => {
  const map = useMap();

  if (center) {
    map.flyTo(center, zoom || 17, {
      duration: 1.5
    });
  }

  return null;
};

const CourtMap = () => {
  const [courts, setCourts] = useState([
    {
      id: 1,
      name: 'Sân Cầu Lông Q1',
      lat: 10.7765,
      lng: 106.7009,
      address: 'Quận 1, TP.HCM',
    },
    {
      id: 2,
      name: 'Sân Cầu Lông Q3',
      lat: 10.812799783195931,
      lng: 106.6663073207576,
      address: 'Quận 3, TP.HCM',
    },
  ]);
  const [searchOptions, setSearchOptions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Handle search input
  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      setSearchOptions([]);
      return;
    }

    // Simulate API call
    const results = await searchCourtsAPI(searchTerm);

    // Format options for AutoComplete
    const options = results.map(court => ({
      value: court.name,
      label: `${court.name} - ${court.address}`,
      court: court
    }));

    setSearchOptions(options);
  };

  const handleSelect = (value, option) => {
    const court = option.court;
    setSelectedLocation([court.lat, court.lng]);
  };

  // Simulate getting current location
  const getCurrentLocation = () => {
    // Sample location (you can replace with actual geolocation API later)
    const sampleCurrentLocation = {
      lat: 10.81321824536822,
      lng: 106.66621897895698
    };

    setSelectedLocation([sampleCurrentLocation.lat, sampleCurrentLocation.lng]);
  };

  return (
    <div className="h-[calc(100vh-72px)] w-full relative">
      {/* Search bar positioned absolutely on top of the map */}
      <div className="bg-emerald-700 w-full px-2 py-3 rounded-b-2xl absolute top-0 left-0 right-0 z-[1000]">
        <div className="flex gap-2 items-center">
          <AutoComplete
            className="h-10 w-3/4"
            placeholder="Nhập tên sân, địa chỉ,..."
            onSearch={handleSearch}
            onSelect={handleSelect}
            options={searchOptions}
          />
        </div>
      </div>
      <Button
        icon={<MdMyLocation size={20} />}
        onClick={getCurrentLocation}
        className="h-10 flex items-center justify-center fixed bottom-28 right-4 z-[1000] rounded-full border border-primary bg-white shadow-lg hover:bg-gray-100 text-primary"
        title="Vị trí hiện tại"
      />
      <MapContainer
        center={[10.81321824536822, 106.66621897895698]}
        zoom={19}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap | BBook'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          maxNativeZoom={19}
          tileSize={256}
          detectRetina={true}
        />

        <MapController center={selectedLocation} zoom={18} />

        {courts.map(court => (
          <Marker key={court.id} position={[court.lat, court.lng]}>
            <Popup>
              <div className="text-base p-1">
                <div className="font-bold text-lg mb-1">{court.name}</div>
                <div className="text-sm text-gray-600">{court.address}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
export default CourtMap;
