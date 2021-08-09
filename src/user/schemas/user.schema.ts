import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose } from 'mongoose';

import { SeaBattle } from 'src/seaBattle/schemas/seaBattle.schema';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop({
    type: [{ type: SchemaMongoose.Types.ObjectId, ref: 'SeaBattle' }],
  })
  seaBattles: SeaBattle[];
}

export const UserSchema = SchemaFactory.createForClass(User);
