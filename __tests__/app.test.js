require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

describe('app routes', () => {
  beforeAll(done => {
    return client.connect(done);
  });

  beforeEach(() => {
    // TODO: ADD DROP SETUP DB SCRIPT
    execSync('npm run setup-db');
  });

  afterAll(done => {
    return client.end(done);
  });

  test('returns todos', async() => {

    const expectation = [
      {
        'id': 1,
        'task': '',
        'completed': 3,
        'user_id': 1
      },
      {
        'id': 2,
        'task': '',
        'completed': 4,
        'user_id': 1
      },
      {
        'id': 3,
        'task': '',
        'completed': 10,
        'user_id': 1
      }
    ];

    const data = await fakeRequest(app)
      .get('/todos')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });
});
