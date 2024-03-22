const express=require('express');
const nodemailer=require('nodemailer');
const app=express();
require('dotenv').config();

app.set('view engine','hbs');
app.use(express.json());   ///json mai cobvert krke rq .body mai daal dega

app.use(express.urlencoded({extended:true})); 

let otp;
function generateOtp(){
    otpVal = Math.floor(1000 + Math.random() * 9000);
    console.log(otpVal);
    return otpVal;
}

app.get('/', (req, res)=> {
    res.render('index');
});

app.post('/send',async(req,res)=>{ //597
    otp=generateOtp();
    const recemail=req.body.email;
    const transporter=nodemailer.createTransport({  //send mail function hota hai
        service:"gmail",
        auth:{
            user: "terastupid07@gmail.com",
            pass:process.env.PASS, 
        }
    })
    const mail={
        to: recemail,
        from: "terastupid07@gmail.com",
        subject:"otp",
        text: `${otp}`,
    }

    try{
        await transporter.sendMail(mail);
        res.send("otp sent successfully");
    }
    catch(err){
        res.send("otp not sent");
    }
});

app.post('/verify',(req, res)=> {
    if (req.body.otp == otp) {
        res.send("You entered correct otp");
    }
    else {
        res.send('otp is incorrect');
    }
});

app.listen(3000,()=>{
    console.log("http://localhost:3000");
})