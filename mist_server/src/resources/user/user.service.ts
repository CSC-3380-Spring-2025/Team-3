import userModel from '@/resources/user/user.model';
import token from '@/utils/token';

class UserService {
    private user = userModel;

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
            throw new Error('uabe to make user')
        }
    }

    /**
     * login a user
     */

    public async login( 
        email:string,
        password:string
    ): Promise<string | Error> {
        try {
            const user = await this.user.findOne({email})
            if  (!user){
                throw new Error('cant find him')
            }

            if (await user.isValidPassword(password)){
                return token.createToken(user)
            } else {
                throw new Error(
                    'wrong.'
                )
            }
        } catch (error) {
            throw new Error(
                'unable ton login user'
            )
            
        }
    }
}

export default UserService;

