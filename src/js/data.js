
//Esta funcion guarda en la tabla users los datos del usuario
window.registerUserProfile = (userId, names, lastnames, email, picture = '') => {
	firebase.database().ref('users/' + userId).set({
		names: names,
		lastnames: lastnames,
		email: email,
		picture: picture
	}
		, (error) => {
			return 0;
		});
	return 1;
}
//Esta funcion permite la creacion de un post
window.registrerNewPost = (postId, content) => {
	firebase.database().ref('post/' + userId).set({
		postId: name,
		content: {
			title: content.email,
			paragraph: content.paragraph,
			image: content.image
		}
	});
}
//Esta funcion permite relacionar al usuario con sus posts
window.registrerNewPost = (userId, postId) => {
	firebase.database().ref('post/' + userId).set({
		postId: name,
		content: {
			title: content.email,
			paragraph: content.paragraph,
			image: content.image
		}
	});

}

<<<<<<< HEAD

window.processDataUser = () => {

}
=======
window.createPost = (uid, username, picture, title, body) => {
	//Generar idPost
	/*firebase.database().ref('posts/' + userId + '/' + idPost).set({
		title: title,
		date: date,
		image: image,
		text: text,
		category: category,// salud,alimentacion, adopcion, entretenimiento
		state: state,// publico o privado

	}, (error) => {
		return 0;
	});
*/
		// A post entry.
		const postData = {
		  author: username,
		  uid: uid,
		  body: body,
		  title: title,
		  starCount: 0,
		  authorPic: picture
		};
	  
		// Get a key for a new Post.
		const newPostKey = firebase.database().ref().child('posts').push().key;
	  
		// Write the new post's data simultaneously in the posts list and the user's post list.
		const updates = {};
		updates['/posts/' + newPostKey] = postData;
		updates['/user-posts/' + uid + '/' + newPostKey] = postData;
	  
		return firebase.database().ref().update(updates);

		console.log(firebase.database().ref().update(updates));
	  
}

window.editPost = () => {
	
}

window.deletePost = () => {
	
}
>>>>>>> 2641965a04d7d2a7364012b75f8e00b045aadbeb
