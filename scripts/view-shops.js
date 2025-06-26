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

// Reference to the 'shops' collection
const shopsRef = ref(database, "shops");

// DOM Element to display shops
const shopsListElement = document.getElementById("shops-list");

// Function to Fetch and Display Shops
function displayShops() {
  onValue(shopsRef, (snapshot) => {
    shopsListElement.innerHTML = ""; // Clear existing content

    if (snapshot.exists()) {
      const shops = snapshot.val();

      Object.values(shops).forEach((shop) => {
        const shopElement = document.createElement("div");
        shopElement.className = "shop-item";
        shopElement.innerHTML = `
          <h3>${shop.shopName}</h3>
          <p><strong>Category:</strong> ${shop.shopCategory}</p>
          <p><strong>Floor:</strong> ${shop.shopFloor}</p>
          <p><strong>Owner:</strong> ${shop.ownerName}</p>
        `;
        shopsListElement.appendChild(shopElement);
      });
    } else {
      shopsListElement.innerHTML = "<p>No shops available at the moment.</p>";
    }
  });
}

// Call the function to display shops
displayShops();
