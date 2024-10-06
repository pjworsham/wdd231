



const currentTemp = document.querySelector(`#current-temp`);
const weatherIcon = document.querySelector(`#weather-icon`);
const captionDesc = document.querySelector(`figcaption`);
const weatherForecast = document.querySelector(`#weatherForecast`)

const myKey = "c54961ec375d33ae24655a5f694ccd3b"
const myLat = "36.27"
const myLong = "-84.49"

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&units=imperial&appid=${myKey}`


async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
            
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}


    function displayResults(data) { 
        currentTemp.innerHTML = `${data.main.temp}&deg;F`;
        const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        let desc = data.weather[0].description;
        weatherIcon.setAttribute('src', iconSrc);
        weatherIcon.setAttribute('alt', data.weather[0].description);
        captionDesc.textContent = `${desc}`;

    }

apiFetch();