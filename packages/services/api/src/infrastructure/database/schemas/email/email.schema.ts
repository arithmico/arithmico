import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { nanoid } from 'nanoid';

@Schema()
export class Email {
  @Prop({ type: String, default: () => nanoid() })
  _id?: string;

  @Prop({ type: String, required: true })
  rawEmail: string;
}

export type EmailDocument = HydratedDocument<Email>;
export const EmailSchema = SchemaFactory.createForClass(Email);

EmailSchema.index({
  from: 1,
});

EmailSchema.index({
  to: 1,
});

EmailSchema.index({
  from: 1,
  to: 1,
});

EmailSchema.index({
  subject: 1,
});
