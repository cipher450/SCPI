const sql = require("../config/sqlConnect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const userInfo = ({ password, ...obj }) => obj;

module.exports = {
  login: async (req, res) => {
    const email = req.body.email || "";
    const user_password = req.body.password || "";
    const errorMSG = "e-mail / Mot de passe incorrect";
    const query = "SELECT * FROM user_admin WHERE email = @param";

    var request = new sql.Request();
    request.input("param", sql.VarChar, email);
    const result = await request.query(query);

    // Voir si l'utilisateur exist
    if (result.rowsAffected[0] == 0) {
      return res.status(404).send({ error: "Utilisateur introuvable" });
    } else {
      const db_password = result.recordset[0].password;
      const compare = await bcrypt.compare(user_password, db_password);

      if (compare == true) {
        const token = jwt.sign({ email }, config.JWT.key, {
          expiresIn: config.JWT.expiration,
        });

        res.status(200).send({ token: token });
      } else if (compare == false) {
        return res.send({ error: errorMSG });
      }
    }
  },
  auth: async (req, res) => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
      res.status(403).send("A token is required for authentication");
    }
    try {
      jwt.verify(token, config.JWT.key);
      res.status(200).send();
    
    } catch (err) {
      res.status(401).send("Invalid Token");
    }
   
  },
  
  authMiddleware: async (req, res, next) => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
      res.status(403).send("A token is required for authentication");
    }
    try {
      jwt.verify(token, config.JWT.key);
     
      next();
    } catch (err) {
      res.status(401).send("Invalid Token");
    }
   
  },
};
