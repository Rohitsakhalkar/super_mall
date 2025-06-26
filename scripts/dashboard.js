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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// References to Database Paths
const shopsRef = ref(database, "shops");
const offersRef = ref(database, "offers");

// DOM Elements
const totalShopsElement = document.getElementById("total-shops");
const totalOffersElement = document.getElementById("total-offers");
const totalFloorsElement = document.getElementById("total-floors");

// Function to Count and Display Shops
function displayTotalShops() {
  onValue(shopsRef, (snapshot) => {
    if (snapshot.exists()) {
      const totalShops = Object.keys(snapshot.val()).length;
      totalShopsElement.textContent = totalShops;
    } else {
      totalShopsElement.textContent = 0;
    }
  });
}

// Function to Count and Display Offers
function displayTotalOffers() {
  onValue(offersRef, (snapshot) => {
    if (snapshot.exists()) {
      const totalOffers = Object.keys(snapshot.val()).length;
      totalOffersElement.textContent = totalOffers;
    } else {
      totalOffersElement.textContent = 0;
    }
  });
}

// Function to Find and Display Maximum Floor
function displayTotalFloors() {
  onValue(shopsRef, (snapshot) => {
    if (snapshot.exists()) {
      const shops = snapshot.val();
      const floors = Object.values(shops).map((shop) => parseInt(shop.shopFloor, 10));
      
      const maxFloor = floors.length > 0 ? Math.max(...floors) : 0;
      totalFloorsElement.textContent = maxFloor;
    } else {
      totalFloorsElement.textContent = 0;
    }
  });
}

// Call Functions to Display Data
displayTotalShops();
displayTotalOffers();
displayTotalFloors();
