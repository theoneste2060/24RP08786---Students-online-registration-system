const request = require('supertest');
const app = require('../app');

describe('Backend API Tests', () => {
  test('Health check endpoint should return status ok', async () => {
    const response = await request(app)
      .get('/api/status')
      .expect(200);

    expect(response.body).toEqual({ status: 'ok' });
  });

  // test('Student registration should create a new student', async () => {
  //   const newStudent = {
  //     firstName: 'Jane',
  //     lastName: 'Smith',
  //     email: 'jane.smith@student.edu',
  //     studentId: 'STU456',
  //     course: 'Data Science'
  //   };

  //   const response = await request(app)
  //     .post('/api/students')
  //     .send(newStudent)
  //     .expect(201);

  //   expect(response.body).toHaveProperty('message', 'Student registered successfully');
  //   expect(response.body).toHaveProperty('student');
  //   expect(response.body.student).toMatchObject(newStudent);
  // });
});