// Initialize Firebase
let config = {
  apiKey: "AIzaSyCrbUbq0oD49Yzk_eryDiJoseqOC6vUIcg",
  authDomain: "pet-health-social-network.firebaseapp.com",
  databaseURL: "https://pet-health-social-network.firebaseio.com",
  projectId: "pet-health-social-network",
  storageBucket: "pet-health-social-network.appspot.com",
  messagingSenderId: "838633128523"
};
app = firebase.initializeApp(config);

const db = firebase.firestore(app);

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
const showPostElement = document.getElementById('showPost');
const dataPost = document.getElementById('dataPost');
const btnToAddPost = document.getElementById('toAddPost');
const closeCreate = document.getElementById('close-create');

let typePost = 'publico';

buttonLogOut.addEventListener('click', () => {
  firebase.auth().signOut();
  location.href = 'index.html';
});

closeCreate.addEventListener('click', (event) => {
  event.preventDefault();

  //slideUp() funcion de jquery - oculta div
  $('#dataPost').slideUp('slow');
  //dataPost.style.display = 'none';
});

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

  postsKeys = Object.keys(listUserPost);
  console.log(listUserPost);


  postsKeys.forEach(postObject => {
    console.log(postObject);

    //formateando fecha
    let date = listUserPost[postObject].date;
    date = new Date(date);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let newDate = day + '/' + month + '/' + year;

    let output = `<div class = "${postObject} post panel-login">
    <h5 class="card-title">${listUserPost[postObject].title}</h5>
    <span class="category"><i class="far fa-folder-open"></i> ${listUserPost[postObject].category}</span>
    <span class="date"><i class="far fa-calendar-alt"></i> ${newDate}</span>
    <hr>
    <img class="card-img-top" src="http://images.estampas.com/2012/07/01/mascotas.jpg.525.0.thumb" width="40" height="350">
    <p class="card-text">${listUserPost[postObject].content}</p>     
    <div class = "buttonSel">
    <button class = "${postObject} btn btn-light col-sm-3" id="edit">Editar <i class="fas fa-edit"></i></button>
    <button class = "${postObject} btn btn-light col-sm-3" id="delete">Eliminar <i class="fas fa-trash-alt"></i></button>`;
    if (listUserPost[postObject].likes > 0) {
      output += `<button class = "${postObject} btn btn-light col-sm-3" id="like">Me gusta <i class="far fa-thumbs-up"></i> <span id="badge-${postObject}" class="badge badge-success">${listUserPost[postObject].likes}</span></button>
      </div>
      </div>`;
    } else {
      output += `<button class = "${postObject} btn btn-light col-sm-3" id="like">Me gusta <i class="far fa-thumbs-up"></i> <span id="badge-${postObject}" class="badge badge-success hidden">${listUserPost[postObject].likes}</span></button>
      </div>
      </div>`;
    }

    showPostElement.innerHTML += output;

  });
}
listUserPost={};

//Category ${listUserPost[postObject].category} <br> 
//State ${listUserPost[postObject].state} <br>

window.onload = () => {
  const callBack = (result) => {
    console.log(result);
    
    userPost(result);
  }

  firebase.auth().onAuthStateChanged(function (user) {

    if (user) {
      postData.uid = user.uid;
      showPost(callBack);
    } 
  });

  dataPost.style.display = 'none';
}


btnToAddPost.addEventListener('click', (event) => {
  event.preventDefault();
  //slideUp() funcion de jquery - oculta div
  $('#dataPost').slideDown('slow');
  //dataPost.style.display = 'block';
  //showPost.style.display = 'none';
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
  //slideUp() funcion de jquery - oculta div
  $('#dataPost').slideUp('slow');
})

let postClassName = null;

showPostElement.addEventListener('click', (event) => {

  postClassName = event.target.className;
  postClassName = postClassName.split(' ');

  console.log(postClassName);

  if (event.target.nodeName === "BUTTON" && event.target.id == 'edit') {


    dataPost.style.display = 'block';
    showPost.style.display = 'none';
    btnAddPost.style.display = 'none';

    inputTitle.value = listUserPost[postClassName[0]].title;
    inputContent.value = listUserPost[postClassName[0]].content;
    optCategory.value = listUserPost[postClassName[0]].category;
    optState.value = listUserPost[postClassName[0]].state;

  }

  if (event.target.nodeName === "BUTTON" && event.target.id == 'delete') {

    const postContentElement = document.getElementsByClassName(postClassName[0])[0]

    deletePost(postClassName[0], postData.uid);
    //alert('se eliminó post')

    postContentElement.style.display = 'none';
  }

  if (event.target.nodeName === "BUTTON" && event.target.id == 'like') {
    const likeBadge = document.getElementById('badge-' + postClassName[0]);
    likePost(postClassName[0], postData.uid, likeBadge);
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

  editPost(postClassName[0], postData);
  //alert('se editó post')

  //location.reload();
})


