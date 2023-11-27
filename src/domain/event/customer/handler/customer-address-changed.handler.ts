import EventHandlerInterface from '../../@shared/event-handler.interface'
import CustomerAddressChangedEvent from '../customer-address-changed.event'

export default class CustomerAddressChangedHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    const { id, name, Address } = event.eventData
    const { _street, _number, _zip, _city } = Address

    console.log(
      `Endereço do cliente: ${id}, ${name} alterado para: ${_street}, ${_number}, ${_zip}, ${_city}`,
    )
  }
}
