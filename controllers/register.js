//ajouter un nouveau user a la table users 
//Route: /register
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const randtoken = require('rand-token');
const mail = require('../controllers/sendmail');

const sendemail=(email)=>{//envoyer un email de confirmation
  var code = randtoken.generate(8);//generer une chaine aleatoire
  const subject='Confirmez votre compte'
  const contenu="<h1>votre code de confirmation est</h1><p> "+ code
  mail.send(email,subject,contenu)
  console.log(code)
  return code

}

const register = async (req, res) => {//inscription

    try {
    let {email,username,password,role } = req.body;
    console.log(req.body);
    let emailExists = await knex.select().from('users').where('email', email).then((user) =>  { return user[0] });//verifier si l'email existe deja
    
    if (!emailExists) { // si l email n'existe pas dans la base de données alors inserer un nouveau user
        var code=  await sendemail(email);//envoyer un email de confirmation pour l'utilisateur
        let newUser = { email,username,password,role,code }

        const salt = await bcrypt.genSalt(10); //generer une chaîne aléatoire de 10 caracteres
    
        newUser.password = await bcrypt.hash(password, salt); // hasher le password
   

        await knex('users').insert(newUser); // Inserter un nouvel utilisateur
        let user = await knex.select().from('users').where('email', email).then((user) => { return user[0] })
        res.send({ id:user.id })
    } else {
      res.send({ msg: "utilisateur deja inscrit"}) // Condition if user is already in the database
    }


} catch (err) {
  console.error(err.message);
  res.status(500).send("erreur serveur");
}}
const confirm = async (req, res) => {
  var code = req.body.code;
  var id = req.body.id;
  let user = await knex.select().from('users').where('id', id).then((user) => { return user[0] })
  if (code== user.code) {
    res.send('bravo')
  } else {
    res.send('code incorrecte')
  }
}

module.exports= {register,confirm};
 
