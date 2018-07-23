window.logIn = (email, password, cb) => {
	firebase.auth().signInWithEmailAndPassword(email, password)
		.then((result) => {
			console.log('aaaaaaaaaa', result)
			cb(null, result)
		})
		.catch((error) => {
			console.log('bbbbbbbbbbbbb', result)
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

window.createUser = (email, password, cb) => {
	console.log('xxxxxxxxxxxxxxxxxx')
	firebase.auth().createUserWithEmailAndPassword(email, password)
		.then((result) => {

			console.log('aaaaaaaaaa', result)
			// console.log(result.user.provider.uid);
			cb(null, result)

		})
		.catch((error) => {
			console.log('bbbbbbbbbbbbb')
			console.log(error)
			// cb(error)
		});
}

//Esta funcion guarda en la tabla users los datos del usuario
window.registerUserProfile = (dataUser) => {
	console.log('estoy')
	firebase.database().ref('users/' + dataUser.id).set({

		username: dataUser.username,
		email: dataUser.email,
		picture: dataUser.picture


	}, (error, user) => {
		//	console.log(error, response)
		//cb(error, user)
		console.log(error)
		console.log('error')
	});

	//return dataRegisterUser;
}
//module.exports = registerUserProfile; // //jest export

//Esta funcion permite relacionar al usuario con sus posts

window.createPost = (postData) => {
	console.log(postData)

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

	firebase.database().ref('/posts/').child(postId).remove()
	firebase.database().ref('/user-posts/' + uid + '/').child(postId).remove()
	/*.then( 
		firebase.database().ref('/user-posts/' + uid + '/').child(postId).remove()
	).then(
		cb(0)
	)
	.catch(
		cb(1)
	);*/

}
/*window.showPost = (uid, cb) => {

	firebase.database().ref('/user-posts/' + uid).once('value').then(function (value) {
		cb(value.val());

	});
}
*/
