const authRoutes = require("./authRoutes");
const categoryRoutes = require("./categoryRoutes");
const projectRoutes = require("./projectRoutes");
const contributorRoutes = require("./contributorRoutes");
const ratingRoutes = require("./ratingRoutes");
const authFirebase = require("./authFirebaseRoutes");
const authFirebaseRoutes = require("./authFirebaseRoutes");

const routes = [
  ...authRoutes,
  ...categoryRoutes,
  ...projectRoutes,
  ...contributorRoutes,
  ...ratingRoutes,
  ...authFirebaseRoutes,
];

module.exports = routes;
