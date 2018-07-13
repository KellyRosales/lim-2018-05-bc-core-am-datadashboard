describe('data', () => {

  it('debería exponer función computeUsersStats en objeto global', () => {
    assert.isFunction(computeUsersStats);
  });

  it('debería exponer función sortUsers en objeto global', () => {
    assert.isFunction(sortUsers);
  });

  it('debería exponer función filterUsers en objeto global', () => {
    assert.isFunction(filterUsers);
  });

  it('debería exponer función processCohortData en objeto global', () => {
    assert.isFunction(processCohortData);
  });

  describe('computeUsersStats(users, progress, courses)', () => {

    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;

    it('debería retornar arreglo de usuarios con propiedad stats', () => {
      const processed = computeUsersStats(users, progress, courses);

      assert.equal(users.length, processed.length);

      processed.forEach(user => {
        assert.ok(user.hasOwnProperty('stats'));
        assert.isNumber(user.stats.percent);
        assert.isObject(user.stats.exercises);
        assert.isObject(user.stats.quizzes);
        assert.isObject(user.stats.reads);
      });
    });

    describe('user.stats para el primer usuario en data de prueba - ver carpeta data/', () => {

      const processed = computeUsersStats(users, progress, courses);

      it(
        'debería tener propiedad percent con valor 53',
        () => assert.equal(processed[0].stats.percent, 53)
      );

      it('debería tener propiedad exercises con valor {total: 2, completed: 0, percent: 0}', () => {
        assert.deepEqual(processed[0].stats.exercises, {
          total: 2,
          completed: 0,
          percent: 0,
        });
      });

      it('debería tener propiedad quizzes con valor {total: 3, completed: 2, percent: 67, scoreSum: 57, scoreAvg: 29}', () => {
        assert.deepEqual(processed[0].stats.quizzes, {
          total: 3,
          completed: 2,
          percent: 67,
          scoreAvg: 29,
        });
      });

      it('debería tener propiedad reads con valor {total: 11, completed: 6, percent: 55}', () => {
        assert.deepEqual(processed[0].stats.reads, {
          total: 11,
          completed: 6,
          percent: 55,
        });
      });

    });

  });

  describe('sortUsers(users, orderBy, orderDirection)', () => {
    let userOne = {
      stats: {
        name : "DIANA VANESSA SOSA RIVAS",
        percent: 39,
        exercises : {
          total: 2,
          completed: 0,
          percent: 0
        },
        reads : {
          total: 11,
          completed: 5,
          percent: 45
        },
        quizzes : {
          total: 3,
          completed: 1,
          percent: 33,
          scoreSum: 90,
          scoreAvg: 270
        }
      }
    }
    let userTwo = {
      stats: {
        name : "LAURA JHAMELY",
        percent: 100,
        exercises : {
          total: 2,
          completed: 2,
          percent: 100
        },
        reads : {
          total: 11,
          completed:11,
          percent: 100
        },
        quizzes : {
          total: 3,
          completed: 3,
          percent: 100,
          scoreSum: 205,
          scoreAvg: 213
        }
      }
    }
    let userThree = {
      stats: {
        name : "SHEYLA",
        percent: 58,
        exercises : {
          total: 2,
          completed: 0,
          percent: 0
        },
        reads : {
          total: 11,
          completed:8,
          percent: 73
        },
        quizzes : {
          total: 3,
          completed:2,
          percent: 67,
          scoreSum: 174,
          scoreAvg: 267
        }
      }
    }
    let userCompleted =  [userOne, userTwo, userThree];

    it('debería retornar arreglo de usuarios ordenado por nombre ASC',  () => {
      assert.deepEqual(window.sortUsers(userCompleted, "Estudiante", "ASC"), [userOne, userTwo, userThree])
    });
    it('debería retornar arreglo de usuarios ordenado por nombre DESC', () => {
      assert.deepEqual(window.sortUsers(userCompleted, "Estudiante", "DESC"), [userThree, userTwo, userOne])
    });
    it('debería retornar arreglo de usuarios ordenado por porcentaje general ASC',() => {
      assert.deepEqual(window.sortUsers(userCompleted, "General", "ASC"),[userOne, userThree, userTwo])
    });
    it('debería retornar arreglo de usuarios ordenado por porcentaje general DESC',() => {
      assert.deepEqual(window.sortUsers(userCompleted, "General", "DESC"),[userTwo, userThree, userOne])
    });
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados ASC',() => {
      assert.deepEqual(window.sortUsers(userCompleted, "Ejercicios", "ASC"),[userOne, userTwo])
    });
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados DESC',() => {
      assert.deepEqual(window.sortUsers(userCompleted, "Ejercicios", "DESC"),[userTwo, userOne])
    });
    it('debería retornar arreglo de usuarios ordenado por quizzes completados ASC',() => {
      assert.deepEqual(window.sortUsers(userCompleted, "Quizzes", "ASC"),[userOne, userThree, userTwo])
    });
    it('debería retornar arreglo de usuarios ordenado por quizzes completados DESC',() => {
      assert.deepEqual(window.sortUsers(userCompleted, "Quizzes", "DESC"),[userTwo, userThree, userOne])
    });
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados ASC',() => {
      assert.deepEqual(window.sortUsers(userCompleted, "prom-quizzes", "ASC"),[userOne, userThree, userTwo])
    });
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados DESC',() => {
      assert.deepEqual(window.sortUsers(userCompleted, "prom-quizzes", "DESC"),[userTwo, userThree, userOne])
    });
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas ASC',() => {
      assert.deepEqual(window.sortUsers(userCompleted, "Lecturas", "ASC"),[userOne, userThree, userTwo])
    });
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas DESC',() => {
      assert.deepEqual(window.sortUsers(userCompleted, "Lecturas", "DESC"),[userTwo, userOne, userThree])
    });
  });

  describe('filterUsers(users, filterBy)', () => {
    let userOne = {
      stats: {
        name : "DIANA VANESSA SOSA RIVAS",
        percent: 39,
        exercises : {
          total: 2,
          completed: 0,
          percent: 0
        },
        reads : {
          total: 11,
          completed: 5,
          percent: 45
        },
        quizzes : {
          total: 3,
          completed: 1,
          percent: 33,
          scoreSum: 90,
          scoreAvg: 270
        }
      }
    }
    let userTwo = {
      stats: {
        name : "LAURA JHAMELY",
        percent: 100,
        exercises : {
          total: 2,
          completed: 2,
          percent: 100
        },
        reads : {
          total: 11,
          completed:11,
          percent: 100
        },
        quizzes : {
          total: 3,
          completed: 3,
          percent: 100,
          scoreSum: 205,
          scoreAvg: 213
        }
      }
    }
    let userThree = {
      stats: {
        name : "SHEYLA",
        percent: 58,
        exercises : {
          total: 2,
          completed: 0,
          percent: 0
        },
        reads : {
          total: 11,
          completed:8,
          percent: 73
        },
        quizzes : {
          total: 3,
          completed:2,
          percent: 67,
          scoreSum: 174,
          scoreAvg: 267
        }
      }
    }
    let userCompleted =  [userOne, userTwo, userThree];

    it('debería retornar nuevo arreglo solo con usuarios con nombres que contengan string (case insensitive)');
    assert.deepEqual(window.filterUsers(userCompleted, "DIA"), [userOne])
  });

  describe('processCohortData({ cohortData, orderBy, orderDirection, filterBy })',() => {
    let options = {
      cohort: fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw'),
      cohortData: fixtures,
      orderBy: 'name',
      orderDirection: 'ASC',
      search: 'DIANA'
    };

    it('debería retornar arreglo de usuarios con propiedad stats y aplicar sort y filter', ()=>{
      assert.deepEqual(window.processCohortData(options).length, 2)
    });

  });

});
