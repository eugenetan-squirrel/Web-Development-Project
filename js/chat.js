import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    getDatabase,
    ref,
    push,
    serverTimestamp,
    onChildAdded,
    onChildRemoved,
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDdpLMoyTHl7KZOwgD4FPEC1HxYd9I1Wfg",
    authDomain: "realtime-chatapp-2502f.firebaseapp.com",
    databaseURL: "https://realtime-chatapp-2502f-default-rtdb.firebaseio.com",
    projectId: "realtime-chatapp-2502f",
    storageBucket: "realtime-chatapp-2502f.firebasestorage.app",
    messagingSenderId: "558198581138",
    appId: "1:558198581138:web:745a785b310650a9d4834b",
    measurementId: "G-JS8X7G4MV1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const enterChatButton = document.getElementById("enterChatButton");
const nameInput = document.getElementById("nameInput");
const nameError = document.getElementById("nameError");
const nameInputContainer = document.getElementsByClassName("nameInputContainer")[0];
const chatContainer = document.getElementsByClassName("chatContainer")[0];
const msgInput = document.getElementById("msgInput");
const sendMsgButton = document.getElementById("sendMsgButton");
const messages = document.querySelector(".textMsgs");

chatContainer.style.display = "none";

nameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        enterChatButton.click();
    }
});

msgInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMsgButton.click();
    }
});

enterChatButton.addEventListener("click", async () => {
    const username = nameInput.value.trim();

    if (username.length === 0) {
        nameError.textContent = "Please enter a name.";
        return;
    }

    if (username.length > 20) {
        nameError.textContent = "Name must be 20 characters or less.";
        nameInput.focus();
        nameInput.value = "";
        return;
    }

    if (username.length < 4) {
        nameError.textContent = "Name must be at least 4 characters long.";
        nameInput.focus();
        nameInput.value = "";
        return;
    }

    nameError.textContent = "";
    nameInputContainer.style.display = "none";
    chatContainer.style.display = "block";
    msgInput.focus();
    messages.scrollTop = messages.scrollHeight;
});

sendMsgButton.addEventListener("click", async () => {
    const message = msgInput.value.trim();

    if (message.length === 0) return;

    await push(ref(db, "messages"), {
        username: nameInput.value.trim(),
        message,
        timestamp: serverTimestamp(),
    });
    msgInput.value = "";
    msgInput.focus();
});

onChildAdded(ref(db, "messages"), (snapshot) => {
    const data = snapshot.val();
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.dataset.id = snapshot.key;
    messageElement.textContent = `${data.username}: ${data.message}`;
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
});

onChildRemoved(ref(db, "messages"), (snapshot) => {
    const messageElement = messages.querySelector(`[data-id="${snapshot.key}"]`);
    if (messageElement) {
        messages.removeChild(messageElement);
    }
});