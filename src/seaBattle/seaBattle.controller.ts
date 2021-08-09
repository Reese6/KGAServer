import { ObjectId } from 'mongoose';
import { Body, Controller, Param, Post } from '@nestjs/common';

import { MoveSeaBattleDto } from './dto/sea-battle-move.dto';
import { SeaBattleService } from './seaBattle.service';

@Controller('/sea-battle')
export class SeaBattleController {
  constructor(private seaBattleService: SeaBattleService) {}

  @Post('/create')
  create(@Body('userId') userId: ObjectId) {
    return this.seaBattleService.create(userId);
  }

  @Post(':id/connect')
  connect(@Param() id: ObjectId, @Body() userId: ObjectId) {
    return this.seaBattleService.connectUser(userId, id);
  }

  @Post(':id/move')
  move(@Body() dto: MoveSeaBattleDto, @Param() id: ObjectId) {
    return this.seaBattleService.move(dto, id);
  }
}
