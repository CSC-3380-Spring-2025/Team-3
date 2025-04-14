import UserModel from '@/resources/user/user.model';
import token from '@/utils/token';
import User from '@/resources/user/user.interface';
import { Types } from 'mongoose';
import GameModel from '@/resources/game/game.model'; // Import GameModel
import Game from '@/resources/game/game.interface'; // Import Game interface

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
    /**
     * Get user information
     */
    public async getUser(userId: string): Promise<User | Error> {
        try {
            const user = await this.user.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error('Unable to retrieve user');
        }

    }
    /**
     * Get all users
     */
    public async getAllUsers(): Promise<User[]> {
        try {
            const users = await this.user.find();
            return users;
        } catch (error) {
            throw new Error('Unable to retrieve users');
        }
    }

    /**
     * Add a game to a user
     */
    public async addGameToUser(userId: string, gameId: string): Promise<User | Error> {
        try {
            const user = await this.user.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            user.games.push(new Types.ObjectId(gameId));
            await user.save();
            return user;
        } catch (error) {
            throw new Error('Unable to add game to user');
        }
    }
    /**
     * Get all games created by a user
     */

    public async getUserGames(userId: string): Promise<Game[]> {
        const games = await GameModel.find({ createdBy: userId }); // Fetch games by user
        return games;
    }
    /**
     * Get all games associated with a user
     */
    // public async getUserAssociatedGames(userId: string): Promise<Game[]> {
    //     const user = await this.user.findById(userId).populate('games'); // Populate games field
    //     if (!user) {
    //         throw new Error('User not found');
    //     }
    //     return user.games as Game[]; // Return populated games
    // }




    /**
     * Delete a user
     */
    public async deleteUser(userId: string): Promise<void> {
        try {
            const user = await this.user.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            await user.deleteOne();
        } catch (error) {
            throw new Error('Unable to delete user');
        }
    }
    /**
     * Update a user
     */
    public async updateUser(userId: string, data: Partial<User>): Promise<User | Error> {
        try {
            const user = await this.user.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            Object.assign(user, data);
            await user.save();
            return user;
        } catch (error) {
            throw new Error('Unable to update user');
        }
    }

    /**
     * Delete a game from a user
     */
    public async deleteGameFromUser(userId: string, gameId: string): Promise<User | Error> {
        try {
            const user = await this.user.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            user.games = user.games.filter((game: Types.ObjectId) => game.toString() !== gameId);
            await user.save();
            return user;
        } catch (error) {
            throw new Error('Unable to delete game from user');
        }
    }

    // public async getAllGamesOfUser(userId: string): Promise<Game[] | Error> {
    //     try {
    //         const user = await this.user.findById(userId).populate('games');
    //         if (!user) {
    //             throw new Error('User not found');
    //         }
    //         return user.games as Game[];
    //     } catch (error) {
    //         throw new Error('Unable to retrieve games of user');
    //     }
    // }


    

}

export default UserService;
