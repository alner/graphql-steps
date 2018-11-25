/* 
  Based on:
  https://graphql.org/graphql-js/
  
*/
const { graphql, buildSchema } = require("graphql");

const schema = buildSchema(`
type Query {
  info: String
}
`);

const resolvers = {
  info: () => "Hello world!"
};

graphql(schema, "{info}", resolvers).then(console.log);
