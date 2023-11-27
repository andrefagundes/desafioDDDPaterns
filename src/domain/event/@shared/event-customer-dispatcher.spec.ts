import Address from '../../entity/address'
import Customer from '../../entity/customer'
import CustomerAddressChangedEvent from '../customer/customer-address-changed.event'
import CustomerCreated1Event from '../customer/customer-created1.event'
import CustomerCreated2Event from '../customer/customer-created2.event'
import CustomerAddressChangedHandler from '../customer/handler/customer-address-changed.handler'
import CustomerCreated1 from '../customer/handler/customer-created1.handler'
import CustomerCreated2 from '../customer/handler/customer-created2.handler'
import EventDispatcher from './event-dispatcher'

describe('Domain events tests', () => {
  enum eventName {
    CustomerCreated1Event = 'CustomerCreated1Event',
    CustomerCreated2Event = 'CustomerCreated2Event',
    CustomerAddressChangedEvent = 'CustomerAddressChangedEvent',
  }

  it('should register events', () => {
    const eventDispatcher = new EventDispatcher()
    const CustomerCreated1Handler = new CustomerCreated1()
    const CustomerCreated2Handler = new CustomerCreated2()
    const CustomerAddressChangedEventHandler =
      new CustomerAddressChangedHandler()

    eventDispatcher.register(
      eventName.CustomerCreated1Event,
      CustomerCreated1Handler,
    )
    eventDispatcher.register(
      eventName.CustomerCreated2Event,
      CustomerCreated2Handler,
    )
    eventDispatcher.register(
      eventName.CustomerAddressChangedEvent,
      CustomerAddressChangedEventHandler,
    )

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated1Event],
    ).toBeDefined()
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated1Event].length,
    ).toBe(1)
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated1Event][0],
    ).toMatchObject(CustomerCreated1Handler)

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated2Event],
    ).toBeDefined()
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated2Event].length,
    ).toBe(1)
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated2Event][0],
    ).toMatchObject(CustomerCreated2Handler)

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent],
    ).toBeDefined()
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent]
        .length,
    ).toBe(1)
    expect(
      eventDispatcher.getEventHandlers[
        eventName.CustomerAddressChangedEvent
      ][0],
    ).toMatchObject(CustomerAddressChangedEventHandler)
  })

  it('should unregister events', () => {
    const eventDispatcher = new EventDispatcher()
    const CustomerCreated1Handler = new CustomerCreated1()
    const CustomerCreated2Handler = new CustomerCreated2()
    const CustomerAddressChangedEventHandler =
      new CustomerAddressChangedHandler()

    eventDispatcher.register(
      eventName.CustomerCreated1Event,
      CustomerCreated1Handler,
    )
    eventDispatcher.register(
      eventName.CustomerCreated2Event,
      CustomerCreated2Handler,
    )
    eventDispatcher.register(
      eventName.CustomerAddressChangedEvent,
      CustomerAddressChangedEventHandler,
    )

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated1Event][0],
    ).toMatchObject(CustomerCreated1Handler)
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated2Event][0],
    ).toMatchObject(CustomerCreated2Handler)
    expect(
      eventDispatcher.getEventHandlers[
        eventName.CustomerAddressChangedEvent
      ][0],
    ).toMatchObject(CustomerAddressChangedEventHandler)

    eventDispatcher.unregister(
      eventName.CustomerCreated1Event,
      CustomerCreated1Handler,
    )
    eventDispatcher.unregister(
      eventName.CustomerCreated2Event,
      CustomerCreated2Handler,
    )
    eventDispatcher.unregister(
      eventName.CustomerAddressChangedEvent,
      CustomerAddressChangedEventHandler,
    )

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated1Event],
    ).toBeDefined()
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated1Event].length,
    ).toBe(0)

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated2Event],
    ).toBeDefined()
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated2Event].length,
    ).toBe(0)

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent],
    ).toBeDefined()
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent]
        .length,
    ).toBe(0)
  })

  it('should unregister all events', () => {
    const eventDispatcher = new EventDispatcher()
    const CustomerCreated1Handler = new CustomerCreated1()
    const CustomerCreated2Handler = new CustomerCreated2()
    const CustomerAddressChangedEventHandler =
      new CustomerAddressChangedHandler()

    eventDispatcher.register(
      eventName.CustomerCreated1Event,
      CustomerCreated1Handler,
    )
    eventDispatcher.register(
      eventName.CustomerCreated2Event,
      CustomerCreated2Handler,
    )
    eventDispatcher.register(
      eventName.CustomerAddressChangedEvent,
      CustomerAddressChangedEventHandler,
    )

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated1Event],
    ).toMatchObject(CustomerCreated1Handler)
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated2Event],
    ).toMatchObject(CustomerCreated2Handler)
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent],
    ).toMatchObject(CustomerAddressChangedEventHandler)

    eventDispatcher.unregisterAll()

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated1Event],
    ).toBeUndefined()
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated2Event],
    ).toBeUndefined()
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent],
    ).toBeUndefined()
  })

  it('should notify all events', () => {
    const eventDispatcher = new EventDispatcher()

    const CustomerCreated1Handler = new CustomerCreated1()
    const CustomerCreated2Handler = new CustomerCreated2()
    const CustomerAddressChangedEventHandler =
      new CustomerAddressChangedHandler()

    const spyEventHandler1 = jest.spyOn(CustomerCreated1Handler, 'handle')
    const spyEventHandler2 = jest.spyOn(CustomerCreated2Handler, 'handle')
    const spyEventHandler3 = jest.spyOn(
      CustomerAddressChangedEventHandler,
      'handle',
    )

    eventDispatcher.register(
      eventName.CustomerCreated1Event,
      CustomerCreated1Handler,
    )
    eventDispatcher.register(
      eventName.CustomerCreated2Event,
      CustomerCreated2Handler,
    )
    eventDispatcher.register(
      eventName.CustomerAddressChangedEvent,
      CustomerAddressChangedEventHandler,
    )

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated1Event][0],
    ).toMatchObject(CustomerCreated1Handler)
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated2Event][0],
    ).toMatchObject(CustomerCreated2Handler)
    expect(
      eventDispatcher.getEventHandlers[
        eventName.CustomerAddressChangedEvent
      ][0],
    ).toMatchObject(CustomerAddressChangedEventHandler)

    const customer = new Customer('1', 'Customer 1')
    const customerCreated1Event = new CustomerCreated1Event(null)
    const customerCreated2Event = new CustomerCreated2Event(null)
    const address = new Address('Rua Sebastião Alves', 450, '38770-000', 'João Pinheiro')

    customer.changeAddress(address)

    const customerAddressChangedEvent = new CustomerAddressChangedEvent(
      customer,
    )

    eventDispatcher.notify(customerCreated1Event)
    eventDispatcher.notify(customerCreated2Event)
    eventDispatcher.notify(customerAddressChangedEvent)

    expect(spyEventHandler1).toHaveBeenCalled()
    expect(spyEventHandler2).toHaveBeenCalled()
    expect(spyEventHandler3).toHaveBeenCalled()
  })
})
