import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import { getDatabase,ref,push,onValue,remove,set } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const appSetting = { 
    databaseURL: "https://supermall-72728-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSetting);
const database = getDatabase(app);
const UserListInDB = ref(database, "ad_users");

const ad_username=document.querySelector("#ad_username");
const ad_password=document.querySelector("#ad_password");
const ad_frm=document.querySelector("#frm");

ad_frm.addEventListener("submit", function (e) {
    e.preventDefault();

    const enteredUsername = ad_username.value.trim();
    const enteredPassword = ad_password.value.trim();

    if (!enteredUsername || !enteredPassword) {
        alert("Please enter both username and password.");
        return;
    }

    onValue(UserListInDB, function (snapshot) {
        if (snapshot.exists()) {
            const users = snapshot.val();
            let loginSuccess = false;

            Object.values(users).forEach(user => {
                if (user.ad_username === enteredUsername && user.ad_password === enteredPassword) {
                    loginSuccess = true;
                }
            });

            if (loginSuccess) {
                window.location.href = "admin-dashboard.html";
            } else {
                alert("Invalid username or password.");
            }
        } else {
            alert("No users found in the database.");
        }
    });
});

 ad_frm.addEventListener("submit", function(e){
     e.preventDefault();
     const newUser={
         ad_username: ad_username.value.trim(),
         ad_password: ad_password.value.trim(),
    };
     push(UserListInDB, newUser);
     console.log("element added");
 });
