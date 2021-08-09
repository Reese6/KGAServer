import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose } from 'mongoose';

import { User } from 'src/user/schemas/user.schema';

export type SeaBattleDocument = SeaBattle & Document;

export type XAxis = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J';
export type YAxis = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type Coordinate = {
  [key in XAxis]: YAxis;
};

export type Move = {
  type: 'blue' | 'red';
  xAxis: XAxis;
  yAxis: YAxis;
};

export type Ship = {
  killed: boolean;
  coordinate: Coordinate;
};

@Schema({ collection: 'sea-battle' })
export class SeaBattle {
  @Prop({
    type: { type: SchemaMongoose.Types.ObjectId, ref: 'User' },
  })
  blueUser: User;

  @Prop({
    type: { type: SchemaMongoose.Types.ObjectId, ref: 'User' },
  })
  redUser: User;

  @Prop()
  moves: Move[];

  @Prop()
  blueShips: Ship[];

  @Prop()
  redShips: Ship[];
}

export const SeaBattleSchema = SchemaFactory.createForClass(SeaBattle);
