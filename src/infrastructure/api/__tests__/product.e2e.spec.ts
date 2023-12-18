import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E test for product', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const response = await request(app).post('/product').send({
      type: 'a',
      name: 'Dress',
      price: 197,
    })

    expect(response.status).toBe(201)
    expect(response.body.name).toBe('Dress')
    expect(response.body.price).toBe(197)
  })

  it('should not create a product', async () => {
    const response = await request(app).post('/product').send({
      name: 'Dress',
    })

    expect(response.status).toBe(500)
  })

  it('should list all products', async () => {
    await request(app).post('/product').send({
      name: 'Dress',
      price: 197,
      type: 'a',
    })

    await request(app).post('/product').send({
      name: 'T-shirt',
      price: 129,
      type: 'b',
    })

    const listResponse = await request(app).get('/product')

    expect(listResponse.status).toBe(200)
    expect(listResponse.body.products).toHaveLength(2)
    expect(listResponse.body.products[0].name).toBe('Dress')
    expect(listResponse.body.products[1].name).toBe('T-shirt')
  })
})
