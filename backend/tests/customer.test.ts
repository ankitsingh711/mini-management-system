import request from 'supertest';
import app from '../src/app';

describe('Customer API', () => {
  it('should create a customer', async () => {
    const res = await request(app).post('/api/customers').send({
      name: 'Jane Doe',
      contact: '1234567890',
      outstandingPayment: 100,
      paymentDueDate: '2024-12-31',
      paymentStatus: 'Pending'
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should get all customers', async () => {
    const res = await request(app).get('/api/customers');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});