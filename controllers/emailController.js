const nodemailer = require('nodemailer');

const sendingEmail = async (req, res) =>{
    const { nombre, telefono, email, asunto, mensaje } = req.body;
    const transporter = nodemailer.createTransport({
       // host:"smtp.gmail.com",
        service:"gmail",
        secure:false, // port si secure es false por defecto tendria el port 587, si es true 465
        auth: {
            user:"comision11irc@gmail.com",
            pass: "qzkqysksnsnmvuae"
        }
    })

    const mailOptions = {
        from: "martincho@gmail.com",
        to: "comision11irc@gmail.com",
        subject: "envio de email",
        html: `
            <h1>Hola Mundo</h1>
        `,
  //      attachments:[
  //          {
  //              filename:req.file.originalname,
  //              path: req.file.path,
  //              contentType: req.file.mimetype
  //          }
  //      ]
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            return res.send(err)
        } else {
            console.log(info)
        }
    })
    res.status(200).json({
        mensaje: "email enviado correctamente"
    })
}



module.exports = sendingEmail