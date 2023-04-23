const express = require("express");
const agency = require("./controller/agency")
const scpi = require("./controller/scpi")
const admin = require("./controller/admin")

exports.router = (() => {
    const apiRouter = express.Router();
    // Admin Routes
    apiRouter.route("/admin/login/").post(admin.login);
    apiRouter.route("/admin/auth/").post(admin.auth); // le middleware d'authentification JWT admin.auth,
    // Agency Routes
    apiRouter.route("/agency/find/").get(agency.find);
    apiRouter.route("/agency/findOne/:slug").get(agency.findOne);
    apiRouter.route("/agency/search/:title").get(agency.search);
    
    apiRouter.route("/agency/create").post(admin.authMiddleware,agency.create); // Ajout de middleware pour l'authentification avec Token JWT
    apiRouter.route("/agency/update").post(admin.authMiddleware,agency.update);// Ajout de middleware pour l'authentification avec Token JWT
    apiRouter.route("/agency/delete").delete(admin.authMiddleware,agency.delete);// Ajout de middleware pour l'authentification avec Token JWT
    // SCPI Routes
    apiRouter.route("/scpi/find/").get(scpi.find);
    apiRouter.route("/scpi/findOne/:slug").get(scpi.findOne);
    apiRouter.route("/scpi/search/:title").get(scpi.search);
    apiRouter.route("/scpi/filtre").post(scpi.filtre);
    apiRouter.route("/scpi/create").post(admin.authMiddleware,scpi.create);// Ajout de middleware pour l'authentification avec Token JWT
    apiRouter.route("/scpi/update").post(admin.authMiddleware,scpi.update);// Ajout de middleware pour l'authentification avec Token JWT
    apiRouter.route("/scpi/delete").delete(admin.authMiddleware,scpi.delete);// Ajout de middleware pour l'authentification avec Token JWT
    // MUST ADD FILTR OPTIONS



    return apiRouter;
})();