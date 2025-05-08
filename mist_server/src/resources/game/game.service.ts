import { Types } from "mongoose";
import GameModel from "./game.model";
import Game from "./game.interface";

interface CreateGameDto {
  title:    string;
  gameType: string;
  data:     string;
  userId:   string;
  gameID:   string;
}

class GameService {
  public async createGame(dto: CreateGameDto): Promise<Game> {
    const created = await GameModel.create({
      title:     dto.title,
      gameType:  dto.gameType,
      data:      dto.data,
      createdBy: new Types.ObjectId(dto.userId),
      gameID:    dto.gameID,
    });
    return created;
  }

  public async getAllGames(): Promise<Game[]> {
    return GameModel.find().populate("createdBy", "username").exec();
  }

  public async getGameById(id: string): Promise<Game | null> {
    return GameModel.findById(id).populate("createdBy", "username").exec();
  }

  public async deleteGame(id: string): Promise<Game | null> {
    return GameModel.findByIdAndDelete(id).exec();
  }
}

export default GameService;
