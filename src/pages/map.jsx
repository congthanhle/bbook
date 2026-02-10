import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { TbSearch, TbEaseInOutControlPoints  } from 'react-icons/tb';
import { useUserStore } from '@/state/user';
import { Input } from 'antd';

const CourtMap = () => {
  const courts = [
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
  return (
    <div style={{ height: 'calc(100vh - 72px)', width: '100%' }}>
      <div className="bg-emerald-700 w-full p-2 rounded-b-3xl bg-contain">
        <Input
          className="h-10 rounded-xl w-2/3"
          placeholder="Nhập tên sân, địa chỉ,..."
        />
      </div>
      <MapContainer
        center={[10.81321824536822, 106.66621897895698]}
        zoom={19}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap | BBook'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          maxNativeZoom={19}
          tileSize={256}
          detectRetina={true}
        />

        {courts.map(court => (
          <Marker key={court.id} position={[court.lat, court.lng]}>
            <Popup>
              <b>{court.name}</b>
              <br />
              {court.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
export default CourtMap;
