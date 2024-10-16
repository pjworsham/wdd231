let currentYear = document.querySelector("#currentYear");
let lastModified = document.querySelector("#lastModified");
const today = new Date();
currentYear.textContent = today.getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

const todayForecast = document.querySelector(`#todayForecast`)

const currentTemp = document.querySelector(`#current-temp`);
const weatherIcon = document.querySelector(`#weather-icon`);
const captionDesc = document.querySelector(`figcaption`);
const weatherForecast = document.querySelector(`#weatherForecast`)
const high = document.querySelector(`#high-temp`)
const low = document.querySelector(`#low-temp`)
const humidity = document.querySelector(`#humidity-temp`)

const myKey = "c54961ec375d33ae24655a5f694ccd3b"
const myLat = "34.23"
const myLong = "-84.49"

// ****************
// path to url
// ****************
const weatherUrl = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&units=imperial&appid=${myKey}`

const forecastUrl = `//api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&units=imperial&appid=${myKey}`

// ***************************************
// getting the weather
// **************************************
async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayWeatherResults(data);       
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayWeatherResults(data) { 
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
        const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        weatherIcon.setAttribute('src', iconSrc);
        weatherIcon.setAttribute('alt', data.weather[0].description);
        let desc = data.weather[0].description;
        captionDesc.textContent = `${desc}`;
        high.innerHTML = `${data.main.temp_max}&deg;F`;
        low.innerHTML = `${data.main.temp_min}&deg;F`;
        humidity.innerHTML = `${data.main.humidity}%`;
    }

    fetchWeather();
    
    // ***************************
    // getting the forecast 
    // ****************************
async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const dataF = await response.json();
            console.log(dataF);
            displayForecastResults(dataF);
            
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

fetchForecast();

// //***************************************
// Get forecast function
// ***************************************** */
function displayForecastResults(dataF) { 
    displayWeatherForecast(dataF);
}

const displayWeatherForecast = (forecastData) => {
    const forecastContainer = document.querySelector(`#weatherForecast`);
    forecastContainer.innerHTML = ``;

    const day0 = document.createElement(`p`);
    const day1 = document.createElement(`p`);
    const day2 = document.createElement(`p`);

    const day0Data = forecastData.list[0]; //current day forecast
    const day1Data = forecastData.list[8]; //24 hours later forecast
    const day2Data = forecastData.list[16]; //48 hours later forecast

    const day0Date = new Date(day0Data.dt * 1000);
    const day1Date = new Date(day1Data.dt * 1000);
    const day2Date = new Date(day2Data.dt * 1000);


//get the day of the week (0-6) and map it to the corresponding day name
    const day0Name = weekday[day0Date.getDay()];
    const day1Name = weekday[day1Date.getDay()];
    const day2Name = weekday[day2Date.getDay()];


 // set the text for each day   
    day0.innerHTML = `Today: ${day0Data.main.temp}&deg;F`;
    day1.innerHTML = `${day1Name}: ${day1Data.main.temp}&deg;F`;
    day2.innerHTML = `${day2Name}: ${day2Data.main.temp}&deg;F`;


//append the day elements to the forecast container
    forecastContainer.appendChild(day0);
    forecastContainer.appendChild(day1);
    forecastContainer.appendChild(day2);

}
const weekday = [
    'Sunday',
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`
]

// //***********************************
// Get member card
// ************************************ */
const memberUrl = "https://pjworsham.github.io/wdd231/chamber/data/members.json"

const businessCard = document.querySelector(`#businessCard`);

async function fetchBusinessCards() {
    try {
        const response = await fetch(memberUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("unable to fetch business cards:", error);
    }  
} 

async function displayBusinessCards() {
    const data = await fetchBusinessCards();
    let filteredData = data;

    for (let i = filteredData.length; i > 3; i--) {
        const randomIndex = Math.random() * filteredData.length;
        filteredData.splice(randomIndex, 1);
        console.log(filteredData);
    }
    // console.log(data);
    createMemberCards(filteredData);
}
displayBusinessCards();


function createMemberCards(data) {
    const businessCard = document.querySelector(`#businessCard`);
    businessCard.innerHTML = '';

    data.forEach(member => {
        const card = document.createElement(`div`);
        card.setAttribute(`id`, `businessCard1`);

        card.innerHTML = `
            <div class="cardHeader1">
                <img src="${member.images}" alt="${member.title}" class="img1">
                <div class="contactInfo1">
                    <h3>${member.title}<br>${member.names}</h3>
                    <p> ${member.address}</p>
                    <p> ${member.phoneNumber}</p>
                    <p> ${member.url}</p>
                    <p>Membership Level: ${member.membershipLevel}</p>
                </div>
            </div>
        `;

        businessCard.appendChild(card);
    });        
}

 // ****************************************
    // for join html 
    // *****************************************

    const openButton1 = document.querySelector('.openButton1');
    const openButton2 = document.querySelector('.openButton2');
    const openButton3 = document.querySelector('.openButton3');
    const openButton4 = document.querySelector('.openButton4');
    const dialogBox1 = document.querySelector('.dialogBox1');
    const dialogBox2 = document.querySelector('.dialogBox2');
    const dialogBox3 = document.querySelector('.dialogBox3');
    const dialogBox4 = document.querySelector('.dialogBox4');
    const closeButton = document.querySelector('.closeButton');


    function addDialog(openButton, dialogBox) {
        openButton.addEventListener('click', () => {
            dialogBox.showModal();
    });
    }  
    
    addDialog(openButton1, dialogBox1);
    addDialog(openButton2, dialogBox2);
    addDialog(openButton3, dialogBox3);
    addDialog(openButton4, dialogBox4);

    

    closeButton.addEventListener('click', () => {
        dialogBox.close();
    })




