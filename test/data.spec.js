describe('createUser', () => {
  it('debería ser funcion', () => {
    assert.isFunction(createUser);
  });
  it('no permite password cortos', () => {
    createUser('usuario1', '12345678')
  });
})

/* describe('data', () => {
   let config = {
    apiKey: "AIzaSyCrbUbq0oD49Yzk_eryDiJoseqOC6vUIcg",
    authDomain: "pet-health-social-network.firebaseapp.com",
    databaseURL: "https://pet-health-social-network.firebaseio.com",
    projectId: "pet-health-social-network",
    storageBucket: "pet-health-social-network.appspot.com",
    messagingSenderId: "838633128523"
  };
  firebase.initializeApp(config);

  
  xit('debería exponer función registerUserProfile en objeto global', () => {
    assert.isFunction(registerUserProfile);
  });

  xit('debería exponer función createPost en objeto global', () => {
    assert.isFunction(createPost);
  });

  xit('debería exponer función editPost en objeto global', () => {
    assert.isFunction(editPost);
  });

  xit('debería exponer función deletePost en objeto global', () => {
    assert.isFunction(deletePost);
  });

  describe('registerUserProfile(dataUser)', () => {
    let dataUser = {
      id: null,
      username: '',
      email: '',
      picture: ''
    }

    //const registerUserProfile = require('../src/js/data'); //jest import

    xit('debería retornar un objeto', () => {
      const functionEvalue = registerUserProfile(dataUser);
      assert.equal(typeof functionEvalue, 'object');  
      const alertTest = setTimeout(function(){ alert("Hello"); }, 3000);
      clearTimeout(alertTest);
    });

  }); 

});
 */