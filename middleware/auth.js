import jwt from 'jsonwebtoken'

const auth = async (req,res,next)=>{
    try {
        // console.log(req.headers)
        const token= req.headers.authorization.split(" ")[1]
        const isCustomAuth=token.length<500;

        let decodedData;
        
        if(token && isCustomAuth){
            decodedData=jwt.verify(token,'Danish')
            
            req.userId=decodedData?.id
        }
        else{
            decodedData=jwt.decode(token)
            req.userId=decodedData?.sub;//(sub) is simply a Google name for "specific id" that diffrentiates every single google user
        }  

        next()
    } catch (error) {
        console.log(error)
        
    }
}
export default auth;