import UserModel from '@/resources/user/user.model';
import token from '@/utils/token';
import User from '@/resources/user/user.interface';
import { Types } from 'mongoose';
import GameModel from '@/resources/game/game.model'; 
import Game from '@/resources/game/game.interface'; 

class UserService {
  private user = UserModel;


  public async register(
    name: string,
    email: string,
    password: string,
    role: string,
  ): Promise<string | Error> {
    try {
      const user = await this.user.create({
        username: email.split('@')[0],
        name,
        email,
        password,
        role,
        games: [],
        profilePic: '',
        bio: '',
        gamesCreated: 0,
        totalPlays: 0,
      });

      const accessToken = token.createToken(user);
      return accessToken;
    } catch (error) {
      throw new Error('Unable to create user');
    }
  }

  public async login(
    email: string,
    password: string,
  ): Promise<string | Error> {
    try {
      const user = await this.user.findOne({ email });
      if (!user) throw new Error('Cannot find this email');

      if (await user.isValidPassword(password)) {
        return token.createToken(user);
      } else {
        throw new Error('Incorrect password');
      }
    } catch (error) {
      throw new Error('Unable to log in user');
    }
  }

  public async getUser(userId: string): Promise<User | Error> {
    try {
      const user = await this.user.findById(userId);
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw new Error('Unable to retrieve user');
    }
  }

  public async getAllUsers(): Promise<User[]> {
    try {
      return await this.user.find();
    } catch (error) {
      throw new Error('Unable to retrieve users');
    }
  }

  public async addGameToUser(userId: string, gameId: string): Promise<User | Error> {
    try {
      const user = await this.user.findById(userId);
      if (!user) throw new Error('User not found');

      user.games.push(new Types.ObjectId(gameId));
      user.gamesCreated = (user.gamesCreated ?? 0) + 1;
      await user.save();

      return user;
    } catch (error) {
      throw new Error('Unable to add game to user');
    }
  }

 
  public async getUserGames(userId: string): Promise<Game[]> {
    try {
      return await GameModel.find({ createdBy: userId });
    } catch (error) {
      throw new Error('Unable to retrieve user games');
    }
  }

 
  public async deleteUser(userId: string): Promise<void> {
    try {
      const user = await this.user.findById(userId);
      if (!user) throw new Error('User not found');

      await user.deleteOne();
    } catch (error) {
      throw new Error('Unable to delete user');
    }
  }

  public async updateUser(userId: string, data: Partial<User>): Promise<User | Error> {
    try {
      const user = await this.user.findById(userId);
      if (!user) throw new Error('User not found');

      Object.assign(user, data);
      await user.save();
      return user;
    } catch (error) {
      throw new Error('Unable to update user');
    }
  }


  public async deleteGameFromUser(userId: string, gameId: string): Promise<User | Error> {
    try {
      const user = await this.user.findById(userId);
      if (!user) throw new Error('User not found');

      user.games = user.games.filter((game: Types.ObjectId) => game.toString() !== gameId);
      await user.save();

      return user;
    } catch (error) {
      throw new Error('Unable to delete game from user');
    }
  }

  public async getProfile(userId: string): Promise<Partial<User> | Error> {
    try {
      const user = await this.user.findById(userId).select('username name email role profilePic bio gamesCreated totalPlays');
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw new Error('Unable to fetch user profile');
    }
  }

  public async updateProfile(
    userId: string,
    profilePic?: string,
    bio?: string,
  ): Promise<User | Error> {
    try {
      const user = await this.user.findById(userId);
      if (!user) throw new Error('User not found');

      if (profilePic) user.profilePic = profilePic;
      if (bio) user.bio = bio;

      await user.save();
      return user;
    } catch (error) {
      throw new Error('Unable to update user profile');
    }
  }

  public async incrementTotalPlays(userId: string): Promise<void> {
    try {
      const user = await this.user.findById(userId);
      if (!user) throw new Error('User not found');

      user.totalPlays = (user.totalPlays ?? 0) + 1;
      await user.save();
    } catch (error) {
      throw new Error('Unable to increment total plays');
    }
  }
}

export default UserService;