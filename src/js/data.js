//Funcion que permite que el usuario abra sesion
window.logIn = (email, password, cb) => {
	firebase.auth().signInWithEmailAndPassword(email, password)
		.then((result) => {
			console.log('Ha logrado abrir sesión con éxito', result)
			cb(null, result)
		})
		.catch((error) => {
			console.log('Ha habido un error', error)
			cb(error)
		});
}

window.logInWithProvider = (provider, cb) => {
	//console.log(provider)
	firebase.auth().signInWithPopup(provider).then(function (result) {
		console.log(result)

		const token = result.credential.accessToken;
		const user = result.user;
		console.log(user)


		cb(null, user);

	}).catch(error => {

		cb(error);
	});

}


//Funcion que crea una ccuenta de usuario con correo y password
window.createUser = (email, password, cb) => {
	return window.firebase.auth().createUserWithEmailAndPassword(email, password)
		.then((result) => {
			console.log('El usuario ha sido creado con cuenta de email y password', result)
			cb(null, result)
		})
		.catch((error) => {
			console.log('Ha habido un error')
			console.log(error)
			cb(error)

		});
}

//Esta funcion guarda en la tabla users los datos del usuario
window.registerUserProfile = (dataUser) => {
	firebase.database().ref('users/' + dataUser.id).set({
		username: dataUser.username,
		email: dataUser.email,
		picture: dataUser.picture
	}, (error) => {
		//	console.log(error, response)
		//cb(error, user)
		console.log(error)
		console.log('error')
	});
	//return dataRegisterUser;
}

//Esta funcion permite relacionar al usuario con sus posts
window.createPost = (postData) => {
	// Generar un id para la publicación.
	const newPostKey = firebase.database().ref().child('posts').push().key;
	// Registrar en el objeto posts y user-post la nueva publicación
	const updates = {};
	postData.id = newPostKey;
	updates['/posts/' + newPostKey] = postData;
	updates['/user-posts/' + postData.uid + '/' + newPostKey] = postData;
	firebase.database().ref().update(updates);
	return newPostKey;
}

//Esta funcion permite editar posts
window.editPost = (postId, postData) => {
	const updates = {};
	updates['/posts/' + postId] = postData;
	//firebase.database().ref('/posts/' + postId).update(postData);
	return firebase.database().ref().update(updates);
}

//Lee los post para usarlos en el test
window.getPostList = () => firebase.database().ref('posts').once('value');

//Esta funcion permite eliminar posts
window.deletePost = (postId, uid) => {
	firebase.database().ref('/posts/').child(postId).remove();
	//firebase.database().ref('/user-posts/' + uid + '/').child(postId).remove();
}

//Funcion que calcula los likes que se da a un post
window.likePost = (idPost, uid, likeBadge) => {
	//Leer cuantos likes tiene
	firebase.database().ref('/posts/' + idPost).once('value').then(function (snapshot) {
		let likes = snapshot.val().likes;
		//sumarle 1
		likes = likes + 1;
		//Actualiza los likes
		firebase.database().ref('posts/' + idPost).update({
			likes: likes
		}, (error) => {
			console.log(error)
		});
		//Imprime los likes en el badge
		likeBadge.innerHTML = likes;
		likeBadge.classList.remove("hidden");
	});
}

window.sortPosts = (posts) => {
	return posts.sort((a, b) => { return b.date < a.date });
}

window.filterPosts = (postSorted, filterBy, valueFilter) => {
	let postFiltered = null;
	filterBy !== null && valueFilter !== null
		? postFiltered = postSorted.filter(post => post[filterBy].toUpperCase().indexOf(valueFilter.toUpperCase()) !== -1)
			// === valueFilter)
		: postFiltered = postSorted;
	return postFiltered;
}
/*
window.filterUsers = (users, search) => {
    if (search !== '') {

        const filterUsersArray = users.filter(user => {

            return user.name.toUpperCase().indexOf(search.toUpperCase()) !== -1;//Filtrar (case insensitive)
        })
        return filterUsersArray;

    } else {
        return users;
    }
};
*/

window.showMyPosts = (dataUser, filterBy, valueFilter, cb) => {
	return getPostList()
		.then(post => {
			const posts = Object.values(post.val());
			const postSorted = sortPosts(posts);
			const myPosts = filterPosts(postSorted, 'uid', dataUser.uid);
			const postsFiltered = filterPosts(myPosts, filterBy, valueFilter);
			cb(postsFiltered);
		});
}
window.showPosts = (filterBy, valueFilter, cb) => {
	return getPostList()
		.then(post => {
			const posts = Object.values(post.val());
			const postSorted = sortPosts(posts);
			const postPublic = filterPosts(postSorted, 'state', 'publico');
			const postsFiltered = filterPosts(postPublic, filterBy, valueFilter);
			cb(postsFiltered);
		});
}


/*window.showPost = (cb) => {
	//al leer sin usar once(), los datos se vuelven a cargar al detectar un cambio en firebase
	var dataPost = firebase.database().ref('/posts/');
	//limitToLast(10) muestra los 10 ultimos
	dataPost.orderByChild('date').limitToLast(10).on('value', (snapshot) => {
		cb(snapshot.val());
	});

	//al leer con once(), los datos se cargar solo una vez
	/*firebase.database().ref('/posts/').once('value').then((value) => {
	  cb(value.val());
	})*/


