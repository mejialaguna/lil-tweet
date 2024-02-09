const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
require("dotenv").config();

const db = require("./config/connection.js");

const PORT = process.env.PORT || 3001;
const app = express();
const { typeDefs, resolvers } = require("./schemas");
const cors = require("cors");


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ( req ) => ( req ),
  });

  await server.start();
  server.applyMiddleware({ app });
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });
};
startServer();
