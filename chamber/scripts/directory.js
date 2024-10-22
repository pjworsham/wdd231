let currentYear = document.querySelector("#currentYear");
let lastModified = document.querySelector("#lastModified");
const today = new Date();
currentYear.textContent = today.getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

//Code for hamburger button
const hamburgerElement = document.querySelector('#myButton');
const navElement = document.querySelector('.menuLinks');

hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
});

const url = "https://pjworsham.github.io/wdd231/chamber/data/members.json"
const membersCard = document.querySelector(`#membersCard`);
const membersList = document.querySelector(`#membersList`);

async function getMembersData() {
    const response = await fetch(url);
    const data = await response.json();
    return data;
} 

async function createMemberCards() {
    membersCard.innerHTML = ``;
    membersList.innerHTML = ``;
    const data = await getMembersData();
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

        membersCard.appendChild(card);
    });        
}

async function createMemberList() {
    membersCard.innerHTML = ``;
    membersList.innerHTML = ``;
    const data = await getMembersData();
    data.forEach(member => {
        const list = document.createElement(`div`)
        list.setAttribute(`id`, `businessList`);

        list.innerHTML = `
        <div class="listHeader">
            <div class="contactInfo1">
                <h3>${member.title}</h3>
                <p> ${member.address}</p>
                <p> ${member.phoneNumber}</p>
            </div>
        </div>

        `;
        membersList.appendChild(list);
    })
}

const cardView = document.querySelector(`#cardView`);
const listView = document.querySelector(`#listView`);

cardView.addEventListener(`click`, () => {
    createMemberCards();
})

listView.addEventListener(`click`, () => {
    createMemberList();
})


createMemberCards();

// **************************************
// Discover Page
// **************************************

const welcomeMessage = document.querySelector('#welcomeMessage');

const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
const lastVisited = new Date(localStorage.getItem('lastVisited')) || todayUTC;
const msToDays = 86400000;

if (welcomeMessage) {
    if (lastVisited.toString() == todayUTC.toString()) {
        welcomeMessage.textContent = `Welcome! Let us know if you have any questions.`;
    } else if (todayUTC.getDate() - 1 == lastVisited.getDate()) {
        welcomeMessage.textContent = `Back so soon! Awesome!`;
    } else {
        const daysSince = (Date.now() - lastVisited.getTime()) / msToDays;
        welcomeMessage.innerHTML = `You last visited ${Math.floor(daysSince)} days ago.`;
    }

    localStorage.setItem('lastVisited', todayUTC);
}
