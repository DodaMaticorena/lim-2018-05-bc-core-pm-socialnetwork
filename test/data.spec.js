//module.exports = () => {
  describe('La lista, me debería permitir agregar tareas', () => {
    let postData = {
      title: 'Titulo de prueba'
    };

    it('Debería agregar una tarea', (done) => {
      editPost('LHgicvU_FDayzfKl7LJ', postData)
        .then(() => getPostList())
        .then((postList) => {
          const data = Object.entries(postList.val()).find(post => post[1].title === 'Titulo de prueba');
          assert.exists(data[1]); // verifica que exista algo en particular
          assert.equal(data[1].title, 'Titulo de prueba');
          done();
        })
        .catch((error) => {
          done(error);
        });
    });
  });

  /* describe('La lista, me debería permitir colocarle un progreso a una tarea', () => {
    it('Debería permitirle colocarle progreso a una tarea', (done) => { // parametros de la función
      taskProgress('Comprar pan', 'se ha comprado').then(
        (task) => {
          assert.exists(task);
          assert.equal(task.title, 'Comprar pan');
          assert.equal(task.state, 'se ha comprado');
          done();
        },
      ).catch(
        (error) => {
          done(error);
        },
      );
    });
  });

  describe('La lista, me debería permitir editar una tarea', () => {

  });

  describe('La lista, me debería permitir borrar una tarea', () => {

  }); */
//};