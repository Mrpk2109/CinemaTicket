"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leaflet_1 = __importDefault(require("leaflet"));
const cinemas = [
    {
        name: 'Cinema 1',
        location: [51.5074, 0.1278],
        address: 'London, UK'
    },
    {
        name: 'Cinema 2',
        location: [40.7128, -74.006],
        address: 'New York, USA'
    },
    {
        name: 'Cinema 3',
        location: [48.8566, 2.3522],
        address: 'Paris, France'
    }
];
function initMap() {
    const map = leaflet_1.default.map('map').setView([37.7749, -122.4194], 4);
    leaflet_1.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    cinemas.forEach((cinema) => {
        fetch(`https://nominatim.openstreetmap.org/search.php?q=${cinema.address}&format=jsonv2`)
            .then(response => response.json())
            .then(data => {
            if (data.length > 0) {
                const location = [data[0].lat, data[0].lon];
                const marker = leaflet_1.default.marker(location[0]).addTo(map);
                marker.bindPopup(cinema.name).openPopup();
            }
        });
    });
}
initMap();
