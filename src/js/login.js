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

const email = document.getElementById('email');
const password = document.getElementById('password');
const buttonLogin = document.getElementById('button-login');
const names = document.getElementById('names');
const lastnames = document.getElementById('lastnames');
const emailRegister = document.getElementById('emailRegister');
const passRegister = document.getElementById('passRegister');
const buttonRegister = document.getElementById('buttonRegister');
const buttonLogOut = document.getElementById('logOut');
const linkLogin = document.getElementById('linkLogin');
const loginFacebook = document.getElementById('loginFacebook');
const loginGoogle = document.getElementById('loginGoogle');

buttonLogin.addEventListener('click', () => {
	firebase.auth().signInWithEmailAndPassword(email.value, password.value)
		.then((result) => {
			localStorage.setItem('email', email.value);
			location.href = 'home.html';
		})
		.catch((error) => {
			let errorCode = error.code;
			if (errorCode === 'auth/wrong-password') {
				alert('Contraseña incorrecta.');
			}
			else {
				alert('Usuario o contraseña incorrecto');
			}
		});
});

buttonRegister.addEventListener('click', () => {
	firebase.auth().createUserWithEmailAndPassword(emailRegister.value, passRegister.value)
		.then((result) => {
			firebase.auth().onAuthStateChanged((user) => {
				if (user) {
					const registeredUser = registerUserProfile(user.uid, names.value, lastnames.value, emailRegister.value);
					if (registeredUser == 1) {
						alert('El usuario ha sido registrado, Ahora ya puede ingresar');
					}
					else {
						alert('El usuario no se ha podido registrar');
					}

					console.log(registeredUser)
				}
			});
			linkLogin.click();
		})
		.catch((error) => {
			let errorCode = error.code;
			if (errorCode === 'auth/email-already-in-use') {
				alert('El correo ya se encuentra registrado.');
			}
			else if (errorCode === 'auth/weak-password') {
				alert('La contraseña es demasiado debil.');
			}
			else if (errorCode === 'auth/invalid-email') {
				alert('El correo es invalido.');
			}
		});
});



let providerFacebook = new firebase.auth.FacebookAuthProvider();

loginFacebook.addEventListener('click', () => {
	firebase.auth().signInWithPopup(providerFacebook).then(function(result) {
		   const token = result.credential.accessToken;
		   const user = result.user;
		   const registeredUser = registerUserProfile(user.uid, names.value, lastnames.value, emailRegister.value);

		  location.href = 'home.html';

		 }).catch(function(error) {
		   
		   const errorCode = error.code;
		   const errorMessage = error.message;
		   const email = error.email;
		   const credential = error.credential;
		   alert(errorCode,errorMessage,email,credential);		   
		 });
	   
});

	
let providerGoogle = new firebase.auth.GoogleAuthProvider();

loginGoogle.addEventListener('click', () => {
	firebase.auth().signInWithPopup(providerGoogle).then(function (result) {
		const token = result.credential.accessToken;
		const user = result.user;
		location.href = 'home.html';

	}).catch(function (error) {

		const errorCode = error.code;
		const errorMessage = error.message;
		const email = error.email;
		const credential = error.credential;
		alert(errorCode, errorMessage, email, credential);
	});
})