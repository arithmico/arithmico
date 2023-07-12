import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { renderToString } from 'react-dom/server';
import { EmailService } from '../../email.service';
import { ActivateAccountEmail } from './activate.email';
import { SendActivationEmailEvent } from './send-activation-email.event';

@EventsHandler(SendActivationEmailEvent)
export class SendActivationEmailEventHandler
  implements IEventHandler<SendActivationEmailEvent>
{
  constructor(private emailService: EmailService) {}

  async handle(event: SendActivationEmailEvent): Promise<void> {
    const content = renderToString(
      ActivateAccountEmail({ name: event.username, url: event.activateUrl }),
    );

    await this.emailService.sendEmail(
      event.to,
      'Aktivierung Ihres Arithmico-Kontos',
      content,
    );
  }
}
