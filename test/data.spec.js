describe('data', () => {

  it('Debería ser una función', () => {
    assert.isFunction(logIn);
  });

  it('Debería ser una función', () => {
    assert.isFunction(logInWithProvider);
  });

  it('Debería ser una función', () => {
    assert.isFunction(createUser);
  });

  it('Debería ser una función', () => {
    assert.isFunction(registerUserProfile);
  });

  it('Debería ser una función', () => {
    assert.isFunction(createPost);
  });

  it('Debería ser una función', () => {
    assert.isFunction(editPost);
  });

  it('Debería ser una función', () => {
    assert.isFunction(getPostList);
  });

  it('Debería ser una función', () => {
    assert.isFunction(deletePost);
  });

  it('Debería ser una función', () => {
    assert.isFunction(likePost);
  });

  it('Debería ser una función', () => {
    assert.isFunction(sortPosts);
  });

  it('Debería ser una función', () => {
    assert.isFunction(filterPosts);
  });

  it('Debería ser una función', () => {
    assert.isFunction(showMyPosts);
  });

  it('Debería ser una función', () => {
    assert.isFunction(showPosts);
  });

  describe('registerUserProfile(dataUser)', (done) => {
    const dataUser = {
      id: '3IJVjMTiXkZGlN3pwAomx2oOmIF2',
      username: 'Usuario de prueba',
      email: 'user@gmail.com',
      picture: ''
    }

    it('Debería crear los datos de usuario con username "Usuario de prueba"', (done) => {
      const result = registerUserProfile(dataUser);
      assert.equal(result, true);
      done();
    });
  });

  describe('createPost(postData)', () => {
    let postData = {
      category: 'SOS',
      content: 'Proteger a los animales en peligro de extinción se ha convertido casi en una obligación en éstos últimos tiempos, ya que aunque hayamos progresado mucho social y tecnológicamente, también hemos dado un pequeño paso hacia atrás en cuanto a la protección del medio ambiente y de sus habitantes.',
      date: 1532987413183,
      id: '-LIh9tDQaDR2c2VPorwe',
      image: "",
      likes: 0,
      state: 'publico',
      title: 'Proteger animales en peligro de extincion',
      uid: 'MfDWbdirEfWpJraJ4IOjJLWpqjy1'
    }  

    it('Debería crear un post con el titulo "Proteger animales en peligro de extincion"', (done) => {
      const result = createPost(postData);
      assert.equal(typeof result, 'string');
      done();
    });
  });

  describe('editPost(postId, postData)', () => {
    let postData = {
      category: 'SOS',
      content: 'Proteger a los animales en peligro de extinción se ha convertido casi en una obligación en éstos últimos tiempos, ya que aunque hayamos progresado mucho social y tecnológicamente, también hemos dado un pequeño paso hacia atrás en cuanto a la protección del medio ambiente y de sus habitantes.',
      date: 1532987413183,
      id: '-LIh9tDQaDR2c2VPorwe',
      image: "",
      likes: 0,
      state: 'publico',
      title: 'Proteger animales en peligro de extincion test',
      uid: 'MfDWbdirEfWpJraJ4IOjJLWpqjy1'
    }  

    it('Debería editar un post con el titulo "Proteger animales en peligro de extincion test"', (done) => {
      const result = editPost('-LIh7yoAu1gm8cYseB3r', postData);
      assert.equal(result, true);
      done();
    });
  });

  describe('getPostList()', () => {

    it('Debería retornar un objeto con los post', (done) => {
      const result = getPostList();
      //result será un objeto con los post
      //en caso de error result seria igual a null
      assert.equal(typeof result, 'object');
      done();
    });
  });

  describe('deletePost(postId)', () => {

    it('Debería eliminar un post con el postId "-LIh7yoAu1gm8cYseB3r"', (done) => {
      const result = deletePost('-LIh7yoAu1gm8cYseB3r');
      const posts = getPostList();
      const data = Object.entries(posts).find(post => post[1] === '-LIh7yoAu1gm8cYseB3r');
      assert.equal(data, null); //al no encontrarlo data es igual a null
      done();
    });
  });

  describe('likePost(idPost, uid, likeBadge)', () => {

    //en construccion
  });

  describe('sortPosts(posts)', () => {

    it('Debería retornar un objeto con los post ordenados', (done) => {
      getPostList()
        .then(post => {
          const posts = Object.values(post.val());
          const postSorted = sortPosts(posts);

          assert.equal(typeof postSorted, 'object');
          done();
        });      
    });
  });

});