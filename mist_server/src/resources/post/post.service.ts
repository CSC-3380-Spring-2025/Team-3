import PostModel from '@/resources/post/post.model'; 
import Post from '@/resources/post/post.interface';

class PostService{
    private post = PostModel;

    /*
    create a new post
    */
   public async create(title: string, body:string): Promise<Post> {
    try {
        const post = await this.post.create({title, body});

        return post;
    } catch (error) {
        throw new Error('unable to create this post');
    }
   }
}

export default PostService;