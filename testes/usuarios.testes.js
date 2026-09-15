const request = require('supertest');
const app = require('../src/app');

describe('Usuários API', () => {
  it('Deveria rejeitar criação de usuário sem o campo nome', async () => {
    const response = await request(app)
      .post('/usuarios')
      .send({
        cpf: '11111111111',
        senha: 'senhaTeste123'
      });

    expect(response.status).toBe(400);
  })
})
