import jwt from "jsonwebtoken";

export const verifyToken = async (req , res , next) => {
    try {
        let token = req.header("Authorization"); // Pull Authorization from the Header
        if (!token) { return res.static(403).send("Access Denied") }  // If no token Return 403

        if (token.startWith("Bearer ")){ token = token.slice(7 , token.length).trimLeft() }  // if we have token with the type Bearer slice it
        const verified = jwt.verify(token , process.env.JWT_SECRET)  // compare the token with our JWT_Secret , will return true or false
        req.user = verified ;  // verify the user
    }catch (err)
    {
        res.static(500).json({error : err.message})
    }
}