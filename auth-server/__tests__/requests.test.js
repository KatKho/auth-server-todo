'use strict';

const server = require('../lib/server.js');
const supertest = require('supertest');
const { UserModel, TodoModel, sequelize } = require('../lib/models');
const request = supertest(server.app);

let testUser = null;
let testTodo = null;

beforeAll(async () => {
  await sequelize.sync();
});
beforeEach(async () => {
  testUser = await UserModel.create({
    username: 'user',
    password: 'test',
    role: 'admin'
  });

  testUser.token = testUser.token || testUser.get('token');
  testTodo = await TodoModel.create({
    text: 'test',
    complete: false,
    assignee: testUser.username,
    difficulty: 2
  });
});
afterEach(async () => {
  await UserModel.destroy({ where: {}, truncate: true });
  await TodoModel.destroy({ where: {}, truncate: true });
});
afterAll(async () => {
  await sequelize.drop();
});

describe('Server requests', () => {
  test('Get todos', async () => {
    let response = await request.get('/todo').set('Authorization', `Bearer ${testUser.token}`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
  });
  test('Create todos', async () => {
    let response = await request.post('/todo')
      .set('Authorization', `Bearer ${testUser.token}`)
      .send({ text: 'My very first todo', assignee: testUser.username, difficulty: 1 });
    expect(response.status).toEqual(201);
    expect(response.body).toBeTruthy();
    expect(response.body.text).toEqual('My very first todo');
  });
  test('Get one todo', async () => {
    let response = await request.get(`/todo/${testTodo.id}`).set('Authorization', `Bearer ${testUser.token}`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
    expect(response.body.text).toEqual('test');
  });
  test('Update a todo', async () => {
    let response = await request.put(`/todo/${testTodo.id}`)
      .set('Authorization', `Bearer ${testUser.token}`)
      .send({ text: 'I changed my mind' });
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
    expect(response.body.text).toEqual('I changed my mind');
  });
  test('Delete one todo', async () => {
    let response = await request.delete(`/todo/${testTodo.id}`).set('Authorization', `Bearer ${testUser.token}`);
    expect(response.status).toEqual(204);
  });
});
