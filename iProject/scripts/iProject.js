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

// **********************************
// Resident Resource Page
// ***********************************


const resources = [
    {
        "business": "Hey Dude Plumbing",
        "contactInformation": [
            "ADDRESS: 113 N Industrial Gate Dr. Ball Ground, GA 30107",
            "PHONE NUMBER: 555-850-6321",
            "EMAIL: heydue@pluming.com"
        ]
    },
    {
        "business": "Cobb Electric",
        "contactInformation": [
            "ADDRESS: 1000 EMC Parkway, Marietta, GA 30060",
            "PHONE NUMBER: 575-610-5786",
            "EMAIL: cobbelectric@electric.com"
        ]
    },
    {
        "business": "Waste Management",
        "contactInformation": [
            "ADDRESS: 13805 E Cherokee Drive, Ball Ground, GA 30107",
            "PHONE NUMBER: 555-794-6707",
            "EMAIL: Waste@sanitation.com"
        ]
    },
    {
        "business": "Water Solutions of Georgia",
        "contactInformation": [
            "ADDRESS: 140 W Main Street, Canton, GA 30114",
            "PHONE NUMBER: 555-493-8738",
            "EMAIL: watersolutions@water.com"
        ]
    },
    {
        "business": "Handy Man",
        "contactInformation": [
            "ADDRESS: 321 Cherokee Drive, Woodstock, GA 30102",
            "PHONE NUMBER: 555-850-6321",
            "EMAIL: handyman@repair.com"
        ]
    },
    {
        "business": "Tree and Landscape",
        "contactInformation": [
            "ADDRESS: 207 Brice Road, Ball Ground, GA 30107",
            "PHONE NUMBER: 555-648-9924",
            "EMAIL: treeandlandscape@removal.com"
        ]
    }
]
const resResourcesElement = document.querySelector(".res-resources")

if (resResourcesElement) {

// **************************
// Creates Resources Reference
// **************************

    function createGsCard(gsResources) {
        const contactCard = document.createElement("div")
        contactCard.innerHTML = `
            <h4>${gsResources.business} Business Resource</h4>
            <button class="open-button-${gsResources.business}">Information</button>
        `
        resResourcesElement.appendChild(contactCard)

        document
            .querySelector(`.open-button-${gsResources.business}`)
            .addEventListener("click", () => {
                createContactModal(gsResources)
            })
    }    
 
    // *****************************
    // Create Resource modal
    // *****************************
    function createContactModal(gsResources) {
        let gsResourceDialogBox = document.querySelector(".dialog-box")
        gsResourceDialogBox.innerHTML = `
            <p>Business: ${gsResources.business}</p>
            <h4>Contact Information:</h4>
        `   
        gsResources.contactInformation.forEach(info => {
            gsResourceDialogBox.innerHTML += `${info}<br>`
        });          
                
        gsResourceDialogBox.innerHTML += `<button class="close-button-${gsResources.business}">Close</button>`
    
        gsResourceDialogBox.showModal()
    
        document
            .querySelector(`.close-button-${gsResources.business}`)
            .addEventListener("click", () => {
                gsResourceDialogBox.close()
            })
    }
    
    resources.forEach(gsResources => {
        createGsCard(gsResources)
    });
}

