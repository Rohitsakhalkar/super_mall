import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, onValue, push, remove, update } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

// Firebase Configuration
const appSetting = { 
     databaseURL: "https://super-mall-f6a40-default-rtdb.firebaseio.com",
};

const app = initializeApp(appSetting);
const database = getDatabase(app);
const offersRef = ref(database, "offers");

// DOM Elements
const viewOffersBtn = document.getElementById("viewOffersBtn");
const offersContainer = document.getElementById("offersContainer");
const offerList = document.getElementById("offerList");
const addOfferBtn = document.getElementById("addOfferBtn");
const offerFormContainer = document.getElementById("offerFormContainer");
const offerForm = document.getElementById("offerForm");
const formTitle = document.getElementById("formTitle");
const confirmActionBtn = document.getElementById("confirmActionBtn");
const cancelActionBtn = document.getElementById("cancelActionBtn");

// Function to Display Offers
function displayOffers() {
    offersContainer.classList.remove("hidden");
    offerFormContainer.classList.add("hidden");
    offerList.innerHTML = "";

    onValue(offersRef, (snapshot) => {
        if (snapshot.exists()) {
            const offers = snapshot.val();
            Object.keys(offers).forEach((key) => {
                const offer = offers[key];
                const offerElement = document.createElement("div");
                offerElement.className = "offer-item";
                offerElement.innerHTML = `
                <div>
                    <strong>Shop:</strong> ${offer.shopName} <br>
                    <strong>Offer:</strong> ${offer.details} <br>
                    <strong>Ends On:</strong> ${offer.offerEndDate}
                </div>
                <div>
                    <button class="modify-btn" data-key="${key}">Modify</button>
                    <button class="delete-btn" data-key="${key}">Remove</button>
                </div>
                `;

                offerList.appendChild(offerElement);
            });

            // Add Event Listeners for Modify and Remove Buttons
            document.querySelectorAll(".modify-btn").forEach((button) => {
                button.addEventListener("click", () => showOfferForm(button.dataset.key, "Modify"));
            });

            document.querySelectorAll(".delete-btn").forEach((button) => {
                button.addEventListener("click", () => removeOffer(button.dataset.key));
            });
        } else {
            offerList.innerHTML = "<p>No offers available.</p>";
        }
    });
}

// Show Form for Add or Modify Action
function showOfferForm(key = null, action = "Add") {
    formTitle.textContent = `${action} Offer`;
    confirmActionBtn.textContent = `${action} Offer`;
    offerForm.reset();
    document.getElementById("offerId").value = key || "";

    if (action === "Modify") {
        onValue(ref(database, `offers/${key}`), (snapshot) => {
            if (snapshot.exists()) {
                const offer = snapshot.val();
                document.getElementById("shopName").value = offer.shopName;
                document.getElementById("offerEndDate").value = offer.offerEndDate;
                document.getElementById("offerDetails").value = offer.details;
            }
        });
    }

    offersContainer.classList.add("hidden");
    offerFormContainer.classList.remove("hidden");
}

// Handle Form Submission for Add or Modify
offerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const offerId = document.getElementById("offerId").value.trim();
    const offerData = {
        shopName: document.getElementById("shopName").value.trim(),
        offerEndDate: document.getElementById("offerEndDate").value.trim(),
        details: document.getElementById("offerDetails").value.trim(),
    };

    if (offerId) {
        // Update Offer
        update(ref(database, `offers/${offerId}`), offerData)
            .then(() => {
                alert("Offer updated successfully!");
                displayOffers();
                offerFormContainer.classList.add("hidden");
            })
            .catch((error) => alert("Error updating offer: " + error));
    } else {
        // Add New Offer
        push(offersRef, offerData)
            .then(() => {
                alert("Offer added successfully!");
                displayOffers();
                offerFormContainer.classList.add("hidden");
            })
            .catch((error) => alert("Error adding offer: " + error));
    }
});

// Remove Offer Function
function removeOffer(key) {
    if (confirm("Are you sure you want to remove this offer?")) {
        remove(ref(database, `offers/${key}`))
            .then(() => {
                alert("Offer removed successfully!");
                displayOffers();
            })
            .catch((error) => alert("Error removing offer: " + error));
    }
}

// Cancel Button Event
cancelActionBtn.addEventListener("click", () => {
    offerFormContainer.classList.add("hidden");
    offersContainer.classList.add("hidden");
});

// Event Listener for Viewing Offers
viewOffersBtn.addEventListener("click", displayOffers);

// Event Listener for Adding Offers
addOfferBtn.addEventListener("click", () => showOfferForm(null, "Add"));
