mocksdk.initializeApp();
describe('createUser', () => {
  it('debería ser funcion', () => {
    assert.isFunction(createUser);
  });
  it('Deberia crear un usuario con password 12345678', () => {
    createUser('usuario1@gmail.com', '1');
    // mocksdk.auth().flush();
    mocksdk.auth().getUserByEmail('usuario1@gmail.com').then(function(user) {
      console.log(user);
      assert.equal(user, 'ben was created');
    });
  });
  /* it('no permite password cortos', () => {
    createUser('usuario2', '1234')
  }); */

})

/* describe('data', () => {
   let config = {
    apiKey: "AIzaSyCrbUbq0oD49Yzk_eryDiJoseqOC6vUIcg",
    authDomain: "pet-health-social-network.mocksdkapp.com",
    databaseURL: "https://pet-health-social-network.mocksdkio.com",
    projectId: "pet-health-social-network",
    storageBucket: "pet-health-social-network.appspot.com",
    messagingSenderId: "838633128523"
  };
  mocksdk.initializeApp(config);

  
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