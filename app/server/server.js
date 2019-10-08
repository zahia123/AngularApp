const express = require('express')
const app = express()
const cors =require('cors')
const nodemailer =require ('nodemailer')
const mongoose = require ('mongoose')
const path=require('path')
const bodyParser =require('body-parser')
const routes =require ('./routes/routes')
const userRoutes= require('./routes/user')
require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use('/upload',express.static(path.join("./upload")));

//creating a transposter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    
    secure: true,
    auth:{
      user: process.env.emailUsername,
      pass:process.env.emailPassword
    },
    
})
 /**
	* creating the mailoption and sending throught transport.sendmail
*/

function sendEmail(mail){
    var mailOptions={
        from:mail.email,
        
        to:'hcherfaoui64@gmail.com',
        subject:mail.subject,
        html:mail.body
        
    }
    transporter.sendMail(mailOptions,function(err,info){
        if(err){
            console.log(err)
        }
        else{
            console.log('email sent'+info.response)
        }
    })
}
 /**
	* getting user email, name and message
*/

app.post('/sendmail', (req, res) => {
   console.log(req.body)
   mail={
    email:req.body.email,
    body:req.body.text,
    subject:req.body.firstName
}
res.send('success')
sendEmail(mail)
  
})
app.use('/api', routes)
app.use('/api/user', userRoutes)
 /**
	* connecting to moongoDB
*/

mongoose.connect(process.env.dbConnection,
    {  useCreateIndex: true,
        useNewUrlParser: true },()=>
   console.log('connected to db'));
   const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))