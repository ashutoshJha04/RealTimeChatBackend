
import getPrismaInstance from "../utils/PrismaClient.js";

export const checkUser = async(req,res,next)=>{
    try {
        const {email} = req.body;
        if (!email) {
            return res.json({message:"Email is required",status:false});
        }
        const prisma = getPrismaInstance();
        const user = await prisma.user.findUnique({where:{email}});
        if(!user){
            return res.json({message:"User does not exist",status:false});
        }
        else{
            return res.json({message:"User Found",status:true,data:user});
        }
    } catch (error) {
        next(error);
    }
}


export const onBoardUser = async (req,res,next) => {
    try {
        const {email,name,about,image:profilePicture} = req.body;
        if (!email || !name || !profilePicture) {
            return res.send("Email , name ,Image are required");
        }
        const prisma = getPrismaInstance();
        await prisma.user.create({data:{email,name,about,profilePicture}});
        res.json({msg:"success",status:true});
    } catch (error) {
        next(error);
    }
}

export const getAllUsers = async(req,res,next)=>{
    try{
        const prisma = getPrismaInstance();
        const users = await prisma.user.findMany({
            orderBy:{name:"asc"},
            select:{
                id:true,
                email:true,
                name:true,
                profilePicture:true,
                about:true,
            }
        })
        const usergrop = {};
        users.forEach( (user) => {
            const init = user.name.charAt(0).toUpperCase();
            if(!usergrop[init]){
                usergrop[init] = []; 
            }
            usergrop[init].push(user);
            
        });
        return res.status(200).send({users:usergrop});
    }
    catch(err){
            next(err);
    }
}