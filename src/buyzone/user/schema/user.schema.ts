import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type userDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: number;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
