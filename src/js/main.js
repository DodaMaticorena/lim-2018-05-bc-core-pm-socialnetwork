// Initialize Firebase
let config = {
	apiKey: "AIzaSyCrbUbq0oD49Yzk_eryDiJoseqOC6vUIcg",
	authDomain: "pet-health-social-network.firebaseapp.com",
	databaseURL: "https://pet-health-social-network.firebaseio.com",
	projectId: "pet-health-social-network",
	storageBucket: "pet-health-social-network.appspot.com",
	messagingSenderId: "838633128523"
};
firebase.initializeApp(config);

const buttonLogOut = document.getElementById('logOut');

buttonLogOut.addEventListener('click',()=>{
  firebase.auth().signOut();
  location.href = 'index.html';
})

window.onload = () =>{
	const message = document.getElementById('message');
	const emailMessage = localStorage.getItem('email');
}