const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with and object with message `hola`', () =>
        agent.get('/').then((res) => {
          expect(res.body.message).toEqual('hola');
        }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('hola');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(5); 
        })
    );
  });

  describe('POST /producto', () => {
    it('responds with 200', () => agent.post('/product').expect(200));
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );
  });

  describe('POST /sumArray', () => {
    it('responds with 200', () => agent.post('/sumArray').send({array: [2,5,7,10,11,15,20], num: 13})
    .expect(200));
    it('responds true if the sum of two array nums is equal to num', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .then((res) => {
          expect(res.body.result).toEqual(true);
      }));
    it('responds false if the sum of two array nums is equal to num', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 3000})
        .then((res) => {
          expect(res.body.result).toEqual(false);
      }));
  });
  
  describe('POST /numString', () => {
    it('Responder con status 200', () => agent.post('/numString').send({string: 'hola'}).expect(200));
    it('Responder con 4 si enviamos `hola`', () =>
      agent.post('/numString')
        .send({string: 'hola'})
        .then((res) => {
          expect(res.body.result).toEqual(4);
    }));
    it('Responder con un status 400 (bad request) si el string es un número', () =>
      agent.post('/numString')
        .send({string: 3})
        .expect(400)
    );
    it('Responder con un status 400 (bad request) si el string esta vacio', () =>
      agent.post('/numString')
        .send({string: ''})
        .expect(400)
    );
  })

  describe('POST /pluck', () => {
    it('Responder con status 200', () => agent.post('/pluck').send({array: [], prop: 'algo'}).expect(200));
    it('Responder con al funcionalidad del pluck', () =>
      agent.post('/pluck')
        .send({array: [
          {nombre:'Ricardo', edad:'25'},
          {nombre:'Juan', edad:'30'},
          {nombre:'David', edad:'21'}
        ], prop: 'nombre'})
        .then((res) => {
          expect(res.body.result).toEqual(['Ricardo', 'Juan', 'David']);
    }));
    it('Responder con un status 400 (bad request) si array no es un arreglo', () =>
      agent.post('/pluck')
        .send({array: 3})
        .expect(400)
    );
    it('Responder con un status 400 (bad request) si el string propiedad está vacio', () =>
      agent.post('/pluck')
        .send({prop: ''})
        .expect(400)
    );
  })
});


