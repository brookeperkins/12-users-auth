require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

describe('routes', () => {
  let token;

  const newToDo = {
    id: 4,
    task: 'play scrabble',
    completed: false,
    user_id: 2
  };

  beforeAll(async done => {
    execSync('npm run setup-db');

    client.connect();

    const signInData = await fakeRequest(app)
      .post('/auth/signup')
      .send({
        email: 'b@brooke.com',
        password: '12345'
      });

    token = signInData.body.token;

    return done();
  
  });

  afterAll(done => {
    return client.end(done);
  });

  test('returns a new todo when creating new todo', async(done) => {

    const data = await fakeRequest(app)
      .post('/api/todos')
      .send(newToDo)
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(newToDo);

    done();
  });
  
});
