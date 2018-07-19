describe('data', () => {
  let config = {
    apiKey: "AIzaSyCrbUbq0oD49Yzk_eryDiJoseqOC6vUIcg",
    authDomain: "pet-health-social-network.firebaseapp.com",
    databaseURL: "https://pet-health-social-network.firebaseio.com",
    projectId: "pet-health-social-network",
    storageBucket: "pet-health-social-network.appspot.com",
    messagingSenderId: "838633128523"
  };
  firebase.initializeApp(config);
  
  it('debería exponer función registerUserProfile en objeto global', () => {
    assert.isFunction(registerUserProfile);
  });

  it('debería exponer función createPost en objeto global', () => {
    assert.isFunction(createPost);
  });

  it('debería exponer función editPost en objeto global', () => {
    assert.isFunction(editPost);
  });

  it('debería exponer función deletePost en objeto global', () => {
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

    /*it('debería retornar un objeto', () => {
      assert.equal(typeof registerUserProfile(dataUser), 'object');
    });*/
    it('debería retornar un objeto', (done) => {
      assert.equal(typeof registerUserProfile(dataUser), 'object');  
      done();
    }).timeout(5000);

  });

});
