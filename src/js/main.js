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
const optCategory = document.getElementById('opt-category');
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
const closeCreate = document.getElementById('close-create');
const buttonsCategory = document.getElementById('buttons-category');
//const buttonsCategoryPost = document.getElementById('buttons-category-post');
const showCategories = document.getElementById('show-categories');
const myPosts = document.getElementById('my-posts');
const hiddenForm = document.getElementById('hidden-form');
const inputElement = document.getElementById('input-element');
const searchButton = document.getElementById('search-button');
const searchButtonPost = document.getElementById('search-button-post');

let typePost = 'publico';
let flagLateralMenu = 1;
let flagPost = 0; //1 crear post - 2 editar post
let flagPublicPrivate = 1; //1 posts publicos - 2 mis posts

window.addEventListener('resize', () => {
  if (window.innerWidth <= 767) {
    buttonsCategory.style.display = 'none';
    flagLateralMenu = 0;
  }
  else {
    buttonsCategory.style.display = 'block';
    flagLateralMenu = 1;
  }
});

buttonLogOut.addEventListener('click', () => {
  firebase.auth().signOut();
  location.href = 'index.html';
});

showCategories.addEventListener('click', () => {
  if (flagLateralMenu === 0) {
    $('#buttons-category').slideDown('slow');
    flagLateralMenu = 1;
  }
  else if (flagLateralMenu === 1) {
    $('#buttons-category').slideUp('slow');
    flagLateralMenu = 0;
  }

});
closeCreate.addEventListener('click', (event) => {
  event.preventDefault();

  //slideUp() funcion de jquery - oculta div
  $('#hidden-form').slideUp('slow');
  $('#close-create').hide('fade', 500);
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

const postPublic = (listPost) => {
  postsKeys = listPost.id;
  listPost.forEach(listPost => {
    //formateando fecha
    let date = listPost.date;
    date = new Date(date);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let newDate = day + '/' + month + '/' + year;

    let output = `<div class = "${listPost.id} post panel-login">
    <div class="row">
      <div class="col-10">
        <h5 class="card-title">${listPost.title}</h5>
      </div>
    </div>
    <span class="category"><i class="far fa-folder-open"></i> ${listPost.category}</span>
    <span class="date"><i class="far fa-calendar-alt"></i> ${newDate}</span>
    <hr>
    <img class="card-img-top" src="http://images.estampas.com/2012/07/01/mascotas.jpg.525.0.thumb" width="40" height="350">
    <p class="card-text">${listPost.content}</p>     
    <div class = "buttonSel">
    <button class = "${listPost.id} btn btn-light col-sm-3" id="coment"><i class="far fa-comment-alt"></i> Comentar</button>`;
    if (listPost.likes > 0) {
      output += `<button class = "${listPost.id} btn btn-light col-sm-3" id="like"><i class="far fa-thumbs-up"></i> Me gusta <span id="badge-${listPost.id}" class="badge badge-success">${listPost.likes}</span></button>
      </div>
      </div>`;
    } else {
      output += `<button class = "${listPost.id} btn btn-light col-sm-3" id="like"><i class="far fa-thumbs-up"></i> Me gusta <span id="badge-${listPost.id}" class="badge badge-success hidden">${listPost.likes}</span></button>
      </div>
      </div>`;
    }

    showPostElement.innerHTML += output;

  });
}
const userPost = (listPost) => {
  listPost.forEach(listPost => {
    //formateando fecha
    let date = listPost.date;
    date = new Date(date);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let newDate = day + '/' + month + '/' + year;

    let output = `<div class = "${listPost.id} post panel-login">
    <div class="row">
      <div class="col-10">
        <h5 class="card-title">${listPost.title}</h5>
      </div>
      <div class="col-2 text-right">
        <div class="btn-group">
        <button type="button" class="btn btn-light dropdown-toggle no-arrow" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fas fa-ellipsis-v"></i>
        </button>
          <div class="dropdown-menu dropdown-menu-right">
            <button class="${listPost.id} dropdown-item" type="button" id="edit"><i class="fas fa-edit"></i> Editar</button>
            <button class="${listPost.id} dropdown-item" type="button" id="delete"><i class="fas fa-trash-alt"></i> Eliminar</button>
          </div>
        </div>
      </div>
    </div>
    <span class="category"><i class="far fa-folder-open"></i> ${listPost.category}</span>
    <span class="date"><i class="far fa-calendar-alt"></i> ${newDate}</span>
    <hr>
    <img class="card-img-top" src="http://images.estampas.com/2012/07/01/mascotas.jpg.525.0.thumb" width="40" height="350">
    <p class="card-text">${listPost.content}</p>     
    <div class = "buttonSel">
    <button class = "${listPost.id} btn btn-light col-sm-3" id="coment"><i class="far fa-comment-alt"></i> Comentar</button>`;
    if (listPost.likes > 0) {
      output += `<button class = "${listPost.id} btn btn-light col-sm-3" id="like"><i class="far fa-thumbs-up"></i> Me gusta <span id="badge-${listPost.id}" class="badge badge-success">${listPost.likes}</span></button>
      </div>
      </div>`;
    } else {
      output += `<button class = "${listPost.id} btn btn-light col-sm-3" id="like"><i class="far fa-thumbs-up"></i> Me gusta <span id="badge-${listPost.id}" class="badge badge-success hidden">${listPost.likes}</span></button>
      </div>
      </div>`;
    }

    showPostElement.innerHTML += output;

  });
}

let listPost = {};

window.onload = () => {
  const callBack = (result) => {
    listPost = result;
    postPublic(listPost);
  }
  showPosts(null, null, callBack);

  firebase.auth().onAuthStateChanged(function (user) {

    if (user) {
      postData.uid = user.uid;
      //showPost(callBack);
    }
  });

  btnEditPost.style.display = 'none';

}

inputTitle.addEventListener('focus', () => {
  //slideUp() funcion de jquery - oculta div
  $('#hidden-form').slideDown('slow');
  $('#close-create').show('fade', 500);

  //btnEditPost.style.display = 'none';
})

let idPost = '';//Guardar id post

btnAddPost.addEventListener('click', () => {
  if (inputTitle.value == '' || inputContent.value == '') {
    alert('El título y el contenido no pueden estar vacíos.');
    return;
  }
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
  alert('se creo con exito')
  location.reload();
})
let postClassName = null;

showPostElement.addEventListener('click', (event) => {
  postClassName = event.target.className;
  postClassName = postClassName.split(' ');
  const postSelected = listPost.filter(post => {
    return post.id === postClassName[0];
  })
  console.log(postClassName);
  
  if (event.target.nodeName === "BUTTON" && event.target.id == 'edit') {
    dataPost.style.display = 'block';
    showPostElement.style.display = 'none';
    btnAddPost.style.display = 'none';
    hiddenForm.style.display = 'block';
    btnEditPost.style.display = 'block';
    inputTitle.value = postSelected[0].title;
    inputContent.value = postSelected[0].content;
    optCategory.value = postSelected[0].category;
    optState.value = postSelected[0].state;

  }

  if (event.target.nodeName === "BUTTON" && event.target.id == 'delete') {

    const postContentElement = document.getElementsByClassName(postClassName[0])[0]

    deletePost(postClassName[0], postData.uid);
    alert('se eliminó post')

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
  alert('se editó post')

  location.reload();
});

/* buttonsCategoryPost.addEventListener('click', (event) => {
  showPostElement.innerHTML = '';
  const callBack = (result) => {
    postPublic(result);
  }
  const category = event.target.innerText;
  if (event.target.nodeName === 'LI' || event.target.nodeName === 'A') {
    showPosts('category', category, callBack);
  }
}) */

buttonsCategory.addEventListener('click', (event) => {
  if (flagPublicPrivate === 1) {
    showPostElement.innerHTML = '';
    const callBack = (result) => {
      postPublic(result);
    }
    const category = event.target.innerText;
    if (event.target.nodeName === 'LI' || event.target.nodeName === 'A') {
      showPosts('category', category, callBack);
    }  
  } else if (flagPublicPrivate === 2) {
    showPostElement.innerHTML = '';
    const callBack = (result) => {
      userPost(result);
    }
    const category = event.target.innerText;
    if (event.target.nodeName === 'LI' || event.target.nodeName === 'A') {
      showMyPosts(postData, 'category', category, callBack);
    }
  }
  
});


myPosts.addEventListener('click', () => {
  flagPublicPrivate = 2;

  showPostElement.innerHTML = '';
  inputElement.value = ''
  //buttonsCategoryPost.style.display = 'none';
  buttonsCategory.style.display = 'block';
  searchButtonPost.style.display = 'none';
  searchButton.style.display = 'block';
  const callBack = (result) => {
    listPost = result;
    userPost(listPost);
  }
  showMyPosts(postData, null, null, callBack);
})
searchButtonPost.addEventListener('click', () => {
  showPostElement.innerHTML = ''; 
  const callBack = (result) => {
    postPublic(result);
  }
  const inputValue = inputElement.value;
  showPosts('title', inputValue, callBack);
})
searchButton.addEventListener('click', () => {
  showPostElement.innerHTML = ''; 
  const callBack = (result) => {
    userPost(result);
  }
  const inputValue = inputElement.value;
  showPosts('title', inputValue, callBack);
})