import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, onValue, remove, update } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

// Firebase Configuration
const appSetting = { 
     databaseURL: "https://super-mall-f6a40-default-rtdb.firebaseio.com",
};

const app = initializeApp(appSetting);
const database = getDatabase(app);
const shopsRef = ref(database, "shops");

// DOM Elements
const viewShopsBtn = document.getElementById("viewShopsBtn");
const shopsContainer = document.getElementById("shopsContainer");
const shopList = document.getElementById("shopList");
const editFormContainer = document.getElementById("editFormContainer");
const editShopForm = document.getElementById("editShopForm");
const formTitle = document.getElementById("formTitle");
const confirmActionBtn = document.getElementById("confirmActionBtn");
const cancelActionBtn = document.getElementById("cancelActionBtn");

// Function to Display Shops
function displayShops() {
    shopsContainer.classList.remove("hidden");
    editFormContainer.classList.add("hidden");
    shopList.innerHTML = "";

    onValue(shopsRef, (snapshot) => {
        if (snapshot.exists()) {
            const shops = snapshot.val();
            Object.keys(shops).forEach((key) => {
                const shop = shops[key];
                const shopElement = document.createElement("div");
                shopElement.className = "shop-item";
                shopElement.innerHTML = `
                <div>
                    <strong>${shop.shopName}</strong> (Owner: ${shop.ownerName}, Floor: ${shop.shopFloor})
                </div>
                <div>
                    <button class="modify-btn" data-key="${key}">Modify</button>
                    <button class="delete-btn" data-key="${key}">Remove</button>
                </div>
                `;

                shopList.appendChild(shopElement);
            });

            // Add Event Listeners for Modify and Remove Buttons
            document.querySelectorAll(".modify-btn").forEach((button) => {
                button.addEventListener("click", () => showEditForm(button.dataset.key, "Modify"));
            });

            document.querySelectorAll(".delete-btn").forEach((button) => {
                button.addEventListener("click", () => showEditForm(button.dataset.key, "Remove"));
            });
        } else {
            shopList.innerHTML = "<p>No shops available.</p>";
        }
    });
}

// Show Edit Form for Modify or Remove Action
function showEditForm(key, action) {
    formTitle.textContent = `${action} Shop`;
    confirmActionBtn.textContent = `${action} Shop`;
    document.getElementById("shopId").value = key;

    if (action === "Modify") {
        editFormContainer.classList.remove("hidden");
    } else if (action === "Remove") {
        if (confirm("Are you sure you want to remove this shop?")) {
            remove(ref(database, `shops/${key}`))
                .then(() => {
                    alert("Shop removed successfully!");
                    displayShops();
                })
                .catch((error) => alert("Error removing shop: " + error));
        }
    }
}

// Handle Form Submit for Modify
editShopForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const shopId = document.getElementById("shopId").value.trim();
    const updatedShop = {
        shopName: document.getElementById("shopName").value.trim(),
        ownerName: document.getElementById("shopOwner").value.trim(),
        shopFloor: document.getElementById("shopFloor").value.trim(),
    };

    update(ref(database, `shops/${shopId}`), updatedShop)
        .then(() => {
            alert("Shop details updated successfully!");
            displayShops();
            editFormContainer.classList.add("hidden");
        })
        .catch((error) => alert("Error updating shop: " + error));
});

// Cancel Button
cancelActionBtn.addEventListener("click", () => {
    editFormContainer.classList.add("hidden");
    shopsContainer.classList.add("hidden");
});

// Event Listener for Viewing Shops
viewShopsBtn.addEventListener("click", displayShops);
