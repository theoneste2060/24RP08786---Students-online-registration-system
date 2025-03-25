const request = require('supertest');
const app = require('../microservice');

describe('Microservice API Tests', () => {
  test('Health check endpoint should return status ok', async () => {
    const response = await request(app)
      .get('/api/status')
      .expect(200);

    expect(response.body).toEqual({ status: 'ok' });
  });

  test('Student validation should validate correct student data', async () => {
    const validStudent = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@student.edu',
      studentId: 'STU123',
      course: 'Computer Science'
    };

    const response = await request(app)
      .post('/api/validate')
      .send(validStudent)
      .expect(200);

    expect(response.body).toEqual({
      isValid: true,
      message: 'Student data is valid'
    });
  });
});