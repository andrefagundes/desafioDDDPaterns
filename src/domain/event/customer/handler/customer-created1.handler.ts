import EventHandlerInterface from '../../@shared/event-handler.interface'
import CustomerCreated1Event from '../customer-created.event'

export default class CustomerCreated1
  implements EventHandlerInterface<CustomerCreated1Event>
{
  handle(event: CustomerCreated1Event): void {
    console.log('Esse é o primeiro console.log do evento: CustomerCreated')
  }
}
