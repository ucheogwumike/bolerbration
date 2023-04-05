const express = require('express');
const qr  = require('qrcode');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const path = require('path')
const transport = require('./email/email');
const db = require('./models/modelindex');
const freeRouter = require('./routes/free.routes')

const app = express()


// app.set('view engine', 'handlebars');
// app.engine('handlebars',engine({
//     dir:__dirname+'./app/layouts',
// }));

// app.use('./app',express.static(path.join(__dirname,'app')));
app.use(express.static(path.join(__dirname,'app')));


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const PORT = 4040



const person ={name:'TARE',
                gender:'MALE',
                phone: 08033222788}
output = `<h1>Bolebration Ticket<h1/>`
app.get('/home',(req,res)=>{
    qr.toFile('./app/newfile.png',JSON.stringify(person),{
    errorCorrectionLevel: 'L',
   // type: 'SVG',
    
},async(err,data)=>{
    if(err){
        res.json({err})
    }
    console.log(data)
    let output = `<img src="./app/newfile.png" />`
    let mailoptions = {
        from:'agroease50@gmail.com',
        to:'ucheogwumike@gmail.com',
        subject:'BOLEBRATION',
        html:`<html>
        <p>Ticket: <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--zvmsXkKP--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/227etdqwlykpto84svz1.png" width="250" height="150"/></p>
        </html>`,
        attachments:[
            {
                filename:'newfile.png',
                path:'./app/newfile.png'
            }
        ]
        
    }
    console.log(output)
    transport.sendMail(mailoptions,(error,info)=>{
        if(error){
            return console.log(error)
        }
        console.log('sent')
    })

    res.send(`<img src="./app/newfile.png" />`);
})

})

// app.get('/count/',async(req,res)=>{
//     //get from db
//     res.redirect('http://127.0.0.1:5500/app/index.html')
//     //res.send('count');
// })

app.post('/',async(req,res)=>{
let attendees = req.body
if(count>1500){
    res.redirect('')
}

if(count <=1500){
    res.send('please claim your ticket through the email you provided')

}
})

app.listen(PORT,()=>{
    console.log('loud and clear!!!',PORT)
})

app.use('/free',freeRouter);
db.sequelize.sync();