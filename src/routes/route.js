const authRoutes = require("./authRoutes");
const categoryRoutes = require("./categoryRoutes");
const projectRoutes = require("./projectRoutes");
const contributorRoutes = require("./contributorRoutes");
const ratingRoutes = require("./ratingRoutes");

const routes = [
  ...authRoutes,
  ...categoryRoutes,
  ...projectRoutes,
  ...contributorRoutes,
  ...ratingRoutes,
];

module.exports = routes;
