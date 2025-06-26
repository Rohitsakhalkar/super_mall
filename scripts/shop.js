// shop.js

// Reference to Firestore
const db = firebase.firestore();

// Add new shop to Firestore
function addShop(shopDetails) {
  db.collection("shops").add(shopDetails)
    .then((docRef) => {
      console.log("Shop added with ID:", docRef.id);
      // Additional actions after adding a shop (e.g., redirect)
    })
    .catch((error) => {
      console.error("Error adding shop:", error);
    });
}

// Update shop details in Firestore
function updateShop(shopId, updatedDetails) {
  db.collection("shops").doc(shopId).update(updatedDetails)
    .then(() => {
      console.log("Shop updated successfully");
      // Additional actions after updating shop
    })
    .catch((error) => {
      console.error("Error updating shop:", error);
    });
}

// Get all shops from Firestore
function getShops() {
  db.collection("shops").get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    })
    .catch((error) => {
      console.error("Error getting shops:", error);
    });
}
