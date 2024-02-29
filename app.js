const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
    e.preventDefault();
    const ciudad = document.querySelector('#city').value;
    const pais = document.querySelector('#country').value;
    consultalAPI(ciudad, pais);
}

function mostrarError(mensaje) {
    console.log(mensaje);
    resultado.innerHTML = '';
    const errorElement = document.createElement('p');
    errorElement.textContent = mensaje;
    resultado.appendChild(errorElement);
}

function consultalAPI(ciudad, pais) {
    const appId = 'cd3ac4181b0c7d5de7706b41156fbb57';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    fetch(url)
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error('No se ha encontrado la ciudad, aprenda geografia :D');
            }
            return respuesta.json();
        })
        .then(datos => {
            showWeather(datos); 
        })
        .catch(error => {
            mostrarError(error.message); 
        });
}

function kelvinToCentigrade(temp) {
    return parseInt(temp - 273.15);
}

function showWeather(data) {
    const { name, main: { temp, temp_min, temp_max, feels_like }, weather: [arr] } = data;

    const degrees = kelvinToCentigrade(temp);
    const min = kelvinToCentigrade(temp_min);
    const max = kelvinToCentigrade(temp_max);
    const sen = kelvinToCentigrade(feels_like);

    const content = document.createElement('div');
    content.innerHTML = `
        <h5>Clima en ${name}</h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
        <h2>${degrees}°C</h2>
        <p>Max: ${max}°C</p>
        <p>Min: ${min}°C</p>
        <p>Sensacion Termica: ${sen}°C</p>
    `;

    resultado.innerHTML = ''; 
    resultado.appendChild(content); 
}

