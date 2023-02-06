import Post from "../models/Post.js"
import User from "../models/User.js";


export  const createPost = async (req , res) => {
    try
    {
     const { userId , description , picturePath} = req.body
        const user = await User.findById(userId);
      const newPost = new Post({
          userId ,
         firstname : user.firstname ,
          lastname : user.lastname ,
          location : user.location ,
          description ,
          picturePath,
          userPicturePath : user.picturePath ,
          likes:{},
          comment: []
      })
        await newPost.save();
       const post = await Post.find();
       res.status(201).json(post)
    }
    catch (err)
    {
        res.status(409).json({message : err.message})
    }
}
/* READ */
export const getFeedPosts = async (req , res) => {
    try
    {
   const Post = await  Post.find();
   res.status(200).json(Post);
    }
    catch (err)
    {
        res.status(404).json({message : err.message})
    }
}

export const getUserPosts = async(req , res) => {
    try
    {
        const {userId} = req.params ;
        const Post = await  Post.find({userId});
        res.status(200).json(Post);
    }
    catch (err)
    {
        res.status(404).json({message : err.message})
    }
}

/* UPDATE */
export const likePost = async (req , res ) => {
    try
    {
        const {id} = req.params
        const {userId} = req.body;
        const post = await Post.findById(userId)
        const isLiked = post.likes.get(userId) // Check if the user is liked or not
        if(isLiked)  // liked ?
        {
            post.likes.delete(userId) // delete the like
        }
        else // not liked?
        {
            post.likes.set(userId , true) // like the post
        }
        const updatedPost = await post.findByIdAndUpdate(  // update the post
            id , {likes : post.likes} , { new : true}
        )

        res.status(200).json(updatedPost);
    }
    catch (err)
    {
        res.status(404).json({message : err.message})
    }
}