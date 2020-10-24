import { AggregateRoot, IEvent } from "@nestjs/cqrs"
import { UserCreatedEvent } from '../../events/users/user-created.event'

interface UserAggregator extends AggregateRoot<IEvent> {
  userCreatedEvent(id: string): void
}

class UsersAggregatorHost extends AggregateRoot implements UserAggregator {
  userCreatedEvent(id: string) {
    this.apply(new UserCreatedEvent(id))
  }
}

export const PaymentAggregator = ((): UserAggregator => new UsersAggregatorHost())()
