import { ObjectId } from 'mongoose';

import { XAxis, YAxis } from '../schemas/seaBattle.schema';

export class MoveSeaBattleDto {
  readonly userId: ObjectId;
  readonly xAxis: XAxis;
  readonly yAxis: YAxis;
}
