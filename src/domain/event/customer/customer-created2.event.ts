import EventInterface from '../@shared/event.interface'

export default class CustomerCreated2Event implements EventInterface {
  dateTimeOccurred: Date
  eventData: any

  constructor(eventData: any) {
    this.dateTimeOccurred = new Date()
    this.eventData = eventData
  }
}
