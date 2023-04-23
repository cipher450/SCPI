const express = require("express");
const sql = require("../config/sqlConnect");
const isEmpty  = require("../helper");
const {
  type,
  category,
  localisation,
  capitalType,
} = require("../config/store");
module.exports = {
   // Fonction asynchrone pour rechercher des éléments dans la base de données
  find: async (req, res) => {
    const query = "SELECT * ,(select title from agency where agency.id = scpi.parentAgency ) as agencyparent FROM scpi";
    const result = await sql.query(query);

    res.status(200).send(result.recordset);
  },
  // Fonction asynchrone pour rechercher un élément spécifique dans la base de données
  findOne: async (req, res) => {
    const slug = req.params.slug || null;

    const query = "SELECT * ,(select title from agency where agency.id = scpi.parentAgency ) as agencyparent FROM scpi WHERE Slug = @param";
    var request = new sql.Request();
    request.input("param", sql.VarChar, slug);

    const result = await request.query(query);

    res.status(200).send(result.recordset);
  },
  // Fonction asynchrone pour rechercher des éléments correspondant à un titre donné dans la base de données
  search: async (req, res) => {
    const title = req.params.title || null;

    const query = "SELECT * ,(select title from agency where agency.id = scpi.parentAgency ) as agencyparent FROM scpi WHERE title LIKE @param";// Requête SQL pour récupérer les éléments correspondant à un titre donné
    var request = new sql.Request(); // Création d'une nouvelle requête SQL
    request.input("param", sql.VarChar, '%'+title+'%');

    const result = await request.query(query);

    res.send(result.recordset);
  },
  filtre: async (req, res) => {
    const queryParams = req.body.query || {};
    console.log(queryParams)
    let query = "SELECT * ,(select title from agency where agency.id = scpi.parentAgency ) as agencyparent FROM scpi WHERE id  IS NOT NULL  ";

    var request = new sql.Request();

    if (queryParams.search) {
      query += ` AND title LIKE @search `;
      request.input("serach", sql.VarChar, queryParams.search);
    }

    if (queryParams.parentAgency) {
      query += ` AND parentAgency = @parent `;
      request.input("parent", sql.Int, queryParams.parentAgency);
      console.log(queryParams.parentAgency);
    }
    if (queryParams.inOurSelection == 1) {
      query += ` AND inOurSelection = 1 `;
    }

    if (queryParams.lifeAssurance == 1) {
      query += ` AND lifeInsurance = 1 `;
    }

    if (queryParams.type.length !==0) {
      const arr = queryParams.type;
      query += " AND ( ";
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        console.log(query);
        console.log(element);
        query += ` type LIKE @tp${index}  ${
          index + 1 != arr.length ? " OR " : " ) "
        }`;
        request.input("tp" + index, sql.VarChar,"%"+ element +"%");
      }
    }
    if (queryParams.category.length!==0) {
      const arr = queryParams.category
      query += " AND ( ";
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        console.log(query);
        console.log(element);
        query += ` category like @cat${index}  ${
          index + 1 != arr.length ? " OR " : " ) "
        }`;
        request.input("cat" + index, sql.VarChar,"%"+ element +"%");
      }
    }

    if (queryParams.localisation.length !==0) {
      const arr = queryParams.localisation;
      query += " AND ( ";
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        console.log(query);
        console.log(element);
        query += ` localisation like @lc${index}  ${
          index + 1 != arr.length ? " OR " : " ) "
        }`;
        request.input("lc" + index, sql.VarChar,"%"+ element +"%");
      }
    }

    const result = await request.query(query);
    console.log(query);
    res.send(result.recordset);
  },
  create: async (req, res) => {
    const body = req.body;

    // Verify info
    const parentAgencyID = body.parentAgency;
    const parentAgency = await sql.query(
      `SELECT COUNT(*) AS count  FROM agency WHERE id =${parentAgencyID || 0} `
    );
    if (parentAgency.recordset[0].count == 0) {
      return res.status(404).send({ message: "cette agence n'exite pas " });
    }
    if (isEmpty(body)){
      
      return res.status(400).send({
        message: "Champ manquant , veillez réesayer !",
      });
    }
    /*
    if (
      !body.parentAgency ||
      !body.slug ||
      !body.title ||
      !body.inOurSelection ||
      !body.lifeInsurance ||
      !body.type || // this only checks for the first ellements in the array MUST BE CHANGED
      !body.category.split(',')[0] in category ||
      !body.localisation.split(',')[0] in localisation ||
      !body.distributionRate ||
      !body.partPrice ||
      !body.capitalisation ||
      !body.scpiCreation ||
      !body.profil ||
      !body.history ||
      !body.description ||
      !body.capitalType.split(',')[0] in capitalType||
      !body.minSub ||
      !body.periodOfEnjoyment ||
      !body.subscriptionFee ||
      !body.gestionFee ||
      !body.visaAMF
    ) {
      console.log(body)
      return res.status(400).send({
        message: "Champ manquant , veillez réesayer !",
      });
    }*/
    const exist = await sql.query(
      `SELECT COUNT(*) AS count  FROM scpi WHERE slug = '${body.slug}'`
    );
    if (exist.recordset[0].count !== 0) {
      return res.status(404).send({ message: "Cette scpi existe déjà " });
    }
    const query =
      "INSERT INTO scpi (parentAgency,slug,title,inOurSelection,lifeInsurance,type,category,localisation,distributionRate,partPrice,capitalisation,scpiCreation,profil,history,description,capitalType,minSub,periodOfEnjoyment,subscriptionFee,gestionFee,visaAMF) VALUES " +
      `('${body.parentAgency}','${body.slug}','${body.title}',${body.inOurSelection},${body.lifeInsurance},'${body.type}','${body.category}','${body.localisation}','${body.distributionRate}','${body.partPrice}','${body.capitalisation}','${body.scpiCreation}','${body.profil}','${body.history}','${body.description}','${body.capitalType}','${body.minSub}','${body.periodOfEnjoyment}','${body.subscriptionFee}','${body.gestionFee}','${body.visaAMF}') `;

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
    const idScpi = body.id;
    const parentscpi = await sql.query(
      `SELECT COUNT(*) as count FROM scpi WHERE id =${idScpi} `
    );

    if (parentscpi.recordset[0].count == 0) {
      return res.send({ error: "cette scpi  n'exite pas " });
    }
    if (
      !body.parentAgency ||
      !body.slug ||
      !body.title ||
      
      !type.includes(body.type.split(',')[0]) ||
      !category.includes(body.category.split(',')[0]) ||
      !localisation.includes(body.localisation.split(',')[0]) ||
      !body.distributionRate ||
      !body.partPrice ||
      !body.capitalisation ||
      !body.scpiCreation ||
      !body.profil ||
      !body.history ||
      !body.description ||
    
      !body.minSub ||
      !body.periodOfEnjoyment ||
      !body.subscriptionFee ||
      !body.gestionFee ||
      !body.visaAMF
    ) {
      return res.status(400).send({
        message: "Champ manquant , veillez réesayer !",
      });
    }
    const query = `
    UPDATE scpi
    SET 
      parentAgency = '${body.parentAgency}',
      slug = '${body.slug}',
      title = '${body.title}',
      inOurSelection = '${body.inOurSelection}',
      lifeInsurance = '${body.lifeInsurance}',
      type = '${body.type}',
      category = '${body.category}',
      localisation = '${body.localisation}',
      distributionRate = '${body.distributionRate}',
      partPrice = '${body.partPrice}',
      capitalisation = '${body.capitalisation}',
      scpiCreation = '${body.scpiCreation}',
      profil = '${body.profil}',
      history = '${body.history}',
      description = '${body.description}',
      capitalType = '${body.capitalType}',
      minSub = '${body.minSub}',
      periodOfEnjoyment = '${body.periodOfEnjoyment}',
      subscriptionFee = '${body.subscriptionFee}',
      gestionFee = '${body.gestionFee}',
      visaAMF = '${body.visaAMF}'
    WHERE id = ${body.id}
  `;
    sql.query(query, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Une erreur est survenue : " + err.message });
      } else {
        return res
          .status(201)
          .send({ message: "élément modifier avec success" });
      }
    });
  },
  delete: async (req, res) => {
    const id = req.body.id;

    const query = `DELETE FROM scpi WHERE id=${id}`;
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
