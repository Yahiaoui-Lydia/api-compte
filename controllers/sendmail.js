//Il faut importer nodemailer
const nodemailer = require('nodemailer')
const send = async (email,subject,contenu) => {
//On se connecte au transporter avec différentes options en fonction de l'environnement
let transporter = null
if (process.env.NODE_ENV === 'prod') {
  transporter = nodemailer.createTransport({
    host: 'your host',
    port: 'your port',
    secure: false,
    auth: {
      user: 'the user of smtp',
      password: 'the password',
    },
  })
} else {
  transporter = nodemailer.createTransport({
  service: 'gmail',
    auth: {
        user: 'pfc.pro.vision@gmail.com',
        pass: 'testmail'
    }
  })
}
// Fonction asynchrone pour attendre le retour
async function sendMail() {
  const mailOptions = {
    from: 'PRO VISION SECURETY SYSTEMS',
    to: email,
    subject: subject,
    // text: "votre code de confirmation est :", //Le contenu de la version texte
    html:contenu
    //   "<h1></h1><p>Voici le texte dans un paragraph pour l'email de test</p>", // Le contenu de la version HTML
  }
  await transporter.sendMail(mailOptions)
}

//On lance l'email
sendMail()
console.log('vghg');
}
module.exports= {send};