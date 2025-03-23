import UserModel from '@/resources/user/user.model';
import token from '@/utils/token';
import User from '@/resources/user/user.interface';
import { Types } from 'mongoose';

class UserService {
    private user = UserModel;

    /**
     * Registering a new user
     */

    public async register(
        name: string,
        email: string,
        password: string,
        role: string,
    ): Promise<string | Error> {
        try {
            const user = await this.user.create({
                name,
                email,
                password,
                role,
            });

            const accessToken = token.createToken(user);

            return accessToken;
        } catch (error) {
            throw new Error('unable to make user');
        }
    }

    /**
     * login a user
     */

    public async login(
        email: string,
        password: string,
    ): Promise<string | Error> {
        try {
            const user = await this.user.findOne({ email });
            if (!user) {
                throw new Error('Cannot find this email');
            }

            if (await user.isValidPassword(password)) {
                return token.createToken(user);
            } else {
                throw new Error('Incorrect password');
            }
        } catch (error) {
            throw new Error('unable to log in user');
        }
    }
    public async addGameToUser(userId: string, gameId: string): Promise<User> {
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        user.games.push(new Types.ObjectId(gameId));
        await user.save();
        return user;
    }
    public async getUserGames(userId: string): Promise<User> {
        const user = await UserModel.findById(userId).populate('games').exec();
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      }
}

export default UserService;
