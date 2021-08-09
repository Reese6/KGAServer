import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { AddShipSeaBattleDto } from './dto/sea-battle-add-ship.dto';
import { MoveSeaBattleDto } from './dto/sea-battle-move.dto';
import { SeaBattle, SeaBattleDocument } from './schemas/seaBattle.schema';
import { User, UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class SeaBattleService {
  constructor(
    @InjectModel(SeaBattle.name)
    private seaBattleModel: Model<SeaBattleDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(userId: ObjectId) {
    const user = await this.userModel.findById(userId);
    const newSeaBattleGame = await this.seaBattleModel.create({
      blueUser: user._id,
    });

    user.seaBattles.push(newSeaBattleGame._id);
    await user.save();

    return newSeaBattleGame._id;
  }

  async connectUser(userId: ObjectId, battleId: ObjectId) {
    const seaBattle = await this.seaBattleModel.findById(battleId);
    const user = await this.userModel.findById(userId);

    seaBattle.redUser = user._id;
    await seaBattle.save();

    user.seaBattles.push(seaBattle._id);
    await user.save();

    return {
      message: 'success',
    };
  }

  async move(dto: MoveSeaBattleDto, battleId: ObjectId) {
    const seaBattle = await this.seaBattleModel.findById(battleId);
    const user = await this.userModel.findById(dto.userId);

    seaBattle.moves.push({
      type: seaBattle.redUser === user._id ? 'red' : 'blue',
      xAxis: dto.xAxis,
      yAxis: dto.yAxis,
    });
    await seaBattle.save();

    return {
      message: 'success',
    };
  }

  async addShip(dto: AddShipSeaBattleDto, battleId: ObjectId) {
    const seaBattle = await this.seaBattleModel.findById(battleId);
    const user = await this.userModel.findById(dto.userId);

    const typeUser = seaBattle.redUser === user._id ? 'redShips' : 'blueShips';

    seaBattle[typeUser] = dto.coordinates.map((coordinate) => ({
      killed: false,
      coordinate,
    }));
    await seaBattle.save();

    return {
      message: 'success',
    };
  }
}
