const authRoutes = require("./authRoutes");
const categoryRoutes = require("./categoryRoutes");
const projectRoutes = require("./projectRoutes");
const contributorRoutes = require("./contributorRoutes");

const routes = [
  ...authRoutes,
  ...categoryRoutes,
  ...projectRoutes,
  ...contributorRoutes,
];

module.exports = routes;
