import request from 'supertest';
import app from '../src/app';

describe('Payment API', () => {
  it('should make a payment', async () => {
    const res = await request(app).post('/api/payments').send({
      customerId: 'customerId123',
      amount: 50
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('paymentStatus');
  });
});