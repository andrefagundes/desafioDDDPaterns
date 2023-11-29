import Address from '../value-object/address'
import CustomerFactory from './customer.factory'

describe('Customer factory unit test', () => {
  it('Should create a customer', () => {
    const customer = CustomerFactory.create('John')

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('John')
    expect(customer.Address).toBeUndefined()
    expect(customer.constructor.name).toBe('Customer')
  })

  it('Should create a customer with an address', () => {
    const address = new Address(
      'Rua João José',
      450,
      '38770-000',
      'João Pinheiro',
    )
    const customer = CustomerFactory.createWithAddress('John', address)

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('John')
    expect(customer.Address).toBe(address)
    expect(customer.constructor.name).toBe('Customer')
  })
})
