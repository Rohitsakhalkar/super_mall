import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9ubFg1wJRYynXPEGoQTibWEBfyPf7uCg",
  authDomain: "super-mall-f6a40.firebaseapp.com",
  databaseURL: "https://super-mall-f6a40-default-rtdb.firebaseio.com/",
  projectId: "super-mall-f6a40",
  storageBucket: "super-mall-f6a40.firebasestorage.app",
  messagingSenderId: "322437054629",
  appId: "1:322437054629:web:92a69946a313702a000d4c",
  measurementId: "G-ZE90PC8MMQ"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Reference to the 'offers' collection
const offersRef = ref(database, "offers");

// DOM Element to display offers
const offersListElement = document.getElementById("offers-list");

// Function to Fetch and Display Offers
function displayOffers() {
  onValue(offersRef, (snapshot) => {
    offersListElement.innerHTML = ""; // Clear existing content

    if (snapshot.exists()) {
      const offers = snapshot.val();

      Object.values(offers).forEach((offer) => {
        const offerElement = document.createElement("div");
        offerElement.className = "offer-item";
        offerElement.innerHTML = `
          <p><strong>Shop Name:</strong> ${offer.shopName}</p>
          <p><strong>Offer Ends On:</strong> ${offer.offerEndDate}</p>
          <p><strong>Details:</strong> ${offer.details}</p>
        `;
        offersListElement.appendChild(offerElement);
      });
    } else {
      offersListElement.innerHTML = "<p>No offers available at the moment.</p>";
    }
  }, (error) => {
    console.error("Error fetching offers:", error);
    offersListElement.innerHTML = "<p>Failed to load offers. Please try again later.</p>";
  });
}

// Call the function to display offers
displayOffers();
