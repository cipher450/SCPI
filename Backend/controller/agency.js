 
const sql = require("../config/sqlConnect");
const auth = require("./admin")
const isEmpty  = require("../helper");

module.exports = {
  find: async (req, res) => {
    const query = "SELECT * FROM Agency";
    const result  = await sql.query(query);

    res.status(200).send(result .recordset);
  },
  find: async (req, res) => {
    const query = "SELECT * FROM Agency";
    const result  = await sql.query(query);

    res.status(200).send(result .recordset);
  },
  findOne: async (req, res) => {
    const slug = req.params.slug || null;

    const query = "SELECT *  FROM Agency LEFT JOIN scpi ON  agency.id = scpi.parentAgency where agency.slug = @param"; // using * all the time is bad practice
    var request = new sql.Request();
    request.input("param", sql.VarChar, slug);

    const result  = await request.query(query);

    res.status(200).send(result.recordset);
  },
  search: async (req, res) => {
    const title = req.params.title || null;

    const query = "SELECT * FROM Agency WHERE title LIKE @param";
    var request = new sql.Request();
    request.input("param", sql.VarChar, '%'+title+'%');

    const result  = await request.query(query);

    res.send(result .recordset);
  },

  create: async (req, res) => {
    const body = req.body;
     
    // Verify info
    if (
      !body.slug ||
      !body.title ||
      !body.logo_url ||
      !body.bio ||
      !body.address ||
      !body.agencyCreation ||
      !body.encours ||
      !body.fund ||
      !body.effective ||
      !body.MajorityShareholder
    ) {
      return res.status(400).send({
        message: "Champ manquant , veillez réesayer !",
      });
    }
    const query =
      "INSERT INTO agency (slug,title,bio,logo_url,address,agencyCreation,encours,fund,effective,MajorityShareholder) VALUES" +
      `('${body.slug}','${body.title}','${body.bio}','${body.logo_url}','${body.address}','${body.agencyCreation}','${body.encours}','${body.fund}','${body.effective}','${body.MajorityShareholder}') `;
      const exist = await sql.query(
        `SELECT COUNT(*) AS count  FROM agency WHERE slug = '${body.slug}'`
      );
      if (exist.recordset[0].count !== 0) {
        return res.status(404).send({ message: "Cette agence existe déjà " });
      }
    sql.query(query, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Une erreur est survenue : " + err.message });
      } else {
        return res
          .status(201)
          .send({ message: "élément ajouter avec succès." });
      }
    });
  },
  update: async (req, res) => {
    const body = req.body;
    if (
      !body.slug ||
      !body.title ||
      !body.logo_url ||
      !body.bio ||
      !body.address ||
      !body.agencyCreation ||
      !body.encours ||
      !body.fund ||
      !body.effective ||
      !body.MajorityShareholder
    ) {
      return res.status(400).send({
        message: "Champ manquant , veillez réesayer !",
      });
    }
    const exist = await sql.query(
      `SELECT COUNT(*) AS count  FROM agency WHERE id =${body.id  || 0} `
    );

    if (exist.recordset[0].count==0) {
      return res.send({
        message: "cette agence n'exite pas ",
      });
    }

    const query = `UPDATE agency SET slug='${body.slug}',title='${body.title}',logo_url='${body.logo_url}',bio='${body.bio}',address = '${body.address}',agencyCreation = '${body.agencyCreation}',encours = '${body.encours}',fund = '${body.fund}',effective = '${body.effective}',MajorityShareholder = '${body.MajorityShareholder}' WHERE id = ${body.id} `;
    sql.query(query,(err)=>{
      if(err){
        return res
        .status(500)
        .json({ message: "Une erreur est survenue : " + err.message });
      }else{
        return res
        .status(201)
        .send({ message: "élément modifier avec success" });
      }
    })
  },
  delete: async (req, res) => {
    const id = req.body.id;

    const query = `DELETE FROM agency WHERE id=${id}`;
    sql.query(query, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Une erreur est survenue : " + err.message });
      } else {
        res.status(410).json({ message: "élément Supprimer avec Succès." });
      }
    });
  },
};
