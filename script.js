ocument.getElementById('weatherForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const city = document.getElementById('city').value;
    const apiKey = '7c88d090057d4228304f5f11dd98ae39'; // Reemplaza con tu API key de OpenWeatherMap
    const url = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=7c88d090057d4228304f5f11dd98ae39";

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ciudad no encontrada');
            }
            return response.json();
        })
        .then(data => {
            // Mostrar datos en la tabla
            document.getElementById('cityName').innerText = data.name;
            document.getElementById('temperature').innerText = (data.main.temp) ;
            document.getElementById('weatherTable').style.display = 'table';

            // Mostrar el mapa
            const latitude = data.coord.lat;
            const longitude = data.coord.lon;
            const map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: latitude, lng: longitude },
                zoom: 10,
            });
            new google.maps.Marker({
                position: { lat: latitude, lng: longitude },
                map: map,
                title: data.name,
            });
        })
        .catch(error => {
            alert(error.message);
        });
});

// Botón limpiar
document.getElementById('clearBtn').addEventListener('click', function() {
    document.getElementById('weatherForm').reset();
    document.getElementById('weatherTable').style.display = 'none';
    document.getElementById('map').innerHTML = '';
});