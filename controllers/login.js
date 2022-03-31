
//authentification des users et return le id ainsi que le token 
//concerne la Route: [api/users/login]
const knex = require('../db/knex');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.KEY
const bcrypt = require('bcrypt');
const login = async (req, res) => {

    try {
  
      const { email, password } = req.body;
  
      let user = await knex.select().from('users').where('email', email).then((user) => { return user[0] }) // chercher l'utilisateur dans la base de données
      
      if (!user) {
        // si le user n'existe pas dans la base de données
        return res.status(400).json({ msg: 'Email non trouvé!' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password); // hasher le password inserer dans la base de données et le comparer a celui de la base de données
  
      if (!isMatch) {
        // si le password est incorrect 
        return res.status(400).json({ msg: "informations d'identification invalides" });
      }
  
      const payload = { //ce qui sera renvoyé (id user) si le token est correct lors de la verification
        user: {
          id: user.id,
        },
      };
  
      jwt.sign(
        payload,
        jwtSecret, // Obtient la cle dans le fichier .env
        {
          expiresIn: '2d', // 2 jours
        },
        (err, token) => {
          if (err) throw err;
          res.json({ id: user.id , token }); // retourne l'id du user et le token
        }
      );
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send("erreur serveur");
    }
  }
  module.exports= {login};
 