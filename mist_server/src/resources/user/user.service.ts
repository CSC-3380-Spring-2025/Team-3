import { Types } from 'mongoose';
import UserModel from '@/resources/user/user.model';
import type { UserDocument } from '@/resources/user/user.interface';
import token from '@/utils/token';
import GameModel from '@/resources/game/game.model';
import type Game from '@/resources/game/game.interface';
import { v4 as uuidv4 } from 'uuid';

class UserService {
  private user = UserModel;

  /** Register a brand new user */
  public async register(
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<string> {
    const existing = await this.user.findOne({ email });
    if (existing) throw new Error('Email already in use');

    const prefix = email.split('@')[0];
    const uniqueUsername = `${prefix}-${uuidv4().slice(0, 8)}`;

    const userDoc = await this.user.create({
      ID:       uuidv4(),
      username: uniqueUsername,
      name,
      email,
      password,
      role,
      games:    [],
    } as Partial<UserDocument>);

    return token.createToken(userDoc);
  }

  
  public async login(email: string, password: string): Promise<string> {
    const userDoc = (await this.user.findOne({ email })) as UserDocument | null;
    if (!userDoc) throw new Error('Cannot find this email');


    if (!await userDoc.isValidPassword(password)) {
      throw new Error('Incorrect password');
    }

    return token.createToken(userDoc);
  }

  
  public async getUser(userId: string): Promise<UserDocument> {
    const userDoc = (await this.user.findById(userId)) as UserDocument | null;
    if (!userDoc) throw new Error('User not found');
    return userDoc;
  }

  
  public async getAllUsers(): Promise<UserDocument[]> {
    return this.user.find() as Promise<UserDocument[]>;
  }

  
  public async getUserGames(userId: string): Promise<Game[]> {
    return GameModel.find({ createdBy: userId });
  }

  
  public async addGameToUser(userId: string, gameId: string): Promise<UserDocument> {
    const userDoc = (await this.user.findById(userId)) as UserDocument | null;
    if (!userDoc) throw new Error('User not found');
    userDoc.games.push(new Types.ObjectId(gameId));
    await userDoc.save();
    return userDoc;
  }

  
  public async deleteUser(userId: string): Promise<void> {
    const userDoc = (await this.user.findById(userId)) as UserDocument | null;
    if (!userDoc) throw new Error('User not found');
    await userDoc.deleteOne();
  }

  
  public async updateUser(userId: string, data: Partial<UserDocument>): Promise<UserDocument> {
    const userDoc = (await this.user.findById(userId)) as UserDocument | null;
    if (!userDoc) throw new Error('User not found');
    Object.assign(userDoc, data);
    await userDoc.save();
    return userDoc;
  }

  
  public async deleteGameFromUser(userId: string, gameId: string): Promise<UserDocument> {
    const userDoc = (await this.user.findById(userId)) as UserDocument | null;
    if (!userDoc) throw new Error('User not found');
    userDoc.games = userDoc.games.filter((g) => g.toString() !== gameId);
    await userDoc.save();
    return userDoc;
  }
}

export default UserService;