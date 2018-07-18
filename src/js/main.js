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
const contentImagen = document.getElementById('contentImagen');
const btnImagen = document.getElementById('btnImagen');
const inputContent = document.getElementById('inputContent');
const btnAddPost = document.getElementById('addPost');
const btnEditPost = document.getElementById('editPost');
const btnDeletePost = document.getElementById('deletePost');
const showPost = document.getElementById('showPost');
const dataPost = document.getElementById('dataPost');
const btnToAddPost = document.getElementById('toAddPost');

buttonLogOut.addEventListener('click', () => {
  firebase.auth().signOut();
  location.href = 'index.html';
})


// creando objeto que contiene la data del post

let postData = {
  uid: null,
  title: null,
  image: null,
  content: null,
  date: null,
  category: null,
  state: null,
  likes: null,
  comentary: null

};

//Contiene la data de los post 

let listUserPost = {}; //Solo post del usuario logueado
let listGeneralPost = {}; //Todos los post a mostrarse en la portada principal

const generalPost = (listGeneralPost) => {

  const postsKeys = Object.keys(listGeneralPost);

  postsKeys.forEach(postObject => {
    showPost.innerHTML += `Title ${listGeneralPost[postObject].title} <br>
    Content ${listGeneralPost[postObject].content} <br> 
    Category ${listGeneralPost[postObject].category} <br> 
    State ${listGeneralPost[postObject].state} <br><br>`
  });
}
const userPost = (listUserPost) => {

  const postsKeys = Object.keys(listUserPost);

  postsKeys.forEach(postObject => {
    showPost.innerHTML += `<div class = ${postObject}> Title ${listUserPost[postObject].title}<br>
    Content ${listUserPost[postObject].content} <br> 
    Category ${listUserPost[postObject].category} <br> 
    State ${listUserPost[postObject].state} <br>
    <button class = ${postObject} id="edit">Editar</button>  
    <button class = ${postObject} id="delete">Eliminar</button> <br><br> </div>`

  });
}




window.onload = () => {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      postData.uid = user.uid; //obteniendo el id del usuario actual

      firebase.database().ref('/user-posts/' + postData.uid).once('value').then(function (value) {

        listUserPost = value.val();
        userPost(listUserPost)
        
      });

      firebase.database().ref('/posts/').once('value').then(function (value) {

        listGeneralPost = value.val();

      });

    }

  });

  dataPost.style.display = 'none';

}

btnToAddPost.addEventListener('click',()=>{
  dataPost.style.display = 'block';
  showPost.style.display = 'none';
  btnEditPost.style.display = 'none';
})

let idPost = '';//Guardar id post

btnAddPost.addEventListener('click', () => {

  postData.title = inputTitle.value;
  postData.image = '';
  postData.content = inputContent.value;
  postData.date = new Date().getTime();
  postData.category = optCategory.value;
  postData.state = optState.value;
  postData.likes = 0;
  postData.comentary = {};


  idPost = createPost(postData);
  alert('se registró post')

  location.reload();
})

let postClassName = null;

showPost.addEventListener('click', (event) => {
  postClassName = event.target.className;
  console.log(postClassName)

   if (event.target.nodeName === "BUTTON" && event.target.id == 'edit' ) {

    dataPost.style.display = 'block';
    showPost.style.display = 'none';
    btnAddPost.style.display = 'none';

    inputTitle.value = listUserPost[postClassName].title;
    inputContent.value = listUserPost[postClassName].content;
    optCategory.value = listUserPost[postClassName].category;
    optState.value = listUserPost[postClassName].state;
  
 }

  if (event.target.nodeName === "BUTTON" && event.target.id == 'delete' ) {

    const postContentElement = document.getElementsByClassName(postClassName)[0]
    
    deletePost(postClassName, postData.uid);
    alert('se eliminó post')

    postContentElement.style.display = 'none';
  }

 
});


btnEditPost.addEventListener('click', () => {

  postData.title = inputTitle.value;
  postData.image = '';
  postData.content = inputContent.value;
  postData.date = new Date().getTime();
  postData.category = optCategory.value;
  postData.state = optState.value;
  postData.likes = 0;
  postData.comentary = {};

  editPost(postClassName, postData);
  alert('se editó post')

  location.reload();
})


