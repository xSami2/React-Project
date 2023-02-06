import express from "express";

import { getFeedPosts ,getUserPosts , likePost} from "../Controllers/posts.js"
import {verifyToken} from "../middleware/Auth.js";

const router = express.Router();

/* Read  */
router.get("/" , verifyToken , getFeedPosts)
router.get('/:usedID/posts' , verifyToken , getUserPosts)
/* Update */
router.patch('/:id/like' , verifyToken , likePost)


export default router;