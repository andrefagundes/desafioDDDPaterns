import request from 'supertest'
import { app, sequelize } from '../express'

describe('E2E test for customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'John',
        address: {
          street: 'Street',
          city: 'City',
          number: 123,
          zip: '12345',
        },
      })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe('John')
    expect(response.body.address.street).toBe('Street')
    expect(response.body.address.city).toBe('City')
    expect(response.body.address.number).toBe(123)
    expect(response.body.address.zip).toBe('12345')
  })

  it('should not create a customer', async () => {
    const response = await request(app).post('/customer').send({
      name: 'john',
    })
    expect(response.status).toBe(500)
  })

  it('should list all customer', async () => {
    const response1 = await request(app)
      .post('/customer')
      .send({
        name: 'John',
        address: {
          street: 'Street',
          city: 'City',
          number: 123,
          zip: '12345',
        },
      })

    expect(response1.status).toBe(200)

    const response2 = await request(app)
      .post('/customer')
      .send({
        name: 'Daniela',
        address: {
          street: 'Street 2',
          city: 'City 2',
          number: 1234,
          zip: '123456',
        },
      })

    expect(response2.status).toBe(200)

    const listResponse = await request(app).get('/customer').send()
    expect(listResponse.status).toBe(200)
    expect(listResponse.body.customers.length).toBe(2)
    const customer = listResponse.body.customers[0]
    expect(customer.name).toBe('John')
    expect(customer.address.street).toBe('Street')
    const customer2 = listResponse.body.customers[1]
    expect(customer2.name).toBe('Daniela')
    expect(customer2.address.street).toBe('Street 2')

    const listResponseXml = await request(app)
      .get('/customer')
      .set('Accept', 'application/xml')
      .send()

    expect(listResponseXml.status).toBe(200)
    expect(listResponseXml.text).toContain(
      `<?xml version="1.0" encoding="UTF-8"?>`,
    )
    expect(listResponseXml.text).toContain(`<customers>`)
    expect(listResponseXml.text).toContain(`<customer>`)
    expect(listResponseXml.text).toContain(`<name>John</name>`)
    expect(listResponseXml.text).toContain(`<address>`)
    expect(listResponseXml.text).toContain(`<street>Street</street>`)
    expect(listResponseXml.text).toContain(`<city>City</city>`)
    expect(listResponseXml.text).toContain(`<number>1234</number>`)
    expect(listResponseXml.text).toContain(`<zip>12345</zip>`)
    expect(listResponseXml.text).toContain(`</address>`)
    expect(listResponseXml.text).toContain(`</customer>`)
    expect(listResponseXml.text).toContain(`<name>Daniela</name>`)
    expect(listResponseXml.text).toContain(`<street>Street 2</street>`)
    expect(listResponseXml.text).toContain(`</customers>`)
  })
  
})
