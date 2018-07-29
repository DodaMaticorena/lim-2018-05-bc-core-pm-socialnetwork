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
const eventLogin = document.getElementById('eventLogin');

buttonLogin.addEventListener('click', () => {
  const callback = (error, result) => {
    if (!error) {
      localStorage.setItem('email', result.email);
      location.href = 'home.html';
    } else {
      let errorCode = error.code;
      if (errorCode === 'auth/wrong-password') {
        alert('Contraseña incorrecta.');
      }
      else {
        alert('Usuario o contraseña incorrecto');
      }
    }
  }
  logIn(email.value, password.value, callback);
});

let dataUser = {
  id: null,
  username: null,
  email: null,
  picture: ''
}

buttonRegister.addEventListener('click', () => {
	const dataUser = {
		id: null,
		username: '',
		email: '',
		picture: ''
	}
	
	dataUser.username = names.value + ' '+ lastnames.value;
	dataUser.email = emailRegister.value;
	const callback = (error, result) => {
		if (!error) {
			dataUser.id = result.user.uid;
			console.log(result.user.uid);
			console.log(dataUser)
			registerUserProfile(dataUser);
			alert('El usuario ha sido registrado, Ahora ya puede ingresar');
			linkLogin.click();
			email.value = result.user.email;
			console.log(result.user.email);
		} else {
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
			else {
				alert('El usuario no se ha podido registrar');
			}
		}	
	}
	createUser(emailRegister.value, passRegister.value, callback);
});

eventLogin.addEventListener('click', (event) => {
  const callback = (error, result) => {
    if (!error) {
      dataUser.id = result.uid;
      dataUser.username = result.displayName;
      dataUser.email = result.email;
      location.href = 'home.html';
      registerUserProfile(dataUser);
    } else {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
      alert(errorCode, errorMessage, email, credential);
    }
  }
  let provider = null;
  event.target.nodeName === 'BUTTON' && event.target.id === 'loginFacebook'
    ? provider = new firebase.auth.FacebookAuthProvider()
    : provider = new firebase.auth.GoogleAuthProvider()
  logInWithProvider(provider, callback);
})

