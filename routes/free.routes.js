const express = require('express');
const free = require('../controller/freeticket.controller');
const transport = require('../email/email');
const db = require('../models/modelindex');
const qr = require('qrcode');

const htmlPdf = require('html-pdf-node');


const router = express.Router()

router.post('/',async(req,res)=>{
if(await db.free.count() <= 1500 ){
    try {
        // const obj =  await free.findbyemail(req.body)
          const ticket = await free.generate(req.body)
          

        qr.toFile(`./app/freeticket${ticket.dataValues.id}.png`,JSON.stringify(req.body),{
            errorCorrectionLevel:'L',
        },async(err,data)=>{
            if(err){
                res.json({message:err})
            }

            const options = {format:'A4',path:`./app/freeticket${ticket.dataValues.id}.pdf`}

            const file ={content:`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <style>
            #world{
                display: flex;
                justify-content:space-between;
                flex-direction: column;
                align-items: center;
                border:2px solid red ;
                border-radius: 15px;
                width: 500px;
                height:550px ;
                margin-top: 0%;
            }
            #first{
                background-image:url('http://127.0.0.1:5500/app/images.png');
                width: 100%;
                height: 65px;
                border-top-left-radius:  10px;
                border-top-right-radius:  10px;
                text-align: center;
                vertical-align: middle;
            }
            p{
                display: flex;
                flex-direction: column;
            }
            #second{
                width:70%;
                display: flex;
                justify-content: space-evenly;
            }
            #third{
                width:90%;
                display: flex;
                justify-content: space-evenly;
                color:red;
            }
            #fourth{
                width:100%;
                height:100%;
                border-top-left-radius:  10px;
                border-top-right-radius:  10px;
            }
            </style>
            
            <body>
                <div id="world">
                    <div id="first"> <img id="fourth" src='http://127.0.0.1:5500/app/images.png' text="Bolebration 2023"/> </div>
                    
                    <section id="second"><p><span>phone NO</span> human beign</p>
                        <p><span>Gender</span> human beign</p></section>
                    <section id="third">
                        <p><span>Date</span> human beign</p>
                    <p><span>Type</span> human beign</p>
                    <p><span>Ticket NO</span> human beign</p>
                    </section>
                    <img src='http://127.0.0.1:5500/app/freeticket${ticket.dataValues.id}.png' width="200" height="200"/>
                </div>
            </body>
            </html>`}


            
            htmlPdf.generatePdf(file,options).then(()=>{

              const  mailoptions = {
                    from:'agroease50@gmail.com',
                    to:`${req.body.email}`,
                    subject:'BOLEBRATION',
                    html:`<html>
                    <p>Ticket: <img src='http://127.0.0.1:5500/app/freeticket${ticket.dataValues.id}.png' width="300" height="300"/></p>
                    </html>`,
                    attachments:[
                        {
                            filename:`freeticket${ticket.dataValues.id}.pdf`,
                            path:`./app/freeticket${ticket.dataValues.id}.pdf`
                        }
                    ]
                    
                }

                transport.sendMail(mailoptions,(error,info)=>{
                    console.log('hello')
                    if(error){
                        return console.log(error)
                    }
                    console.log('sent')
                })
            });

                

           
            
           
        


            res.json({
                message:'check your email for your ticket'
               })
            
        })

          
      
      } catch (error) {
          res.json({error})
      }

}else{
    res.json({
        message:'there are no more free tickets'
      })  
}
  
    
})



module.exports = router