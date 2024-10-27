let currentYear = document.querySelector("#currentYear");
let lastModified = document.querySelector("#lastModified");
const today = new Date();
currentYear.textContent = today.getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

// **********************************
// Code for hamburger button
// ***********************************
const hamburgerElement = document.querySelector('#myButton');
const navElement = document.querySelector('.menuLinks');

hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
});

// // ***********************************
// path to url (API) on Community Events page
// ****************************************

const myKey = "csAZxKkJtPr2yXak1avHGHoa4ATqXbps"


const url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=csAZxKkJtPr2yXak1avHGHoa4ATqXbps&city=atlanta";

async function getData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json._embedded.events;
    } catch (error) {
        console.error(error.message);
    }
} 

    
async function buildItems() {
    const events = await getData();
    const container = document.querySelector('.eventsContainer');
    events.slice(0, 15).forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.className = 'event-item';
        eventItem.textContent = event.name;
        eventItem.addEventListener('click', () => displayEventDetails(event));
        container.appendChild(eventItem);
    });
 }

 const eventInformation = document.querySelector(`#eventInformation`);

 function displayEventDetails(event) {
    eventInformation.innerHTML = `
        <button id="closeModal">❌</button>   
        <h2>${event.name}</h2>
        <p>${event.dates.start.localDate}</p>
        <p>${event._embedded.venues[0].name}</p>
        <p>${event.info || 'No additional information available.'}</p>
    `
    eventInformation.showModal();

    const closeModal = document.querySelector("#closeModal");
    closeModal.addEventListener("click", () => {
        eventInformation.close(); 
    });
 }
         


buildItems();

// // *********************************
// Local storage Resident resource page
// ************************************


const welcomeMessage = document.querySelector('#message');

const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
const lastVisited = new Date(localStorage.getItem('lastVisited')) || todayUTC;
const msToDays = 86400000;

if (welcomeMessage) {
    if (lastVisited.toString() == todayUTC.toString()) {
        welcomeMessage.textContent = `Thank you for visiting. Please complete the form below to submit your request.`;
    } else if (todayUTC.getDate() - 1 == lastVisited.getDate()) {
        welcomeMessage.textContent = `Welcome back! It appears you've previously requested information. For an immediate response, please call (678) 968-2568 rather than resubmitting this form.`;
    } else {
        const daysSince = (Date.now() - lastVisited.getTime()) / msToDays;
        welcomeMessage.innerHTML = `You last visited ${Math.floor(daysSince)} days ago.`;
    }

    localStorage.setItem('lastVisited', todayUTC);
}