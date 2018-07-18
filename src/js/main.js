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
const optCategory = document.getElementById('optCategory');
const optState = document.getElementById('optState');
const inputTitle = document.getElementById('inputTitle');
const inputIntroduction = document.getElementById('inputIntroduction');
const contentImagen = document.getElementById('contentImagen');
const btnImagen = document.getElementById('btnImagen');
const inputContent = document.getElementById('inputContent');
const btnAddPost = document.getElementById('addPost');
const btnEditPost = document.getElementById('editPost');
const btnDeletePost = document.getElementById('deletePost');

buttonLogOut.addEventListener('click', () => {
	firebase.auth().signOut();
	location.href = 'index.html';
})
/*window.onload = () =>{
	const message = document.getElementById('message');
	const emailMessage = localStorage.getItem('email');

}*/

// creando objeto que contiene la data del post

let postData = {
	uid: null,
	title: null,
	body: {
		introduction: null,
		image: null,
		content: null,
	},
	date: null,
	category: null,
	state: null,
	likes: null,
	comentary: null

};

//obteniendo el id del usuario actual
firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		postData.uid = user.uid;
	}
	return user
});

btnAddPost.addEventListener('click', () => {

	postData.title = inputTitle.value;
	postData.body.introduction = inputIntroduction.value;
	postData.body.image = '',
	postData.body.content = inputContent.value,
	postData.date = new Date().getTime();
	postData.category = optCategory.value,
	postData.state = optState.value,
	postData.likes = 0,
	postData.comentary = {};

	createPost(postData);
	alert('se registró post')

	//Cambiar a muro principal
})

btnEditPost.addEventListener('click', () =>{
	postData.title = inputTitle.value;
	postData.body.introduction = inputIntroduction.value;
	postData.body.image = '',
	postData.body.content = inputContent.value,
	postData.date = new Date().getTime();
	postData.category = optCategory.value,
	postData.state = optState.value,
	postData.likes = 0,
	postData.comentary = {};

	editPost('-LHaoe1ZpLw0Bd_dxTTg', postData);
	alert('se editó post')

})

btnDeletePost.addEventListener('click', () =>{
	deletePost('-LHannf4mEXgDEhPhrSM', postData.uid);
	alert('se eliminó post')	
})

/*
firebase.firestore().collection("users").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
		// doc.data() is never undefined for query doc snapshots
		console.log(doc)
        console.log(doc.id, " => ", doc.data());
    });
});*/