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
    name: "Query",
    fields: {
      info: {
        type: GraphQLString,
        args: {
          kind: {
            type: GraphQLString,
            description: "info kind parameter"
          }
        },
        resolve(root, args) {
          console.log("Args: ", args);
          return `Info ${args.kind || "graphql"}!`;
        }
      }
    }
  })
});

const query = `{
  info(kind: "test")
}`;

graphql(schema, query).then(console.log);
