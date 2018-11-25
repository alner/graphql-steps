/* 
  Based on:
  https://github.com/graphql/graphql-js

*/

const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require("graphql");

/*
const schema = buildSchema(`
type Query {
  info: String
}`);
*/
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "QueryType",
    fields: {
      info: {
        type: GraphQLString,
        resolve() {
          return "Hello GrpahQL!";
        }
      }
    }
  })
});

graphql(schema, "{info}").then(console.log);
