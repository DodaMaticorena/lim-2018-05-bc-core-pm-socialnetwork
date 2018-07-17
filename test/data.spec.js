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

  describe('registerUserProfile(userId, names, lastnames, email)', () => {

    it('debería retornar 1', () => {
      firebase.auth().signInWithEmailAndPassword('test@gmail.com', '123456')
      .then((result) => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {	
            const processed = registerUserProfile('Zct43ZRTSfRcjBIZRGvRdzOCvzR2', 'Sandra', 'Perez', 'test@gmail.com');
            assert.equal(processed, 1);
          } 
        });
      })
      .catch((error) => {
        let errorCode = error.code;
      });
    });

  });

});