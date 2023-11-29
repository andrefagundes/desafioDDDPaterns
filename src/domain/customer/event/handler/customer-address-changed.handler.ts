import EventHandlerInterface from '../../../@shared/event/event-handler.interface'
import CustomerAddressChangedEvent from '../customer-address-changed.event'

export default class CustomerAddressChangedHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    const { id, name, Address } = event.eventData
    const { street, number, zip, city } = Address

    console.log(
      `Endereço do cliente: ${id}, ${name} alterado para: ${street}, ${number}, ${zip}, ${city}`,
    )
  }
}
