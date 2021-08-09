import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user';
import { SeaBattleModule } from './seaBattle';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/sea-battle'),
    UserModule,
    SeaBattleModule,
  ],
})
export class AppModule {}
