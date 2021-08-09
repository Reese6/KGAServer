import { ObjectId } from 'mongoose';

import { Coordinate } from '../schemas/seaBattle.schema';

export class AddShipSeaBattleDto {
  readonly coordinates: Coordinate[];
  readonly userId: ObjectId;
}
