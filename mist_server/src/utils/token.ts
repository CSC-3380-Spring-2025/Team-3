import jwt from 'jsonwebtoken';
import User from '@/resources/user/user.interface';
import Token from './interfaces/token.interface';

export const createToken = (user: User): string => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET as jwt.Secret, {
        expiresIn: '1d',
    });
};

export const verifyToken = async (
    token: string,
): Promise<jwt.VerifyErrors | Token> => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            process.env.JWT_SECRET as jwt.Secret,
            (error, payload) => {
                if (error) {
                    return reject;
                }
                resolve(payload as Token);
            },
        );
    });
};

export default {createToken, verifyToken};
