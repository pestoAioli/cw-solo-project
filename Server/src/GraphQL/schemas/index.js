"use strict";

const { gql } = require("apollo-server");
const path = require("path");
const fs = require("fs");

const queryPath = path.join(__dirname, "./query.schema.graphql");
const typePath = path.join(__dirname, "./types.schema.graphql");

//const mutation = require("./mutation.schema");
const query = fs.readFileSync(queryPath, "utf-8");
const types = fs.readFileSync(typePath, "utf-8");

module.exports = gql`
  ${query}
  ${types}
`;
