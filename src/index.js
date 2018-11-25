/* 
  Based on:
  https://github.com/graphql/graphql-js

  See more examples:
  https://github.com/graphql/graphql-js/blob/master/src/__tests__/starWarsSchema.js

*/

const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLEnumType
} = require("graphql");

const KindEnum = new GraphQLEnumType({
  name: "Kind",
  description: "Info kind enum",
  values: {
    REQUEST: {
      value: 1,
      description: "Info request"
    },
    RESPONSE: {
      value: 2,
      description: "Response info response"
    }
  }
});

const InfoType = new GraphQLObjectType({
  name: "Info",
  fields: () => ({
    kind: {
      type: KindEnum,
      description: "Info kind"
    },
    description: {
      type: GraphQLNonNull(GraphQLString),
      description: "Info description"
    }
  })
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      info: {
        type: InfoType,
        args: {
          kind: {
            type: KindEnum,
            description: "info kind parameter"
          }
        },
        resolve(root, args) {
          console.log("Args: ", args);
          return {
            kind: args.kind,
            description: `Hello ${args.kind || "graphql"}!`
          };
        }
      }
    }
  })
});

const query = `{
  info(kind: REQUEST) {
    kind
    description
  }
}`;

graphql(schema, query).then(console.log);
