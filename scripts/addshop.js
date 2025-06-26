import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

// Firebase configuration
const appSetting = {
  databaseURL: "https://supermall-72728-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(appSetting);
const database = getDatabase(app);
const shopListInDB = ref(database, "shops");

// Get form and input elements
const shopForm = document.querySelector("#shopForm");
const shopName = document.querySelector("#shopName");
const ownerName = document.querySelector("#ownerName");
const shopCategory = document.querySelector("#shopCategory");
const shopFloor = document.querySelector("#shopFloor");

// Handle form submission
shopForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Capture form data
  const newShop = {
    shopName: shopName.value.trim(),
    ownerName: ownerName.value.trim(),
    shopCategory: shopCategory.value.trim(),
    shopFloor: shopFloor.value.trim(),
  };

  // Validate form data
  if (!newShop.shopName || !newShop.ownerName || !newShop.shopCategory || !newShop.shopFloor) {
    alert("Please fill out all fields.");
    return;
  }

  // Push new shop data to Firebase
  push(shopListInDB, newShop)
    .then(() => {
      alert("Shop added successfully!");
      shopForm.reset();
      window.location.href = "admin-dashboard.html";
    })
    .catch((error) => {
      console.error("Error adding shop:", error);
      alert("Failed to add shop. Please try again.");
    });
});
