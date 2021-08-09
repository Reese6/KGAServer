import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { SeaBattleController } from './seaBattle.controller';
import { SeaBattleService } from './seaBattle.service';
import { SeaBattleSchema, SeaBattle } from './schemas/seaBattle.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SeaBattle.name, schema: SeaBattleSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [SeaBattleController],
  providers: [SeaBattleService],
})
export class SeaBattleModule {}
