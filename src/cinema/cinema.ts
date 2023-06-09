import express from 'express';
import L from 'leaflet';
//const app:Express = express();

interface Cinema {
  name: string;
  location: L.LatLngExpression;
  address: string;
}

const cinemas: Cinema[] = [
  {
    name: 'Cinema Central Festival',
    location: [51.5074, 0.1278],
    address: 'ChiangMai, Thailand'
  },
  {
    name: 'Cinema Central Airport',
    location: [40.7128, -74.006],
    address: 'ChiangMai, Thailand'
  },
  {
    name: 'Cinema 3',
    location: [48.8566, 2.3522],
    address: 'Paris, France'
  }
];

function initMap(): void {
  const map = L.map('map').setView([37.7749, -122.4194], 4);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  cinemas.forEach((cinema) => {
    fetch(`https://nominatim.openstreetmap.org/search.php?q=${cinema.address}&format=jsonv2`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const location = [data[0].lat, data[0].lon];
          const marker = L.marker(location[0]).addTo(map);
          marker.bindPopup(cinema.name).openPopup();
        }
      });
  });
}

initMap();
//app.listen(3001, () => {
//  console.log('http://localhost:3001')
//})