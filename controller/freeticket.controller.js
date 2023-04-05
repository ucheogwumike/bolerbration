const db = require('../models/modelindex');



const generate = async(body)=>{
   const freeticket = await db.free.create(body);
    return freeticket;
}

const findbyemail = async(body)=>{
    const check = await db.free.findOne({where:{email:body.email}})
}


module.exports ={generate, findbyemail}