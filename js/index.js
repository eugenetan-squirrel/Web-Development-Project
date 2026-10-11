import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, updateDoc, increment, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyAwqnfRXzNVNx0CtoaBTdbn5koPkgcVc_w",
authDomain: "my-webpage-67isded.firebaseapp.com",
projectId: "my-webpage-67isded",
storageBucket: "my-webpage-67isded.firebasestorage.app",
messagingSenderId: "203044731298",
appId: "1:203044731298:web:71eb27c97f212829ff9afb",
measurementId: "G-6NBGPHRVEL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const ref = doc(db, "stats", "subscriptions");

async function loadCount() {
  const snap = await getDoc(ref);
  document.getElementById("count").textContent = snap.data().count;
  loadCount();
}

let state = null;

async function vote(type, button) {
  const upBtn = document.getElementById("upvote");
  const downBtn = document.getElementById("downvote");

  if (state === null) {
    await updateDoc(ref, { count: increment(type === 'up' ? 1 : -1)})
    document.querySelector("#"+type).innerText = (type === 'up' ? "Upvoted" : "Downvoted");
    state = type;
  } else if (state === type) {
    await updateDoc(ref, { count: increment(type === 'up' ? -1 : 1) });
    document.querySelector("#"+state).innerText = (type === 'up' ? "Upvote!" : "Downvote!");
    state = null;
  } else {
    await updateDoc(ref, { count: increment(type === 'up' ? 2 : -2) });
    document.querySelector("#"+state).innerText = (state === 'up' ? "Upvote!" : "Downvote!");
    document.querySelector("#"+type).innerText = (type === 'up' ? "Upvoted" : "Downvoted");
    state = type;
  }
}

window.vote = vote;
loadCount();