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

window.createUser = (email, password, cb) => {
	//console.log('xxxxxxxxxxxxxxxxxx')
    firebase.auth().createUserWithEmailAndPassword(email, password)
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
	
		
	}, (error, user) => {
	//	console.log(error, response)
		//cb(error, user)
		console.log(error)
	});
	
	//return dataRegisterUser;
}

//Esta funcion permite relacionar al usuario con sus posts

window.createPost = (postData) => {

	// Generar un id para la publicación.
	const newPostKey = firebase.database().ref().child('posts').push().key;

	// Registrar en el objeto posts y user-post la nueva publicación
	const updates = {};
	updates['/posts/' + newPostKey] = postData;
	updates['/user-posts/' + postData.uid + '/' + newPostKey] = postData;

	firebase.database().ref().update(updates);
	
	return newPostKey;

}
//Esta funcion permite editar posts
window.editPost = (postId, postData) => {

	const updates = {};
	updates['/posts/' + postId] = postData;
	updates['/user-posts/' + postData.uid + '/' + postId] = postData;

	return firebase.database().ref().update(updates);

}
//Esta funcion permite eliminar posts

window.deletePost = (postId, uid) => {
	
	firebase.database().ref('/posts/').child(postId).remove();
	firebase.database().ref('/user-posts/' + uid + '/').child(postId).remove();

}

//Funcion que calcula los likes que se da a un post
window.likePost = (idPost, uid, likeBadge) => {
	//Leer cuantos likes tiene
	firebase.database().ref('/posts/' + idPost).once('value').then(function(snapshot) {
		var likes = snapshot.val().likes;

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
	});

	//Actualizar tabla user-posts
	firebase.database().ref('/user-posts/' + uid + '/' + idPost).once('value').then(function(snapshot) {
		var likes = snapshot.val().likes;

		//sumarle 1
		likes = likes + 1;

		//Actualiza los likes
		firebase.database().ref('/user-posts/' + uid + '/' + idPost).update({
			likes: likes		
		}, (error) => {
			console.log(error)
		});
	});

}
