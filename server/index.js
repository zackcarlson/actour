const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const { actorSchema } = require("./schema");
const port = process.env.PORT || 4000;
const app = express();
const apolloServer = new ApolloServer({
  schema: actorSchema,
});
const corsOptions = {
  origin: "https://actour.herokuapp.com",
};

apolloServer.applyMiddleware({ app, path: "/graphql" });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});
