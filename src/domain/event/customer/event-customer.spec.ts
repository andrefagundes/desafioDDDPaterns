import Address from '../../entity/address'
import Customer from '../../entity/customer'
import EventDispatcher from '../@shared/event-dispatcher'
import CustomerAddressChangedEvent from './customer-address-changed.event'
import CustomerCreatedEvent from './customer-created.event'
import CustomerAddressChangedHandler from './handler/customer-address-changed.handler'
import CustomerCreated1 from './handler/customer-created1.handler'
import CustomerCreated2 from './handler/customer-created2.handler'

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

    const spyEventCustomerHandler1 = jest.spyOn(
      CustomerCreated1Handler,
      'handle',
    )
    const spyEventCustomerHandler2 = jest.spyOn(
      CustomerCreated2Handler,
      'handle',
    )
    const spyEventAddressHandler3 = jest.spyOn(
      CustomerAddressChangedEventHandler,
      'handle',
    )

    eventDispatcher.register('CustomerCreatedEvent', CustomerCreated1Handler)
    eventDispatcher.register('CustomerCreatedEvent', CustomerCreated2Handler)
    eventDispatcher.register(
      eventName.CustomerAddressChangedEvent,
      CustomerAddressChangedEventHandler,
    )

    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0],
    ).toMatchObject(CustomerCreated1Handler)
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1],
    ).toMatchObject(CustomerCreated2Handler)
    expect(
      eventDispatcher.getEventHandlers[
        eventName.CustomerAddressChangedEvent
      ][0],
    ).toMatchObject(CustomerAddressChangedEventHandler)

    const CustomerCreated = new CustomerCreatedEvent(null)
    eventDispatcher.notify(CustomerCreated)

    expect(spyEventCustomerHandler1).toHaveBeenCalled()
    expect(spyEventCustomerHandler2).toHaveBeenCalled()

    const customer = new Customer('1', 'Customer 1')
    const address = new Address(
      'Rua Sebastião Alves',
      450,
      '38770-000',
      'João Pinheiro',
    )
    customer.changeAddress(address)
    const customerAddressChangedEvent = new CustomerAddressChangedEvent(
      customer,
    )

    eventDispatcher.notify(customerAddressChangedEvent)
    expect(spyEventAddressHandler3).toHaveBeenCalled()
  })
})
