import jwt from 'jsonwebtoken';
import type { UserDocument } from '@/resources/user/user.interface';
import type Token from './interfaces/token.interface';

const SECRET = process.env.JWT_SECRET as string;

export const createToken = (user: UserDocument): string => {
  
  const id = (user._id as any).toString();
  return jwt.sign({ id, role: user.role }, SECRET, { expiresIn: '1d' });
};

export const verifyToken = (token: string): Promise<Token> =>
  new Promise((resolve, reject) => {
    jwt.verify(token, SECRET, (err, payload) =>
      err ? reject(err) : resolve(payload as Token)
    );
  });

export default { createToken, verifyToken };