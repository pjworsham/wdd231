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


async function getMembersData() {
    const response = await fetch(url);
    const data = await response.json();
    createMemberCards(data);
} 

function createMemberCards(data) {
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



const cardView = document.querySelector(`#cardView`);
const listView = document.querySelector(`#listView`);

cardView.addEventListener(`click`, () => {
    getMembersData();
})

listView.addEventListener(`click`, () => {

})


getMembersData();

