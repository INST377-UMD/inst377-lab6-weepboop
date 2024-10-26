let map;

function createMap() {
    map = L.map('map').setView([38.7946, -106.5348], 3); // set to US coordinates
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    generateRandomCoordinates();
}

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

localities = [];

function generateRandomCoordinates() {
    const coordinates = Array.from({ length: 3 }, () => ({ //creates array for objects length of 3
        lat: getRandomInRange(30, 35, 3),
        lng: getRandomInRange(-100, -90, 3), 
    }));

    coordinates.forEach((coord, index) => {
        const marker = L.marker([coord.lat, coord.lng]).addTo(map);

        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coord.lat}&longitude=${coord.lng}&localityLanguage=en`)
            .then((res) => res.json())
            .then(data => {
                const locality = data.locality; 
                localities.push(locality); 
                const markerText = `Marker ${index + 1}: Latitude: ${coord.lat}, Longitude: ${coord.lng} <br> Locality: ${locality}`;
                document.getElementById('markers').innerHTML += `<p>${markerText}</p>`;
            })
    });

    console.log(localities); 
}

window.onload = createMap;