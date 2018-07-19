const dataRegisterUser = {
	id: null,
	username: '',
	email: '',
	picture: ''
}
//Esta funcion guarda en la tabla users los datos del usuario
window.registerUserProfile = (dataUser) => {

	dataRegisterUser.id = dataUser.id;
	dataRegisterUser.username = dataUser.username;
	dataRegisterUser.email = dataUser.email;
	dataRegisterUser.picture = dataUser.picture;
	
	firebase.database().ref('users/' + dataUser.id).set({
		username: dataUser.username,
		email: dataUser.email,
		picture: dataUser.picture
	}, (error) => {
		return 0;
	});

	return dataRegisterUser;
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
